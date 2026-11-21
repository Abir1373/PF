import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { pool } from "@/lib/db";
import EditProjectForm from "./EditProjectForm";

// This route reads request-time session data and checks the database role.
export const instant = false;

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;

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

  if (result.rows[0]?.role !== "admin") {
    redirect("/");
  }

  return <EditProjectForm projectId={id} />;
}
