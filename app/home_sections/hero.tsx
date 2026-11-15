import Link from "next/link";
import {
  FiGithub,
  FiLinkedin,
  FiDownload,
  FiArrowUpRight,
} from "react-icons/fi";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-[85vh] flex items-center py-12 lg:py-20 relative">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Content */}
        <div className="order-2 lg:order-1 relative z-10">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-sm text-white/70">
              Taking on one new project this quarter
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Hi, I&apos;m <br />
            <span className="text-white">Dewan Abir</span>{" "}
            <span className="text-amber-400">Mahmud.</span>
          </h1>

          {/* Main Description */}
          <p className="text-lg sm:text-xl text-white/80 max-w-lg leading-relaxed mb-5">
            A full-stack developer from Bangladesh, building fast, accessible
            web apps with Next.js, React, TypeScript and Tailwind.
          </p>

          {/* Secondary Text */}
          <p className="text-base text-white/50 max-w-md leading-relaxed mb-10">
            I started as an intern junior developer at itTraining4U, learning
            the fundamentals of building software. Then I moved to SmithIT,
            where I sharpened my skills shipping real products. Now at Russkin
            Bright, I build the kind of software that just works — the kind
            users never have to write in about.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-medium rounded-full px-6 py-3 transition-all hover:scale-[1.02]"
            >
              See my work
              <FiArrowUpRight size={18} />
            </Link>

            <a
              href="/cv.pdf"
              className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 hover:border-white/30 rounded-full px-5 py-3 transition-all"
            >
              <FiDownload size={16} />
              Download CV
            </a>

            <div className="flex items-center gap-1 ml-1">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="btn btn-ghost btn-circle hover:bg-white/10"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="btn btn-ghost btn-circle hover:bg-white/10"
              >
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Polaroid Photo */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative">
            {/* Soft glow */}
            <div className="absolute -inset-10 bg-amber-500/15 rounded-full blur-3xl opacity-50 pointer-events-none" />

            {/* Polaroid Frame */}
            <div className="relative bg-white p-3 pb-14 rounded-sm shadow-2xl rotate-[2.5deg] hover:rotate-0 transition-transform duration-500 ease-out">
              {/* Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#e8d5a3]/90 rotate-[-4deg] shadow-sm" />

              {/* Image */}
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 overflow-hidden bg-neutral-800">
                <Image
                  src="/pic.jpeg"
                  alt="Dewan Abir Mahmud"
                  fill
                  sizes="(max-width: 768px) 256px, 288px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Handwritten caption */}
              <p className="absolute bottom-4 left-0 right-0 text-center text-neutral-700 font-medium italic text-lg tracking-wide">
                hi, that&apos;s me
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
