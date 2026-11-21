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

// Remote JWKS for verifying Better Auth JWT tokens
const JWKS = createRemoteJWKSet(new URL(`${AUTH_URL}/api/auth/jwks`));

/**
 * Middleware: Verify Better Auth JWT Token
 */
export async function verifyJWT(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
      return;
    }

    const token = authHeader.split(" ")[1];

    try {
      const { payload } = await jwtVerify(token, JWKS);
      req.user = payload;
      next();
      return;
    } catch {
      if (process.env.BETTER_AUTH_SECRET) {
        const secret = new TextEncoder().encode(process.env.BETTER_AUTH_SECRET);
        const { payload } = await jwtVerify(token, secret);
        req.user = payload;
        next();
        return;
      }
      throw new Error("Invalid token");
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Verification failed";
    res.status(401).json({ error: `Unauthorized: ${msg}` });
  }
}

// 1. Root health check
app.get("/", (_req: Request, res: Response) => {
  res.send({ message: "Server is running" });
});

// 2. Create User
app.post("/create", async (req: Request, res: Response) => {
  try {
    const { name, email, role = "user" } = req.body;
    const id = crypto.randomUUID();
    const now = new Date();

    const result = await pool.query(
      `INSERT INTO "user" (id, name, email, role, "emailVerified", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, false, $5, $6)
       RETURNING *`,
      [id, name, email, role, now, now],
    );

    res.send({ data: result.rows[0] });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// 3. Read All Users
app.get("/get", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT * FROM "user" ORDER BY "createdAt" DESC`,
    );
    res.send({ data: result.rows });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// 4. Update User
app.patch("/update", async (req: Request, res: Response) => {
  try {
    const { id, name, email, role } = req.body;

    if (!id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    // Build dynamic update
    const fields: string[] = [];
    const values: unknown[] = [id];
    let idx = 2;

    if (name !== undefined) {
      fields.push(`name = $${idx++}`);
      values.push(name);
    }
    if (email !== undefined) {
      fields.push(`email = $${idx++}`);
      values.push(email);
    }
    if (role !== undefined) {
      fields.push(`role = $${idx++}`);
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

    res.status(200).json({
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// 5. Delete User
app.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const result = await pool.query(
      `DELETE FROM "user" WHERE id = $1 RETURNING *`,
      [id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// ====================== PROJECTS ROUTES ======================

// 1. Create a new project
app.post("/projects", async (req: Request, res: Response) => {
  try {
    console.log("POST /projects reached!");
    console.log("Request body:", req.body);

    const {
      image_links,
      project_name,
      description,
      client_code_url,
      server_code_url,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO projects_info
        (image_links, project_name, description, client_code_url, server_code_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        image_links || [],
        project_name,
        description || null,
        client_code_url || null,
        server_code_url || null,
      ],
    );

    console.log("PostgreSQL result:", result.rows[0]);

    res.status(201).json({
      message: "Project created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("PostgreSQL INSERT error:", error);

    res.status(500).json({
      message: "Failed to create project",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// 2. Get all projects
app.get("/projects", async (_req: Request, res: Response) => {
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
});

// 3. Get single project by ID
app.get("/projects/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT * FROM projects_info WHERE id = $1`,
      [id],
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
});

// 4. Update a project
app.patch("/projects/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      image_links,
      project_name,
      description,
      client_code_url,
      server_code_url,
    } = req.body;

    const result = await pool.query(
      `UPDATE projects_info SET
        image_links     = COALESCE($1, image_links),
        project_name    = COALESCE($2, project_name),
        description     = COALESCE($3, description),
        client_code_url = COALESCE($4, client_code_url),
        server_code_url = COALESCE($5, server_code_url),
        updated_at      = NOW()
       WHERE id = $6
       RETURNING *`,
      [
        image_links,
        project_name,
        description,
        client_code_url,
        server_code_url,
        id,
      ],
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
});

// 5. Delete a project
app.delete("/projects/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM projects_info WHERE id = $1 RETURNING *`,
      [id],
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
});

// 6. Protected endpoint
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
  console.log(`🚀 Express server running on port ${PORT}`);
});

export default app;
