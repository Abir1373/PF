"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderOpen,
  Plus,
  ExternalLink,
  Code2,
  Server,
  Image as ImageIcon,
  AlertCircle,
  RefreshCw,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Trash2,
} from "lucide-react";

interface Project {
  id: string | number;
  project_name: string;
  description: string | null;
  image_links: string[] | null;
  client_code_url: string | null;
  server_code_url: string | null;
  created_at?: string;
}

interface ProjectsClientProps {
  isAdmin: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch projects");
  }

  if (!Array.isArray(result.data)) {
    throw new Error("Invalid data received");
  }

  return result.data as Project[];
}

// ====================== PROJECT CARD ======================
function ProjectCard({
  project,
  index,
  isAdmin,
  onDelete,
}: {
  project: Project;
  index: number;
  isAdmin: boolean;
  onDelete: (id: string | number) => void;
}) {
  const images = Array.isArray(project.image_links)
    ? project.image_links.filter(
        (img) => typeof img === "string" && img.trim() !== "",
      )
    : [];

  const [activeImage, setActiveImage] = useState(0);

  const handleDelete = () => {
    if (!window.confirm(`Delete "${project.project_name}" permanently?`)) {
      return;
    }

    onDelete(project.id);
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 transition-all duration-500 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-500/10">
      <div className="grid grid-cols-1 lg:grid-cols-[42%_58%]">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden bg-black lg:aspect-auto lg:h-[440px]">
          {images.length > 0 ? (
            <img
              src={images[activeImage]}
              alt={`${project.project_name} screenshot ${activeImage + 1}`}
              className="absolute inset-0 h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-600">
              <ImageIcon size={64} strokeWidth={1.2} />
              <p className="mt-4 text-sm">No preview available</p>
            </div>
          )}

          {/* Project Number */}
          <div className="absolute left-6 top-6 rounded-full border border-amber-400/30 bg-black/80 px-5 py-1.5 font-mono text-xs tracking-widest text-amber-400 backdrop-blur">
            PROJECT {String(index + 1).padStart(2, "0")}
          </div>

          {/* Image Counter */}
          {images.length > 0 && (
            <div className="absolute bottom-6 left-6 rounded-full border border-white/10 bg-black/70 px-4 py-1 text-xs text-white/90 backdrop-blur">
              {activeImage + 1} • {images.length}
            </div>
          )}

          {/* Image Navigation */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  setActiveImage(
                    (prev) => (prev - 1 + images.length) % images.length,
                  )
                }
                className="absolute left-4 top-1/2 z-10 rounded-full bg-black/70 p-3 text-white transition-all hover:bg-amber-400 hover:text-neutral-950"
                aria-label="Previous image"
              >
                <ChevronLeft size={26} />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveImage((prev) => (prev + 1) % images.length)
                }
                className="absolute right-4 top-1/2 z-10 rounded-full bg-black/70 p-3 text-white transition-all hover:bg-amber-400 hover:text-neutral-950"
                aria-label="Next image"
              >
                <ChevronRight size={26} />
              </button>
            </>
          )}
        </div>

        {/* Project Content */}
        <div className="flex flex-col p-8 lg:p-12">
          <div className="flex items-center gap-3">
            <div className="h-px w-9 bg-amber-400" />
            <span className="text-xs font-medium uppercase tracking-[3px] text-amber-400">
              Featured Work
            </span>
          </div>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white transition-colors group-hover:text-amber-300">
            {project.project_name}
          </h2>

          <p className="mt-6 text-[15.5px] leading-relaxed text-neutral-400">
            {project.description || "No description available."}
          </p>

          <div className="mt-10">
            <p className="mb-4 text-xs uppercase tracking-widest text-neutral-500">
              Project Resources
            </p>
            <div className="flex flex-wrap gap-3">
              {project.client_code_url && (
                <a
                  href={project.client_code_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm transition-colors hover:border-amber-400 hover:text-amber-300"
                >
                  <Code2 size={18} /> Client Code
                  <ExternalLink size={15} />
                </a>
              )}
              {project.server_code_url && (
                <a
                  href={project.server_code_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm transition-colors hover:border-amber-400 hover:text-amber-300"
                >
                  <Server size={18} /> Server Code
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>

          {isAdmin && (
            <div className="mt-auto flex gap-4 pt-12">
              <Link
                href={`/edit-project/${project.id}`}
                className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-amber-400 py-4 font-semibold text-neutral-950 transition-all hover:bg-amber-300 active:scale-[0.985]"
              >
                <Edit3 size={20} /> Edit Project
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-red-500/10 py-4 font-semibold text-red-400 transition-all hover:bg-red-600 hover:text-white active:scale-[0.985]"
              >
                <Trash2 size={20} /> Delete
              </button>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <ImageIcon size={16} />
              {images.length} image{images.length !== 1 ? "s" : ""}
            </div>
            {project.created_at && (
              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                {new Date(project.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ====================== MAIN COMPONENT ======================
export default function ProjectsClient({ isAdmin }: ProjectsClientProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial load: state updates happen after the fetch promise settles,
  // not synchronously during the effect.
  useEffect(() => {
    let cancelled = false;

    getProjects()
      .then((data) => {
        if (!cancelled) {
          setProjects(data);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading projects.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);

    getProjects()
      .then((data) => {
        setProjects(data);
      })
      .catch((err: unknown) => {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while loading projects.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = async (id: string | number) => {
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete project");
      }

      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Delete failed";
      window.alert(message);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-neutral-950 px-6 py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[length:50px_50px]" />
      <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-amber-400/10 blur-[130px]" />
      <div className="absolute -left-40 bottom-20 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-amber-400/20 bg-amber-400/5 px-6 py-2 text-xs uppercase tracking-widest text-amber-400">
              <FolderOpen size={18} /> MY WORK
            </div>
            <h1 className="mt-4 text-6xl font-semibold tracking-tighter text-white">
              My <span className="text-amber-400">Projects</span>
            </h1>
            <p className="mt-4 max-w-md text-lg text-neutral-400">
              A collection of thoughtful digital experiences and technical
              solutions.
            </p>
          </div>

          {isAdmin && (
            <Link
              href="/add-project"
              className="flex items-center gap-3 rounded-2xl bg-amber-400 px-8 py-4 text-base font-semibold text-neutral-950 shadow-xl shadow-amber-400/20 transition-all hover:bg-amber-300 active:scale-95"
            >
              <Plus size={22} />
              Add New Project
            </Link>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-12">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-96 animate-pulse rounded-3xl bg-white/5"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="mx-auto max-w-md rounded-3xl border border-red-500/20 bg-red-500/5 p-12 text-center">
            <AlertCircle size={48} className="mx-auto mb-6 text-red-400" />
            <h3 className="text-2xl font-medium text-white">
              Unable to load projects
            </h3>
            <p className="mt-4 text-neutral-400">{error}</p>
            <button
              type="button"
              onClick={handleRetry}
              className="mx-auto mt-8 flex items-center gap-3 rounded-2xl bg-white px-8 py-3.5 text-neutral-900 transition-colors hover:bg-amber-400"
            >
              <RefreshCw size={18} /> Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="rounded-3xl border border-dashed border-white/20 py-20 text-center">
            <FolderOpen size={80} className="mx-auto mb-6 text-amber-400/30" />
            <p className="text-2xl text-neutral-400">No projects yet.</p>
            {isAdmin && (
              <Link
                href="/add-project"
                className="mt-8 inline-block font-medium text-amber-400 hover:text-amber-300"
              >
                Add your first project →
              </Link>
            )}
          </div>
        )}

        {/* Project List */}
        {!loading && !error && projects.length > 0 && (
          <div className="space-y-16">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isAdmin={isAdmin}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <div className="mt-24 text-center text-sm font-light text-neutral-500">
          Every project is a step toward mastery
        </div>
      </div>
    </section>
  );
}
