import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { pool } from "@/lib/db";
import ProjectsClient from "./ProjectsClient";

export const instant = false;

export default async function ProjectsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const result = await pool.query(
    'SELECT role FROM "user" WHERE id = $1 LIMIT 1',
    [session.user.id],
  );

  const isAdmin = result.rows[0]?.role === "admin";

  return <ProjectsClient isAdmin={isAdmin} />;
}
