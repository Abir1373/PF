"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FolderOpen,
  Plus,
  ExternalLink,
  Code2,
  Server,
  Image as ImageIcon,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ====================== TYPES ======================

interface Project {
  id: number | string;
  project_name: string;
  description: string | null;
  image_links: string[] | null;
  client_code_url: string | null;
  server_code_url: string | null;
  created_at?: string;
  updated_at?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ====================== ANIMATIONS ======================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// ====================== PROJECT CARD ======================

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const images = Array.isArray(project.image_links)
    ? project.image_links.filter(
        (image) => typeof image === "string" && image.trim() !== "",
      )
    : [];

  const [activeImage, setActiveImage] = useState(0);

  const changeImage = (direction: number) => {
    if (images.length <= 1) return;

    setActiveImage(
      (current) => (current + direction + images.length) % images.length,
    );
  };

  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition-all duration-300 hover:border-amber-400/40 hover:bg-white/[0.045] lg:grid-cols-[42%_58%]"
    >
      {/* ================= LEFT: IMAGE ================= */}

      <div className="relative min-h-[280px] overflow-hidden bg-[#111315] lg:min-h-[350px]">
        {images.length > 0 ? (
          <motion.img
            key={activeImage}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            src={images[activeImage]}
            alt={`${project.project_name} screenshot ${activeImage + 1}`}
            className="absolute inset-0 h-full w-full object-contain p-3 sm:p-5"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <ImageIcon size={45} className="text-neutral-600" />
            <span className="text-xs text-neutral-500">
              No project image available
            </span>
          </div>
        )}

