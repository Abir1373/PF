"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { LogIn, LogOut, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const [roleInfo, setRoleInfo] = useState<{
    userId: string;
    role: string | null;
  } | null>(null);

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    let active = true;

    fetch("/api/current-user/role", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not fetch user role");
        return (await response.json()) as { role: string };
      })
      .then((data) => {
        if (active) setRoleInfo({ userId, role: data.role });
      })
      .catch(() => {
        if (active) setRoleInfo({ userId, role: null });
      });

    return () => {
      active = false;
    };
  }, [userId]);

  const isAdmin = Boolean(
    userId && roleInfo?.userId === userId && roleInfo.role === "admin",
  );

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.reload();
        },
      },
    });
  };

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
            {isAdmin && (
              <li>
                <Link href="/add-project" className="py-2.5">
                  Add Project
                </Link>
              </li>
            )}
            <li>
              <Link href="/contact" className="py-2.5">
                Contact
              </Link>
            </li>
            <li className="border-t border-white/10 mt-1 pt-1">
              {session?.user ? (
                <button
                  onClick={handleSignOut}
                  className="py-2.5 text-red-400 hover:text-red-300"
                >
                  <LogOut size={16} /> Sign Out (
                  {session.user.name?.split(" ")[0] || "User"})
                </button>
              ) : (
                <Link
                  href="/login"
                  className="py-2.5 text-amber-400 hover:text-amber-300"
                >
                  <LogIn size={16} /> Login
                </Link>
              )}
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
          {isAdmin && (
            <li>
              <Link
                href="/add-project"
                className="rounded-lg hover:bg-white/10"
              >
                Add Project
              </Link>
            </li>
          )}
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
          href="https://github.com/Abir1373 "
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-circle hover:bg-white/10"
          aria-label="GitHub profile"
        >
          <FiGithub size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/dewan-abir-mahmud-3721722a5/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-circle hover:bg-white/10"
          aria-label="LinkedIn profile"
        >
          <FiLinkedin size={20} />
        </a>

        {session?.user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-sm rounded-full border border-amber-400/30 bg-amber-400/5 text-amber-400 hover:bg-amber-400/15 gap-2 px-3"
            >
              <User size={15} />
              <span className="max-w-[90px] truncate">
                {session.user.name?.split(" ")[0] || "User"}
              </span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 mt-2 shadow-2xl bg-[#141414] border border-white/10 rounded-xl w-44 z-50 text-sm"
            >
              <li className="px-3 py-1.5 text-xs text-neutral-400 border-b border-white/10 truncate">
                {session.user.email}
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg mt-1"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            href="/login"
            className="btn btn-sm rounded-full border border-amber-400/30 text-amber-400 bg-amber-400/5 hover:bg-amber-400 hover:text-neutral-950 hover:border-amber-400 transition-all font-medium px-4 gap-1.5"
          >
            <LogIn size={15} />
            <span>Login</span>
          </Link>
        )}

        <Link
          href="/contact"
          className="btn bg-yellow-800 hover:bg-yellow-700 text-white border-none btn-sm rounded-full px-5 hidden sm:flex"
        >
          Contact Me
        </Link>
      </div>
    </div>
  );
}
