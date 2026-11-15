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
  Send,
  Sparkles,
  MessageCircle,
} from "lucide-react";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";

import AOS from "aos";
import "aos/dist/aos.css";

// Replace with your actual email
const EMAIL = "your.email@example.com";

// Social links
const socialLinks = [
  {
    name: "GitHub",
    username: "yourusername",
    description: "Explore my code & projects",
    href: "https://github.com/yourusername",
    icon: FaGithub,
    bg: "bg-[#f7f3eb]",
    color: "text-[#211b13]",
  },
  {
    name: "LinkedIn",
    username: "Your LinkedIn profile",
    description: "Let's connect professionally",
    href: "https://linkedin.com/in/yourusername",
    icon: FaLinkedinIn,
    bg: "bg-[#f4e8c9]",
    color: "text-[#211b13]",
  },
  {
    name: "Résumé",
    username: "View my experience",
    description: "Education, skills & experience",
    href: "/resume.pdf",
    icon: FileText,
    bg: "bg-[#f9dfa1]",
    color: "text-[#211b13]",
  },
];

const Contact = () => {
  const [copied, setCopied] = useState(false);

  // AOS initialization
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-quart",
      once: true,
      offset: 100,
      delay: 0,
      mirror: false,
      anchorPlacement: "top-bottom",
      disable: "mobile",
    });

    AOS.refresh();
  }, []);

  // Copy email functionality
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[#30271b] bg-[#14110d] px-6 py-24 text-[#f5eee4] sm:px-10 lg:py-32"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#c28a35]/[0.07] blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#c28a35]/[0.06] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div
              data-aos="fade-down"
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#9a702e]/30 bg-[#9a702e]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e9b65c]"
            >
              <Sparkles size={14} />
              Get in touch
            </div>

            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="max-w-2xl text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl"
            >
              Have an idea?
              <br />
              <span className="font-serif font-medium italic text-[#e9b65c]">
                Let us make it happen.
              </span>
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="mt-6 max-w-lg text-sm leading-7 text-[#b9ad9e] sm:text-base"
            >
              Have a project in mind, an opportunity, or just want to talk about
              technology? I would love to hear from you. My inbox is always
              open!
            </p>
          </div>

          {/* Availability Badge */}
          <div
            data-aos="fade-left"
            data-aos-delay="300"
            className="flex w-fit items-center gap-3 rounded-xl border border-[#3a3021] bg-[#1b1710] px-5 py-4 transition-all duration-300 hover:border-emerald-500/30"
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
              <span className="relative h-3 w-3 rounded-full bg-emerald-400" />
            </span>

            <div>
              <p className="text-sm font-semibold text-[#eee4d6]">
                Open to opportunities
              </p>

              <p className="mt-1 text-xs text-[#958979]">
                Let us discuss something exciting
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-6">
            {/* Email Card */}
            <div
              data-aos="fade-right"
              data-aos-delay="100"
              data-aos-duration="1100"
              className="group relative overflow-hidden rounded-3xl bg-[#ffda75] p-7 text-[#282013] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-25px_rgba(255,218,117,0.25)] sm:p-9"
            >
              <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border-[35px] border-white/10 transition-transform duration-700 group-hover:scale-110" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#67502a]">
                  <Mail size={18} />
                  Drop me an email
                </div>

                <span className="rounded-full bg-[#302619]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                  Preferred
                </span>
              </div>

              <h3 className="relative mt-7 break-all font-serif text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                {EMAIL}
              </h3>

              <div className="relative mt-8 flex flex-wrap items-center gap-3">
                {/* Send Email */}
                <a
                  href={`mailto:${EMAIL}?subject=Let's%20work%20together`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#251e12] px-6 py-3 text-sm font-semibold text-[#ffda75] transition-all duration-300 hover:-translate-y-1 hover:bg-[#44351e] hover:shadow-lg"
                >
                  <Send size={15} />
                  Send me an email
                  <ArrowUpRight size={15} />
                </a>

                {/* Copy Email */}
                <button
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="inline-flex items-center gap-2 rounded-full border border-[#59451e]/30 bg-white/20 px-5 py-3 text-sm font-semibold text-[#302619] transition-all duration-300 hover:-translate-y-1 hover:bg-white/40"
                >
                  {copied ? <Check size={16} /> : <Copy size={15} />}

                  {copied ? "Copied!" : "Copy email"}
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Response Time */}
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="group rounded-2xl border border-[#342b20] bg-[#1b1711] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#a77b37]/50 hover:bg-[#211b12]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9b65c]/10 text-[#e9b65c] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <Clock3 size={21} />
                </div>

                <p className="text-sm font-semibold text-[#eee4d6]">
                  Response time
                </p>

                <p className="mt-2 text-xs leading-5 text-[#a99b89]">
                  I usually try to respond to emails within 24–48 hours.
                </p>
              </div>

              {/* Location */}
              <div
                data-aos="fade-up"
                data-aos-delay="350"
                className="group rounded-2xl border border-[#342b20] bg-[#1b1711] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#a77b37]/50 hover:bg-[#211b12]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9b65c]/10 text-[#e9b65c] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <MapPin size={21} />
                </div>

                <p className="text-sm font-semibold text-[#eee4d6]">Location</p>

                <p className="mt-2 text-xs leading-5 text-[#a99b89]">
                  Bangladesh · Available for remote collaboration.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-5">
            {/* Social Heading */}
            <div className="mb-1">
              <p
                data-aos="fade-down"
                className="font-serif text-base italic text-[#c5a16b]"
              >
                Pick whichever is easiest for you.
              </p>

              <h3
                data-aos="fade-up"
                data-aos-delay="100"
                className="mt-2 text-xl font-semibold text-[#f2e9dd]"
              >
                Find me around the web
              </h3>
            </div>

            {/* Social Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-aos="zoom-in"
                    data-aos-delay={150 + index * 150}
                    data-aos-duration="800"
                    className={`group relative flex min-h-[165px] flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${social.bg} ${social.color}`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon
                        size={25}
                        className="transition-transform duration-300 group-hover:scale-125"
                      />

                      <ArrowUpRight
                        size={20}
                        className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </div>

                    <div>
                      <h4 className="font-serif text-xl font-semibold">
                        {social.name}
                      </h4>

                      <p className="mt-1 break-words text-sm font-medium opacity-75">
                        {social.username}
                      </p>

                      <p className="mt-3 text-xs opacity-60">
                        {social.description}
                      </p>
                    </div>
                  </a>
                );
              })}

              {/* Extra Contact Card */}
              <a
                href={`mailto:${EMAIL}?subject=Quick%20conversation`}
                data-aos="zoom-in"
                data-aos-delay="550"
                className="group flex min-h-[165px] flex-col justify-between rounded-2xl border border-[#493820] bg-[#241c11] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#d39c46]/60 hover:bg-[#302416]"
              >
                <div className="flex items-center justify-between">
                  <MessageCircle
                    size={25}
                    className="text-[#e9b65c] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                  />

                  <ArrowUpRight
                    size={20}
                    className="text-[#e9b65c] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>

                <div>
                  <h4 className="font-serif text-xl font-semibold text-[#f1e5d4]">
                    Just say hello!
                  </h4>

                  <p className="mt-2 text-xs leading-5 text-[#a99b89]">
                    No big project needed. Let us have a conversation.
                  </p>
                </div>
              </a>
            </div>

            {/* Bottom Note */}
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="mt-2 flex items-center justify-between gap-3 rounded-2xl border border-[#342b20] bg-[#1b1711] px-5 py-4 transition-all duration-300 hover:border-[#c28a35]/40"
            >
              <p className="text-xs leading-5 text-[#a99b89]">
                Have something interesting in mind?
                <span className="block font-medium text-[#e9b65c]">
                  I am all ears.
                </span>
              </p>

              <span className="font-serif text-3xl italic text-[#c89a51] transition-transform duration-300 hover:rotate-12">
                :)
              </span>
            </div>
          </div>
        </div>

        {/* Personal Closing Moment */}
        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="relative mt-24 mb-12 overflow-hidden rounded-2xl border border-[#342b20] bg-[#171512] px-7 py-10 sm:px-12 sm:py-14"
        >
          {/* Background decoration */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-[#a99b89]/10" />
          <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border border-[#a99b89]/10" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 bg-gradient-to-tl from-[#a88d6a]/10 to-transparent blur-3xl" />

          <div className="relative z-10">
            {/* Top label */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#a88d6a]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#a88d6a]">
                  A little note
                </span>
              </div>

              <span className="font-serif text-sm italic text-[#6e6254]">
                01 / 01
              </span>
            </div>

            {/* Main content */}
            <div className="mt-12 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
              <div className="max-w-2xl">
                <h3 className="font-serif text-4xl leading-tight tracking-tight text-[#eee5d9] sm:text-5xl">
                  Every ending is
                  <br />
                  <span className="italic text-[#a88d6a]">
                    a new beginning.
                  </span>
                </h3>

                <p className="mt-6 max-w-lg text-sm leading-8 text-[#a99b89]">
                  Thanks for taking a moment to explore my little corner of the
                  internet. Every project has a story, every detail has a
                  purpose, and I am always excited to create something
                  meaningful with new people.
                </p>

                <p className="mt-5 font-serif text-base italic text-[#d1c1ae]">
                  Hope our paths cross again.
                </p>
              </div>

              {/* Decorative visual */}
              <div className="relative mx-auto flex h-40 w-40 items-center justify-center md:mx-0 md:mb-2">
                <div className="absolute inset-0 rounded-full border border-[#a88d6a]/20" />
                <div className="absolute inset-3 rounded-full border border-dashed border-[#a88d6a]/30" />
                <div className="absolute inset-7 rounded-full border border-[#a88d6a]/20" />

                <span className="font-serif text-6xl italic text-[#a88d6a]">
                  ✳
                </span>

                <span className="absolute -right-1 top-7 h-2 w-2 rounded-full bg-[#a88d6a]" />
                <span className="absolute -bottom-1 left-8 h-1.5 w-1.5 rounded-full bg-[#a88d6a]/60" />
              </div>
            </div>

            {/* Bottom details */}
            <div className="mt-12 flex flex-col justify-between gap-6 border-t border-[#342b20] pt-7 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a88d6a] opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#a88d6a]" />
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#a99b89]">
                  Always open to new ideas
                </span>
              </div>

              <div className="flex items-center justify-between gap-8">
                <span className="font-serif text-sm italic text-[#a88d6a]">
                  With curiosity, always.
                </span>

                <span className="font-serif text-2xl italic text-[#eee5d9]">
                  ✦
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
