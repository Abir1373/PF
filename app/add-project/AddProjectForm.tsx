"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FolderPlus,
  Image as ImageIcon,
  FileText,
  Code2,
  Server,
  Plus,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const inputClassName =
  "w-full rounded-xl border border-white/[0.09] bg-[#0d0d0c]/80 py-3 pl-11 pr-4 text-sm text-[#f5eee4] outline-none transition placeholder:text-[#6c675f] hover:border-white/[0.15] focus:border-[#d4a455]/70 focus:ring-4 focus:ring-[#d4a455]/[0.08]";

const labelClassName =
  "mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b8ad9e]";

const AddProjectForm = () => {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [clientCodeUrl, setClientCodeUrl] = useState("");
  const [serverCodeUrl, setServerCodeUrl] = useState("");
  const [imageLinks, setImageLinks] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addImageField = () => setImageLinks((current) => [...current, ""]);

  const removeImageField = (index: number) => {
    setImageLinks((current) =>
      current.length === 1 ? current : current.filter((_, i) => i !== index),
    );
  };

  const updateImageLink = (index: number, value: string) => {
    setImageLinks((current) =>
      current.map((link, i) => (i === index ? value : link)),
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!projectName.trim()) {
      setError("Project name is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_name: projectName.trim(),
          description: description.trim() || null,
          client_code_url: clientCodeUrl.trim() || null,
          server_code_url: serverCodeUrl.trim() || null,
          image_links: imageLinks.map((link) => link.trim()).filter(Boolean),
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(data?.message || "Failed to create project.");
      }

      setSuccess(true);
      window.setTimeout(() => router.push("/"), 1300);
    } catch (caught: unknown) {
      setError(
        caught instanceof Error
          ? caught.message
          : "An unexpected error occurred.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden bg-[#11100e] px-5 py-12 text-[#f4eee5] sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#b78237]/[0.08] blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#8d642d]/[0.07] blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-6xl"
      >
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-xs font-medium text-[#9d9488] transition hover:text-[#e7bd78]"
        >
          <ArrowLeft size={14} /> Back to home
        </Link>

        <div className="grid items-start gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
          <aside className="pt-2 lg:sticky lg:top-28">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d4a455]/20 bg-[#d4a455]/[0.07] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e7bd78]">
              <Sparkles size={13} /> Admin workspace
            </div>

            <h1 className="max-w-md text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#f4eee5] sm:text-5xl">
              Give your latest work a{" "}
              <span className="font-serif italic text-[#d4a455]">
                place to shine.
              </span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#9e9589]">
              Add the project details, code links, and images you want visitors
              to see in your portfolio.
            </p>

            <div className="mt-9 hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 lg:block">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4a455]/15 bg-[#d4a455]/[0.07] text-[#d4a455]">
                  <FolderPlus size={18} />
                </span>
                <div>
                  <p className="text-sm font-medium text-[#eee4d6]">
                    Portfolio entry
                  </p>
                  <p className="mt-1 text-xs text-[#81786d]">
                    Project details and media
                  </p>
                </div>
              </div>
              <div className="mt-5 h-px bg-white/[0.07]" />
              <p className="mt-4 text-xs leading-6 text-[#8f8679]">
                Tip: use publicly accessible image URLs so your project previews
                load for everyone.
              </p>
            </div>
          </aside>

          <motion.div
            layout
            className="overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#191816]/95 shadow-[0_30px_100px_-45px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-5 sm:px-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d4a455]">
                  New entry
                </p>
                <h2 className="mt-1 text-lg font-semibold text-[#f4eee5]">
                  Project details
                </h2>
              </div>
              <span className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-1.5 text-[10px] font-medium text-[#938a7e]">
                DRAFT
              </span>
            </div>

            <div className="p-6 sm:p-8">
              {error && (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/[0.07] p-4 text-sm text-red-200"
                >
                  <AlertCircle
                    size={17}
                    className="mt-0.5 shrink-0 text-red-300"
                  />
                  <span>{error}</span>
                </motion.div>
              )}

              {success && (
                <motion.div
                  role="status"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] p-4 text-sm text-emerald-200"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-300"
                  />
                  <span>
                    Project created successfully. Taking you back to the
                    portfolio…
                  </span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="project-name" className={labelClassName}>
                    Project name <span className="text-[#d4a455]">*</span>
                  </label>
                  <div className="relative">
                    <FolderPlus
                      size={16}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#83796d]"
                    />
                    <input
                      id="project-name"
                      type="text"
                      required
                      maxLength={100}
                      placeholder="e.g. Studio North"
                      value={projectName}
                      onChange={(event) => setProjectName(event.target.value)}
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="project-description"
                    className={labelClassName}
                  >
                    Description
                  </label>
                  <div className="relative">
                    <FileText
                      size={16}
                      className="pointer-events-none absolute left-4 top-4 text-[#83796d]"
                    />
                    <textarea
                      id="project-description"
                      rows={4}
                      maxLength={1000}
                      placeholder="What does it do, and what makes it interesting?"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      className={`${inputClassName} resize-y pl-11 leading-6`}
                    />
                  </div>
                  <p className="mt-2 text-right text-[10px] text-[#6f685e]">
                    {description.length}/1000
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="client-code" className={labelClassName}>
                      Client code URL
                    </label>
                    <div className="relative">
                      <Code2
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#83796d]"
                      />
                      <input
                        id="client-code"
                        type="url"
                        placeholder="https://github.com/you/client"
                        value={clientCodeUrl}
                        onChange={(event) =>
                          setClientCodeUrl(event.target.value)
                        }
                        className={inputClassName}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="server-code" className={labelClassName}>
                      Server code URL
                    </label>
                    <div className="relative">
                      <Server
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#83796d]"
                      />
                      <input
                        id="server-code"
                        type="url"
                        placeholder="https://github.com/you/server"
                        value={serverCodeUrl}
                        onChange={(event) =>
                          setServerCodeUrl(event.target.value)
                        }
                        className={inputClassName}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/[0.07] pt-6">
                  <div className="mb-3 flex items-end justify-between gap-4">
                    <div>
                      <label className={labelClassName}>Project images</label>
                      <p className="text-xs text-[#81786d]">
                        Add one or more public image URLs.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addImageField}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#e7bd78] transition hover:bg-[#d4a455]/[0.08] hover:text-[#f2d49c]"
                    >
                      <Plus size={14} /> Add image
                    </button>
                  </div>

                  <div className="space-y-3">
                    {imageLinks.map((link, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="relative min-w-0 flex-1">
                          <ImageIcon
                            size={16}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#83796d]"
                          />
                          <input
                            aria-label={`Project image URL ${index + 1}`}
                            type="url"
                            placeholder={`https://example.com/image-${index + 1}.jpg`}
                            value={link}
                            onChange={(event) =>
                              updateImageLink(index, event.target.value)
                            }
                            className={inputClassName}
                          />
                        </div>
                        {imageLinks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeImageField(index)}
                            aria-label={`Remove image URL ${index + 1}`}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] text-[#83796d] transition hover:border-red-400/30 hover:bg-red-400/[0.06] hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/50"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/[0.07] pt-6">
                  <button
                    type="submit"
                    disabled={loading || success}
                    className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#d4a455] px-5 py-3.5 text-sm font-semibold text-[#21190d] shadow-[0_12px_35px_-18px_rgba(212,164,85,0.65)] transition hover:-translate-y-0.5 hover:bg-[#e7bd78] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7bd78] focus-visible:ring-offset-2 focus-visible:ring-offset-[#191816] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={17} className="animate-spin" /> Creating
                        project…
                      </>
                    ) : success ? (
                      <>
                        <CheckCircle2 size={17} /> Project added
                      </>
                    ) : (
                      <>
                        <FolderPlus size={17} /> Add project{" "}
                        <ArrowUpRight
                          size={16}
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-center text-[10px] text-[#71695e]">
                    Fields marked * are required.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AddProjectForm;
