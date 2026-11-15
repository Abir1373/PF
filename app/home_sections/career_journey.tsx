"use client";

const CareerJourney = () => {
  const experiences = [
    {
      role: "Intern Web Developer",
      date: "2024 Jan - Dec 2024",
      description:
        "Supported clients with onboarding and resolved technical issues.",
    },
    {
      role: "Jr. Web Developer",
      date: "Feb 2025 - Oct 2026",
      description:
        "Built and maintained web features while turning user feedback into real product improvements.",
    },
    {
      role: "Full-Stack Developer",
      date: "Nov 2026 - Present",
      description:
        "Developing scalable full-stack applications with Next.js, React, and modern backend tools.",
      current: true,
    },
  ];

  return (
    <section
      data-aos="fade-down-left"
      className="relative overflow-hidden border-t border-[#292219] bg-[#14110d] px-6 py-16 text-white sm:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Timeline heading */}
        <p className="mb-12 text-sm font-medium tracking-wide text-[#b8a995]">
          How I got here, all at Russkin Bright
        </p>

        {/* Desktop Timeline */}
        <div className="relative hidden md:block">
          {/* Timeline line */}
          <div className="absolute left-2 top-[7px] h-[2px] w-[82%] bg-[#b47a24]" />

          {/* Experiences */}
          <div className="relative grid grid-cols-3 gap-8">
            {experiences.map((experience) => (
              <div key={experience.role} className="relative">
                {/* Timeline marker */}
                <div
                  className={`relative z-10 mb-7 h-4 w-4 rounded-full border-2 border-[#f5a623] ${
                    experience.current ? "bg-[#f5a623]" : "bg-[#14110d]"
                  }`}
                />

                {/* Current position annotation */}
                {experience.current && (
                  <div className="absolute -top-[58px] left-0 flex items-center gap-2">
                    <span className="font-serif text-lg font-semibold italic text-[#e7ddd0]">
                      me, right now
                    </span>
                    <span className="text-3xl text-[#f5a623]">↷</span>
                  </div>
                )}

                <h3 className="mb-1 text-lg font-semibold tracking-tight text-[#f5eee5]">
                  {experience.role}
                </h3>

                <p className="mb-2 text-sm font-medium text-[#f5a623]">
                  {experience.date}
                </p>

                <p className="max-w-sm text-sm leading-6 text-[#b8ada1]">
                  {experience.description}
                </p>
              </div>
            ))}
          </div>

          {/* Learning status - Walking man */}
          <div className="absolute right-0 top-[-30px] flex items-center gap-3">
            <span className="inline-block text-2xl animate-walk">🚶</span>
            <div>
              <p className="font-serif text-sm font-semibold italic text-[#f5a623]">
                ⌃ learning to level up
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-wide text-[#a99c8d]">
                next move: loading...
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="relative ml-2 space-y-10 border-l border-[#a8752b] pl-7 md:hidden">
          {experiences.map((experience) => (
            <div key={experience.role} className="relative">
              <div
                className={`absolute -left-[34px] top-1 h-3.5 w-3.5 rounded-full border-2 border-[#f5a623] ${
                  experience.current ? "bg-[#f5a623]" : "bg-[#14110d]"
                }`}
              />

              {experience.current && (
                <p className="mb-2 font-serif text-sm italic text-[#f5a623]">
                  ↳ me, right now
                </p>
              )}

              <h3 className="text-base font-semibold text-[#f5eee5]">
                {experience.role}
              </h3>

              <p className="mt-1 text-sm font-medium text-[#f5a623]">
                {experience.date}
              </p>

              <p className="mt-2 max-w-sm text-sm leading-6 text-[#b8ada1]">
                {experience.description}
              </p>

              {experience.current && (
                <p className="mt-3 flex items-center gap-2 font-serif text-xs italic text-[#c99a50]">
                  <span className="inline-block animate-walk">🚶</span>
                  Learning to level up · Next move: loading...
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto mt-20 max-w-7xl border-t border-[#292219]" />

      {/* Current Position Card */}
      <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-6 rounded-2xl border border-[#382c1d] bg-[#19150f] px-6 py-7 transition-all duration-300 hover:border-[#8b622c]/60 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-4">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>

          <div>
            <p className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#a99e8e]">
              Current Position
            </p>

            <h3 className="text-lg font-semibold text-[#eee6dc] sm:text-xl">
              I am currently working at{" "}
              <a
                href="https://russkinbright.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5a623] underline decoration-[#f5a623]/40 underline-offset-4 transition-colors hover:text-[#ffd080]"
              >
                Russkin Bright
              </a>
              .
            </h3>
          </div>
        </div>

        <a
          href="https://russkinbright.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-[#403322] bg-[#14110d] px-5 py-2.5 text-xs font-semibold text-[#e8ded0] transition-all duration-300 hover:border-[#f5a623]/50 hover:bg-[#f5a623]/10 hover:text-[#f5a623]"
        >
          Visit Russkin Bright
          <span className="text-sm">↗</span>
        </a>
      </div>
    </section>
  );
};

export default CareerJourney;
