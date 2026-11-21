"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Copy,
  Check,
  FileText,
  ArrowUpRight,
  Clock3,
  MapPin,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const EMAIL = "abirm3188@gmail.com";

const socialLinks = [
  {
    name: "GitHub",
    username: "Abir1373",
    description: "Explore my code and projects",
    href: "https://github.com/Abir1373",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    username: "Connect professionally",
    description: "Let’s connect and share ideas",
    href: "https://www.linkedin.com/in/dewan-abir-mahmud-3721722a5/",
    icon: FaLinkedinIn,
  },
  {
    name: "Résumé",
    username: "Experience and skills",
    description: "Download a copy of my CV",
    href: "/cv.pdf",
    icon: FileText,
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
      disable: "mobile",
    });
    AOS.refresh();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this email address:", EMAIL);
    }
  };

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-[#33291d] bg-[#11100e] px-5 py-24 text-[#f4eee5] sm:px-8 sm:py-28 lg:px-10 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#b78237]/[0.09] blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 -z-10 h-[32rem] w-[32rem] rounded-full bg-[#8d642d]/[0.08] blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.035),transparent_55%)]" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <div
              data-aos="fade-down"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d4a455]/20 bg-[#d4a455]/[0.07] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e7bd78]"
            >
              <Sparkles size={14} /> Get in touch
            </div>
            <h2
              data-aos="fade-up"
              data-aos-delay="80"
              className="text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#f4eee5] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Have something
              <br />
              <span className="font-serif font-medium italic text-[#d4a455]">
                in mind?
              </span>
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="160"
              className="mt-6 max-w-xl text-sm leading-7 text-[#aaa093] sm:text-base"
            >
              I’m always glad to hear about thoughtful projects, new
              opportunities, or interesting ideas. Let’s start with a note.
            </p>
          </div>

          <div
            data-aos="fade-left"
            className="flex w-fit items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-3.5 backdrop-blur-sm sm:px-5"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <div>
              <p className="text-sm font-medium text-[#eee4d6]">
                Open to opportunities
              </p>
              <p className="mt-0.5 text-xs text-[#8f8679]">
                Available for remote collaboration
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="flex flex-col gap-5">
            <div
              data-aos="fade-up"
              className="group relative isolate overflow-hidden rounded-[2rem] border border-[#d4a455]/20 bg-[#191713] p-7 shadow-[0_30px_100px_-55px_rgba(0,0,0,0.9)] transition duration-500 hover:border-[#d4a455]/35 sm:p-9"
            >
              <div className="pointer-events-none absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-[#c28a35]/[0.15] blur-[95px] transition group-hover:bg-[#c28a35]/[0.23]" />
              <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />

              <div className="flex flex-wrap items-start justify-between gap-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d4a455]/20 bg-[#d4a455]/[0.08] text-[#e7bd78] transition group-hover:rotate-[-5deg] group-hover:scale-105">
                    <Mail size={21} strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4a455]">
                      Preferred contact
                    </p>
                    <p className="mt-1 text-sm text-[#aaa093]">
                      I’d love to hear from you.
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-emerald-200/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{" "}
                  Inbox open
                </span>
              </div>

              <div className="mt-9">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#81786d]">
                  Email address
                </p>
                <h3 className="mt-3 break-all font-serif text-2xl font-medium tracking-tight text-[#f4eee5] sm:text-3xl lg:text-[2rem]">
                  {EMAIL}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-[#aaa093]">
                  Have a project, an opportunity, or just an idea? A short
                  message is a perfect place to start.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
                <p className="text-xs text-[#8f8679]">
                  <span className="text-[#d8c4a5]">Typical reply</span>
                  <span className="mx-2 text-[#5f574d]">·</span>24–48 hours
                </p>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={
                    copied ? "Email address copied" : "Copy email address"
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-[#d4a455] px-5 py-2.5 text-sm font-semibold text-[#21190d] shadow-[0_8px_28px_-14px_rgba(212,164,85,0.7)] transition hover:-translate-y-0.5 hover:bg-[#e7bd78] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e7bd78] focus-visible:ring-offset-2 focus-visible:ring-offset-[#191713] active:translate-y-0"
                >
                  {copied ? <Check size={16} /> : <Copy size={15} />}
                  {copied ? "Copied!" : "Copy email"}
                </button>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="group rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-[#d4a455]/25 hover:bg-white/[0.04]"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d4a455]/15 bg-[#d4a455]/[0.07] text-[#d4a455] transition group-hover:rotate-6 group-hover:scale-105">
                  <Clock3 size={20} />
                </span>
                <h3 className="text-sm font-semibold text-[#eee4d6]">
                  Response time
                </h3>
                <p className="mt-2 text-xs leading-6 text-[#938a7e]">
                  I usually respond to messages within 24–48 hours.
                </p>
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="180"
                className="group rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-[#d4a455]/25 hover:bg-white/[0.04]"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d4a455]/15 bg-[#d4a455]/[0.07] text-[#d4a455] transition group-hover:-rotate-6 group-hover:scale-105">
                  <MapPin size={20} />
                </span>
                <h3 className="text-sm font-semibold text-[#eee4d6]">
                  Location
                </h3>
                <p className="mt-2 text-xs leading-6 text-[#938a7e]">
                  Bangladesh <span className="mx-1 text-[#62584b]">·</span>{" "}
                  Available for remote collaboration
                </p>
              </div>
            </div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="rounded-[2rem] border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8"
          >
            <div className="mb-6">
              <p className="font-serif text-sm italic text-[#c5a16b]">
                Pick whichever feels right.
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#f2e9dd] sm:text-2xl">
                Find me around the web
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                const isResume = social.name === "Résumé";
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={isResume ? undefined : "_blank"}
                    rel={isResume ? undefined : "noopener noreferrer"}
                    download={isResume ? "Dewan-Abir-Mahmud-CV.pdf" : undefined}
                    data-aos="zoom-in"
                    data-aos-delay={100 + index * 80}
                    className="group flex min-h-[155px] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-[#171512] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#d4a455]/30 hover:bg-[#201b14]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4a455]/[0.08] text-[#d4a455] transition group-hover:bg-[#d4a455] group-hover:text-[#20180d]">
                        <Icon size={19} />
                      </span>
                      <ArrowUpRight
                        size={17}
                        className="text-[#756a5d] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#e7bd78]"
                      />
                    </div>
                    <div className="mt-6">
                      <h4 className="font-medium text-[#f0e8dd]">
                        {social.name}
                      </h4>
                      <p className="mt-1 text-xs text-[#c1b4a3]">
                        {social.username}
                      </p>
                      <p className="mt-2 text-[11px] leading-5 text-[#81786d]">
                        {social.description}
                      </p>
                    </div>
                  </a>
                );
              })}

              <div
                data-aos="zoom-in"
                data-aos-delay="340"
                className="flex min-h-[155px] flex-col justify-between rounded-2xl border border-[#d4a455]/15 bg-gradient-to-br from-[#2a2115] to-[#191713] p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4a455]/15 bg-[#d4a455]/[0.08] text-[#d4a455]">
                  <MessageCircle size={19} />
                </span>
                <div className="mt-6">
                  <h4 className="font-serif text-lg italic text-[#f0e8dd]">
                    Just say hello.
                  </h4>
                  <p className="mt-2 text-xs leading-5 text-[#9d9181]">
                    No big project needed—just a good conversation.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-5 border-t border-white/[0.07] pt-4 text-xs leading-5 text-[#81786d]">
              Have something interesting in mind?{" "}
              <span className="font-medium text-[#d4a455]">I’m all ears.</span>
            </p>
          </div>
        </div>

        <div
          data-aos="fade-up"
          className="relative mt-20 overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#171512] px-7 py-9 sm:px-10 sm:py-11"
        >
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border border-[#d4a455]/10" />
          <div className="pointer-events-none absolute -right-8 -top-16 h-48 w-48 rounded-full border border-[#d4a455]/10" />
          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a88d6a]">
                A little note
              </p>
              <h3 className="mt-4 font-serif text-3xl leading-tight text-[#eee5d9] sm:text-4xl">
                Every ending is{" "}
                <span className="italic text-[#a88d6a]">a new beginning.</span>
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#a99b89]">
                Thanks for exploring my corner of the internet. Every project
                has a story, and I’m always excited to create something
                meaningful with new people.
              </p>
            </div>
            <p className="shrink-0 font-serif text-sm italic text-[#c5a16b]">
              With curiosity, always.{" "}
              <span className="ml-2 text-xl not-italic">✦</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
