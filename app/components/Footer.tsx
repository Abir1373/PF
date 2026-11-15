"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative border-t border-[#292219] bg-[#0f0d0a] px-6 pt-20 pb-10 text-white sm:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Top Section */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Left Info */}
          <div className="max-w-sm">
            <p className="text-sm leading-relaxed text-[#b8a995]">
              Full-stack developer in Sylhet, Bangladesh, working worldwide.
            </p>

            <div className="mt-6 space-y-2 text-sm">
              <Link
                href="mailto:your.email@gmail.com"
                className="block text-[#e8ded0] transition hover:text-[#f5a623]"
              >
                your.email@gmail.com
              </Link>
              <Link
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#b8a995] transition hover:text-[#f5a623]"
              >
                GitHub
              </Link>
              <Link
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#b8a995] transition hover:text-[#f5a623]"
              >
                LinkedIn
              </Link>
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex gap-16 text-sm">
            <div className="space-y-3">
              <Link
                href="/"
                className="block text-[#e8ded0] transition hover:text-[#f5a623]"
              >
                Home
              </Link>
              <Link
                href="/projects"
                className="block text-[#e8ded0] transition hover:text-[#f5a623]"
              >
                Work
              </Link>
            </div>
            <div className="space-y-3">
              <Link
                href="/cv.pdf"
                className="block text-[#e8ded0] transition hover:text-[#f5a623]"
              >
                Résumé
              </Link>
              <Link
                href="/contact"
                className="block text-[#e8ded0] transition hover:text-[#f5a623]"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Big Name + Character */}
        <div className="relative mt-24 mb-16">
          <h2 className="text-[clamp(2.8rem,10vw,7rem)] font-bold leading-none tracking-tight text-[#f5eee5]">
            Dewan Abir
            <br />
            Mahmud
          </h2>

          {/* Speech bubble + character */}
          <div className="absolute -top-8 right-0 flex items-end gap-3 sm:right-10 md:right-20">
            <div className="relative rounded-2xl bg-[#f5e6c8] px-4 py-2.5 text-sm font-medium text-[#3d2b1f] shadow-sm">
              thanks for reading this far
              {/* little tail */}
              <div className="absolute -right-1.5 bottom-3 h-3 w-3 rotate-45 bg-[#f5e6c8]" />
            </div>

            <div className="flex flex-col items-center">
              <span className="text-5xl leading-none">😊</span>
              <span className="text-4xl -mt-2 animate-wave">👋</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#292219] pt-8 text-sm text-[#a99c8d] sm:flex-row">
          <p>© 2026 Dewan Abir Mahmud</p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1 transition hover:text-[#f5a623]"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
