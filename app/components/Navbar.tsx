import React from "react";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiGithub, FiLinkedin } from "react-icons/fi";

export default function Navbar() {
  return (
    <div className="navbar bg-transparent px-0 py-4 sticky top-0 z-50 backdrop-blur-md">
      {/* Left side - Brand + Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle lg:hidden text-base-content hover:bg-white/10"
          >
            <HiMenuAlt3 size={24} />
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content mt-3 z-1 p-3 shadow-xl bg-[#111] rounded-box w-52 border border-white/10"
          >
            <li>
              <Link href="/" className="py-2.5">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="py-2.5">
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="py-2.5">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/contact" className="py-2.5">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <Link
          href="/"
          className="btn btn-ghost text-xl font-semibold tracking-tight hover:bg-transparent"
        >
          Abir<span className="text-primary">.</span>
        </Link>
      </div>

      {/* Center - Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li>
            <Link href="/" className="rounded-lg hover:bg-white/10">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="rounded-lg hover:bg-white/10">
              About
            </Link>
          </li>
          <li>
            <Link href="/projects" className="rounded-lg hover:bg-white/10">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/contact" className="rounded-lg hover:bg-white/10">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Right side */}
      <div className="navbar-end gap-2">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-circle hover:bg-white/10"
        >
          <FiGithub size={20} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-circle hover:bg-white/10"
        >
          <FiLinkedin size={20} />
        </a>

        <Link
          href="/contact"
          className="btn bg-yellow-800 btn-sm rounded-full px-5 hidden sm:flex"
        >
          Contact Me
        </Link>
      </div>
    </div>
  );
}
