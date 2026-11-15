import {
  SiNextdotjs,
  SiJavascript,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiJsonwebtokens,
  SiFirebase,
} from "react-icons/si";
import { FaCode, FaShieldAlt } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";

const technologies = [
  { name: "Next.js", icon: SiNextdotjs, category: "Frontend" },
  { name: "JavaScript", icon: SiJavascript, category: "Language" },
  { name: "Express.js", icon: SiExpress, category: "Backend" },
  { name: "MongoDB", icon: SiMongodb, category: "Database" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "Database" },
  { name: "Prisma", icon: SiPrisma, category: "ORM" },
  { name: "REST API", icon: FaCode, category: "Backend" },
  { name: "JWT", icon: SiJsonwebtokens, category: "Security" },
  { name: "Firebase Auth", icon: SiFirebase, category: "Authentication" },
  { name: "Better Auth", icon: FaShieldAlt, category: "Authentication" },
];

const Skill = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a0908] px-6 py-28 text-white">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-95 w-170 -translate-x-1/2 rounded-full bg-amber-500/12 blur-[150px]" />
        <div className="absolute bottom-0 right-0 h-95 w-95 rounded-full bg-yellow-600/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/[0.08] px-5 py-2 text-sm font-medium text-amber-300">
            <HiOutlineSparkles className="text-lg" />
            My Tech Stack
          </div>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            What I Build{" "}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              With
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
            A carefully chosen set of tools I use to turn ideas into clean,
            scalable, and delightful digital products.
          </p>
        </div>

        {/* Technology cards */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {technologies.map((tech) => {
            const Icon = tech.icon;

            return (
              <div
                key={tech.name}
                className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.03] p-[1px] transition-all duration-500 hover:-translate-y-2.5 hover:border-amber-400/40 hover:shadow-[0_20px_50px_-18px_rgba(251,191,36,0.25)]"
              >
                <div className="flex h-full min-h-[160px] flex-col items-center justify-center rounded-2xl bg-[#12110f]/90 px-3 py-8 transition-all duration-500 group-hover:bg-[#181612]">
                  {/* Icon */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.04] transition-all duration-500 group-hover:scale-110 group-hover:border-amber-400/35 group-hover:bg-amber-400/10">
                    <Icon className="text-[28px] text-zinc-400 transition-colors duration-500 group-hover:text-amber-300" />
                  </div>

                  {/* Name */}
                  <h3 className="text-sm font-semibold tracking-wide text-zinc-200 transition-colors duration-300 group-hover:text-white md:text-[15px]">
                    {tech.name}
                  </h3>

                  {/* Category */}
                  <span className="mt-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600 transition-colors duration-300 group-hover:text-amber-400/70">
                    {tech.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-16 flex items-center justify-center gap-4 text-sm text-zinc-500">
          <span className="h-px w-12 bg-zinc-800" />
          Always learning. Always building.
          <span className="h-px w-12 bg-zinc-800" />
        </div>
      </div>
    </section>
  );
};

export default Skill;
