"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LoaderCircle, Save } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface Project {
  id: string | number;
  project_name: string;
  description: string | null;
  image_links: string[] | null;
  client_code_url: string | null;
  server_code_url: string | null;
}

interface EditProjectFormProps {
  projectId: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function EditProjectForm({ projectId }: EditProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [projectLoaded, setProjectLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [imageLinks, setImageLinks] = useState("");
  const [clientCodeUrl, setClientCodeUrl] = useState("");
  const [serverCodeUrl, setServerCodeUrl] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProject() {
      try {
        const response = await fetch(
          `${API_URL}/projects/${encodeURIComponent(projectId)}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
            cache: "no-store",
            signal: controller.signal,
          },
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Could not load this project.");
        }

        const project = result.data as Project | undefined;
        if (!project || typeof project.project_name !== "string") {
          throw new Error("The server returned invalid project data.");
        }

        setProjectName(project.project_name);
        setDescription(project.description ?? "");
        setImageLinks(
          Array.isArray(project.image_links)
            ? project.image_links.join("\n")
            : "",
        );
        setClientCodeUrl(project.client_code_url ?? "");
        setServerCodeUrl(project.server_code_url ?? "");
        setProjectLoaded(true);
      } catch (loadError: unknown) {
        if (!controller.signal.aborted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Something went wrong while loading the project.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadProject();
    return () => controller.abort();
  }, [projectId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmedName = projectName.trim();
    if (!trimmedName) {
      setError("Project name is required.");
      return;
    }

    const payload = {
      project_name: trimmedName,
      description: description.trim() || null,
      image_links: imageLinks
        .split("\n")
        .map((url) => url.trim())
        .filter(Boolean),
      client_code_url: clientCodeUrl.trim() || null,
      server_code_url: serverCodeUrl.trim() || null,
    };

    setSaving(true);

    try {
      // Your Express update route requires Authorization: Bearer <JWT>.
      const { data: tokenData, error: tokenError } = await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error(
          "Could not get an authentication token. Please sign in again.",
        );
      }

      const response = await fetch(
        `${API_URL}/projects/${encodeURIComponent(projectId)}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.message || "Could not update this project.");
      }

      router.push("/projects");
      router.refresh();
    } catch (saveError: unknown) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Something went wrong while saving the project.",
      );
    } finally {
      setSaving(false);
    }
  }

  const inputClassName =
    "mt-2 w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition placeholder:text-neutral-600 focus:border-amber-400";

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-neutral-950 px-6 text-neutral-300">
        <div className="flex items-center gap-3">
          <LoaderCircle className="animate-spin text-amber-400" size={22} />
          Loading project...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 transition hover:text-amber-300"
        >
          <ArrowLeft size={17} /> Back to projects
        </Link>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-400">
              Project management
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Edit project
            </h1>
            <p className="mt-3 text-neutral-400">
              Update the project details and save your changes.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          {!projectLoaded ? (
            <Link
              href="/projects"
              className="inline-flex rounded-xl bg-amber-400 px-5 py-3 font-semibold text-neutral-950 hover:bg-amber-300"
            >
              Return to projects
            </Link>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="project_name"
                  className="text-sm font-medium text-neutral-200"
                >
                  Project name <span className="text-amber-400">*</span>
                </label>
                <input
                  id="project_name"
                  name="project_name"
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                  required
                  maxLength={200}
                  className={inputClassName}
                  placeholder="My portfolio website"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-neutral-200"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={5}
                  className={`${inputClassName} resize-y`}
                  placeholder="Describe the project..."
                />
              </div>

              <div>
                <label
                  htmlFor="image_links"
                  className="text-sm font-medium text-neutral-200"
                >
                  Image URLs
                </label>
                <textarea
                  id="image_links"
                  name="image_links"
                  value={imageLinks}
                  onChange={(event) => setImageLinks(event.target.value)}
                  rows={4}
                  className={`${inputClassName} resize-y`}
                  placeholder="One image URL per line"
                />
                <p className="mt-2 text-xs text-neutral-500">
                  Enter one image URL per line.
                </p>
              </div>

              <div>
                <label
                  htmlFor="client_code_url"
                  className="text-sm font-medium text-neutral-200"
                >
                  Client code URL
                </label>
                <input
                  id="client_code_url"
                  name="client_code_url"
                  type="url"
                  value={clientCodeUrl}
                  onChange={(event) => setClientCodeUrl(event.target.value)}
                  className={inputClassName}
                  placeholder="https://github.com/username/client"
                />
              </div>

              <div>
                <label
                  htmlFor="server_code_url"
                  className="text-sm font-medium text-neutral-200"
                >
                  Server code URL
                </label>
                <input
                  id="server_code_url"
                  name="server_code_url"
                  type="url"
                  value={serverCodeUrl}
                  onChange={(event) => setServerCodeUrl(event.target.value)}
                  className={inputClassName}
                  placeholder="https://github.com/username/server"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
                <Link
                  href="/projects"
                  className="rounded-xl border border-white/10 px-5 py-3 text-center text-sm font-medium text-neutral-300 transition hover:bg-white/5"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <LoaderCircle className="animate-spin" size={18} />
                  ) : (
                    <Save size={18} />
                  )}
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
