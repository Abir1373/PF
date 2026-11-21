import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { createRemoteJWKSet, jwtVerify, JWTPayload } from "jose";
import { pool } from "./lib/db";
import crypto from "crypto";

export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

const app = express();
const PORT = process.env.EXPRESS_PORT || 5000;
const AUTH_URL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

const JWKS = createRemoteJWKSet(new URL(`${AUTH_URL}/api/auth/jwks`));

/** Verify a Better Auth JWT sent as Authorization: Bearer <token>. */
export async function verifyJWT(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: Missing bearer token" });
    return;
  }

  const token = authHeader.slice("Bearer ".length);

  try {
    try {
      const { payload } = await jwtVerify(token, JWKS);
      req.user = payload;
    } catch (jwksError) {
      // Use this fallback only if your Better Auth setup signs compatible JWTs
      // with BETTER_AUTH_SECRET. Prefer JWKS verification when it is available.
      if (!process.env.BETTER_AUTH_SECRET) throw jwksError;
      const secret = new TextEncoder().encode(process.env.BETTER_AUTH_SECRET);
      const { payload } = await jwtVerify(token, secret);
      req.user = payload;
    }

    next();
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Verification failed";
    res.status(401).json({ message: `Unauthorized: ${message}` });
  }
}

/** Check the current database role; do not rely on a browser-supplied role. */
export async function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user?.sub;
    if (typeof userId !== "string" || !userId) {
      res.status(401).json({ message: "Invalid user token" });
      return;
    }

    const result = await pool.query(`SELECT role FROM "user" WHERE id = $1`, [
      userId,
    ]);

    if (result.rows[0]?.role !== "admin") {
      res.status(403).json({ message: "Admin access required" });
      return;
    }

    next();
  } catch (error: unknown) {
    res.status(500).json({
      message: "Failed to verify admin access",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

const asyncRoute =
  (handler: (req: Request, res: Response) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    handler(req, res).catch(next);
  };

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Server is running" });
});

// User-management endpoints are admin-only. Public registration should go
// through Better Auth rather than accepting arbitrary roles here.
app.post(
  "/create",
  verifyJWT,
  requireAdmin,
  asyncRoute(async (req, res) => {
    try {
      const { name, email, role = "user" } = req.body;
      if (!name || !email) {
        res.status(400).json({ message: "Name and email are required" });
        return;
      }

      const now = new Date();
      const result = await pool.query(
        `INSERT INTO "user" (id, name, email, role, "emailVerified", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, false, $5, $6)
         RETURNING *`,
        [crypto.randomUUID(), name, email, role, now, now],
      );
      res.status(201).json({ data: result.rows[0] });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create user",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }),
);

app.get(
  "/get",
  verifyJWT,
  requireAdmin,
  asyncRoute(async (_req, res) => {
    try {
      const result = await pool.query(
        `SELECT * FROM "user" ORDER BY "createdAt" DESC`,
      );
      res.json({ data: result.rows });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch users",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }),
);

app.patch(
  "/update",
  verifyJWT,
  requireAdmin,
  asyncRoute(async (req, res) => {
    try {
      const { id, name, email, role } = req.body;
      if (!id) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }

      const fields: string[] = [];
      const values: unknown[] = [id];
      let index = 2;

      if (name !== undefined) {
        fields.push(`name = $${index++}`);
        values.push(name);
      }
      if (email !== undefined) {
        fields.push(`email = $${index++}`);
        values.push(email);
      }
      if (role !== undefined) {
        fields.push(`role = $${index++}`);
        values.push(role);
      }
      if (fields.length === 0) {
        res.status(400).json({ message: "No fields to update" });
        return;
      }

      fields.push(`"updatedAt" = NOW()`);
      const result = await pool.query(
        `UPDATE "user" SET ${fields.join(", ")} WHERE id = $1 RETURNING *`,
        values,
      );
      if (result.rows.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json({ message: "User updated successfully", data: result.rows[0] });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update user",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }),
);

app.delete(
  "/delete/:id",
  verifyJWT,
  requireAdmin,
  asyncRoute(async (req, res) => {
    try {
      const result = await pool.query(
        `DELETE FROM "user" WHERE id = $1 RETURNING *`,
        [req.params.id],
      );
      if (result.rows.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json({ message: "User deleted successfully", data: result.rows[0] });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete user",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }),
);

// Public read endpoints.
app.get(
  "/projects",
  asyncRoute(async (_req, res) => {
    try {
      const result = await pool.query(
        `SELECT * FROM projects_info ORDER BY created_at DESC`,
      );
      res.json({ data: result.rows });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch projects",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }),
);

app.get(
  "/projects/:id",
  asyncRoute(async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT * FROM projects_info WHERE id = $1`,
        [req.params.id],
      );
      if (result.rows.length === 0) {
        res.status(404).json({ message: "Project not found" });
        return;
      }
      res.json({ data: result.rows[0] });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch project",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }),
);

// All project writes require both a valid JWT and a database admin role.
app.post(
  "/projects",
  verifyJWT,
  requireAdmin,
  asyncRoute(async (req, res) => {
    try {
      const {
        image_links,
        project_name,
        description,
        client_code_url,
        server_code_url,
      } = req.body;

      if (typeof project_name !== "string" || !project_name.trim()) {
        res.status(400).json({ message: "Project name is required" });
        return;
      }
      if (image_links !== undefined && !Array.isArray(image_links)) {
        res.status(400).json({ message: "image_links must be an array" });
        return;
      }

      const result = await pool.query(
        `INSERT INTO projects_info
          (image_links, project_name, description, client_code_url, server_code_url)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [
          image_links ?? [],
          project_name.trim(),
          description || null,
          client_code_url || null,
          server_code_url || null,
        ],
      );
      res.status(201).json({
        message: "Project created successfully",
        data: result.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create project",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }),
);

app.patch(
  "/projects/:id",
  verifyJWT,
  requireAdmin,
  asyncRoute(async (req, res) => {
    try {
      const {
        image_links,
        project_name,
        description,
        client_code_url,
        server_code_url,
      } = req.body;

      const fields: string[] = [];
      const values: unknown[] = [];
      let index = 1;

      const addField = (column: string, value: unknown) => {
        fields.push(`${column} = $${index++}`);
        values.push(value);
      };

      if (image_links !== undefined) {
        if (
          !Array.isArray(image_links) ||
          !image_links.every((item: unknown) => typeof item === "string")
        ) {
          res
            .status(400)
            .json({ message: "image_links must be an array of strings" });
          return;
        }
        addField("image_links", image_links);
      }
      if (project_name !== undefined) {
        if (typeof project_name !== "string" || !project_name.trim()) {
          res.status(400).json({ message: "Project name cannot be empty" });
          return;
        }
        addField("project_name", project_name.trim());
      }
      if (description !== undefined)
        addField("description", description || null);
      if (client_code_url !== undefined)
        addField("client_code_url", client_code_url || null);
      if (server_code_url !== undefined)
        addField("server_code_url", server_code_url || null);

      if (fields.length === 0) {
        res.status(400).json({ message: "No fields to update" });
        return;
      }

      fields.push("updated_at = NOW()");
      values.push(req.params.id);
      const result = await pool.query(
        `UPDATE projects_info
         SET ${fields.join(", ")}
         WHERE id = $${index}
         RETURNING *`,
        values,
      );
      if (result.rows.length === 0) {
        res.status(404).json({ message: "Project not found" });
        return;
      }
      res.json({
        message: "Project updated successfully",
        data: result.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update project",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }),
);

app.delete(
  "/projects/:id",
  verifyJWT,
  requireAdmin,
  asyncRoute(async (req, res) => {
    try {
      const result = await pool.query(
        `DELETE FROM projects_info WHERE id = $1 RETURNING *`,
        [req.params.id],
      );
      if (result.rows.length === 0) {
        res.status(404).json({ message: "Project not found" });
        return;
      }
      res.json({
        message: "Project deleted successfully",
        data: result.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete project",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }),
);

app.get(
  "/api/protected",
  verifyJWT,
  (req: AuthenticatedRequest, res: Response) => {
    res.json({
      message: "Access granted! Token verified successfully.",
      user: req.user,
    });
  },
);

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});

export default app;
