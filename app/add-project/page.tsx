import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { pool } from "@/lib/db";
import AddProjectForm from "@/app/add-project/AddProjectForm";

export const instant = false;

export default async function AddProjectPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // Check the role in PostgreSQL using the authenticated user's ID.
  const result = await pool.query(
    `SELECT role FROM "user" WHERE id = $1 LIMIT 1`,
    [session.user.id],
  );

  if (result.rows[0]?.role !== "admin") {
    redirect("/");
  }

  return <AddProjectForm />;
}