        {/* Project Number */}
        <div className="absolute left-5 top-5 z-10">
          <span className="rounded-full border border-white/15 bg-black/70 px-3 py-2 text-[10px] tracking-[0.2em] text-amber-400 backdrop-blur-md">
            PROJECT {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Image Counter */}
        {images.length > 0 && (
          <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-3 py-2 text-xs text-white backdrop-blur-md">
            <ImageIcon size={13} />
            {activeImage + 1} / {images.length}
          </div>
        )}

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() =>
                setActiveImage(
                  (activeImage - 1 + images.length) % images.length,
                )
              }
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white hover:bg-amber-400 hover:text-black"
            >
              <ChevronLeft size={19} />
            </button>

            <button
              type="button"
              onClick={() => setActiveImage((activeImage + 1) % images.length)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white hover:bg-amber-400 hover:text-black"
            >
              <ChevronRight size={19} />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-6 right-5 z-10 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(i)}
                aria-label={`Show image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  activeImage === i ? "w-6 bg-amber-400" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ================= RIGHT: DETAILS ================= */}

      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        {/* Project Category */}
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px w-7 bg-amber-400" />
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-amber-400">
            Featured Project
          </span>
        </div>

        {/* Project Name */}
        <h2 className="text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-amber-400 sm:text-3xl">
          {project.project_name}
        </h2>

        {/* Description */}
        <p className="mt-4 text-sm leading-7 text-neutral-400">
          {project.description || "No description available for this project."}
        </p>

        {/* Divider */}
        <div className="my-7 h-px w-full bg-white/10" />

        {/* Project Resources */}
        <div>
          <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-neutral-300">
            Project Resources
          </h3>

          <div className="flex flex-wrap gap-3">
            {project.client_code_url && (
              <a
                href={project.client_code_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-neutral-300 transition-all hover:border-amber-400/40 hover:text-amber-400"
              >
                <Code2 size={15} />
                Client Source Code
                <ExternalLink size={12} />
              </a>
            )}

            {project.server_code_url && (
              <a
                href={project.server_code_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-neutral-300 transition-all hover:border-amber-400/40 hover:text-amber-400"
              >
                <Server size={15} />
                Server Source Code
                <ExternalLink size={12} />
              </a>
            )}

            {!project.client_code_url && !project.server_code_url && (
              <span className="text-xs text-neutral-500">
                No source code links available.
              </span>
            )}
          </div>
        </div>

        {/* Bottom Information */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <ImageIcon size={14} />
            {images.length} Project {images.length === 1 ? "Image" : "Images"}
          </div>

          {project.created_at && (
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <CalendarDays size={14} />
              {new Date(project.created_at).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ====================== LOADING SKELETON ======================

function ProjectSkeleton() {
  return (
    <div className="grid animate-pulse grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] lg:grid-cols-[42%_58%]">
      <div className="min-h-[260px] bg-white/5 sm:min-h-[320px]" />

      <div className="flex flex-col justify-center space-y-5 p-8">
        <div className="h-3 w-28 rounded bg-white/10" />
        <div className="h-8 w-2/3 rounded bg-white/10" />
        <div className="h-3 w-full rounded bg-white/5" />
        <div className="h-3 w-4/5 rounded bg-white/5" />
        <div className="h-3 w-3/5 rounded bg-white/5" />
        <div className="mt-5 flex gap-3">
          <div className="h-10 w-36 rounded-lg bg-white/5" />
          <div className="h-10 w-36 rounded-lg bg-white/5" />
        </div>
      </div>
    </div>
  );
}

// ====================== MAIN PAGE ======================

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async (isRetry = false) => {
    try {
      if (isRetry) {
        setLoading(true);
        setError(null);
      }

      const response = await fetch(`${API_URL}/projects`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      });

      const responseText = await response.text();
      const result = JSON.parse(responseText);

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch projects.");
      }

      if (!Array.isArray(result.data)) {
        throw new Error("Invalid project data received.");
      }

      setProjects(result.data);
    } catch (err: unknown) {
      console.error("Projects fetching error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading projects.",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    let ignore = false;

    const loadProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/projects`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        });

        const responseText = await response.text();
        const result = JSON.parse(responseText);

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch projects.");
        }

        if (!Array.isArray(result.data)) {
          throw new Error("Invalid project data received.");
        }

        if (!ignore) {
          setProjects(result.data);
        }
      } catch (err: unknown) {
        if (!ignore) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading projects.",
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadProjects();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-20">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(circle_at_50%_50%,#fff_1px,transparent_1px)] bg-[length:24px_24px]" />

      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-amber-400/10 blur-[130px]" />

      <div className="pointer-events-none absolute -bottom-20 -left-32 h-80 w-80 rounded-full bg-orange-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-amber-400">
              <FolderOpen size={14} />
              My Portfolio
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              My <span className="text-amber-400">Projects</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-400">
              A collection of projects, experiments, and solutions I have
              developed using modern technologies.
            </p>
          </div>

          <Link
            href="/add-project"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-amber-400/10 transition-all hover:bg-amber-300 active:scale-95"
          >
            <Plus size={17} />
            Add New Project
          </Link>
        </motion.div>

        {/* Project Count */}
        {!loading && !error && projects.length > 0 && (
          <div className="mb-8 text-sm text-neutral-400">
            Showing{" "}
            <span className="font-semibold text-amber-400">
              {projects.length}
            </span>{" "}
            {projects.length === 1 ? "project" : "projects"}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <ProjectSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-12 text-center">
            <AlertCircle size={40} className="mb-4 text-red-400" />

            <h2 className="text-xl font-semibold text-white">
              Unable to Load Projects
            </h2>

            <p className="mt-3 text-sm text-neutral-400">{error}</p>

            <button
              onClick={() => fetchProjects(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-amber-300"
            >
              <RefreshCw size={15} />
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-20 text-center">
            <FolderOpen size={45} className="mb-5 text-amber-400" />

            <h2 className="text-2xl font-semibold text-white">
              No Projects Yet
            </h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-neutral-400">
              Start building your portfolio by adding your first project.
            </p>

            <Link
              href="/add-project"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-neutral-950 transition-all hover:bg-amber-300"
            >
              <Plus size={17} />
              Add Your First Project
              <ArrowRight size={15} />
            </Link>
          </div>
        )}

        {/* Projects: Horizontal Layout */}
        {!loading && !error && projects.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        )}

        {/* Footer */}
        <div className="mt-20 border-t border-[#342b20] pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="font-serif text-sm italic text-[#a99b89]">
              Every project is another opportunity to learn, create, and grow.
            </p>

            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <CalendarDays size={14} />
              Built with passion and creativity
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
