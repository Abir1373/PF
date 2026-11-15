"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

import {
  Code2,
  Brain,
  Rocket,
  Lightbulb,
  Heart,
  Coffee,
  Terminal,
  Target,
  Sparkles,
  Laptop,
  BookOpen,
  Zap,
} from "lucide-react";

const notes = [
  {
    title: "Curiosity first",
    icon: Brain,
    color: "bg-[#fef9c3]",
    rotate: "-rotate-2",
    delay: "0",
    text: "I'm deeply curious about how things work under the hood. Every new concept feels like opening a door I didn't know existed.",
  },
  {
    title: "Code is my language",
    icon: Code2,
    color: "bg-white",
    rotate: "rotate-2",
    delay: "100",
    text: "Coding isn't just what I do — it's how I express ideas, solve problems, and turn imagination into something real.",
  },
  {
    title: "Always exploring",
    icon: Rocket,
    color: "bg-[#fed7aa]",
    rotate: "-rotate-1",
    delay: "150",
    text: "New technologies excite me. I enjoy experimenting with tools, frameworks, and ideas that push my abilities further.",
  },
  {
    title: "Problem solver",
    icon: Lightbulb,
    color: "bg-[#fde68a]",
    rotate: "rotate-1",
    delay: "200",
    text: "I love the challenge of solving difficult problems. Every bug is a lesson, and every solution makes me better.",
  },
  {
    title: "A little obsessive",
    icon: Target,
    color: "bg-[#e9d5ff]",
    rotate: "-rotate-2",
    delay: "250",
    text: "Once something grabs my attention, I go deep — researching, building, breaking, fixing, and rebuilding until it feels right.",
  },
  {
    title: "Creative mindset",
    icon: Sparkles,
    color: "bg-[#bfdbfe]",
    rotate: "rotate-2",
    delay: "300",
    text: "I believe great development is a combination of logic and creativity. I care about how things work and how they feel.",
  },
  {
    title: "Never stop learning",
    icon: BookOpen,
    color: "bg-[#bbf7d0]",
    rotate: "-rotate-1",
    delay: "350",
    text: "Technology never stands still, and neither do I. I constantly learn, explore, and challenge myself to improve.",
  },
  {
    title: "Building with purpose",
    icon: Heart,
    color: "bg-[#fecdd3]",
    rotate: "rotate-1",
    delay: "400",
    text: "My goal isn't just to write code. It's to build useful things that make people's lives and work a little easier.",
  },
];

const interests = [
  { name: "Web Development", icon: Laptop },
  { name: "Problem Solving", icon: Brain },
  { name: "Creative Coding", icon: Sparkles },
  { name: "Learning New Tech", icon: Zap },
  { name: "Building Projects", icon: Terminal },
  { name: "Coffee & Coding", icon: Coffee },
];

const principles = [
  "Write clean and maintainable code.",
  "Never stop being curious.",
  "Learn by building real things.",
  "Focus on details that matter.",
];

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });

    AOS.refresh();
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen bg-[#0c0c0c] text-white overflow-hidden py-24 px-6"
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#fff_1px,transparent_1px)] bg-[length:24px_24px]" />

      <div className="absolute top-40 -left-32 w-72 h-72 bg-orange-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-40 -right-32 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16" data-aos="fade-up">
          <p className="text-sm tracking-[0.25em] text-orange-400 uppercase mb-4">
            ✦ The human behind the code
          </p>

          <h2 className="text-4xl md:text-6xl font-medium tracking-tight">
            Coding is how I
            <span className="text-orange-400">move forward.</span>
          </h2>

          <p className="text-neutral-400 max-w-2xl mt-6 text-lg leading-relaxed">
            Beyond the technologies, frameworks, and lines of code, there is a
            curious mind that loves learning, experimenting, and creating
            meaningful things.
          </p>
        </div>

        {/* Introduction */}
        <div
          data-aos="fade-up"
          className="mb-20 grid md:grid-cols-[1.2fr_0.8fr] gap-8"
        >
          <div className="border border-white/10 bg-white/[0.025] rounded-2xl p-8">
            <span className="text-orange-400 text-sm tracking-widest uppercase">
              A little introduction
            </span>

            <h3 className="text-2xl md:text-3xl mt-5 font-medium">
              More than just a developer.
            </h3>

            <p className="text-neutral-400 mt-5 leading-8">
              I am someone who finds excitement in turning ideas into reality. I
              enjoy exploring how technology works, creating digital
              experiences, and continuously improving my skills. I do not
              believe in knowing everything. I believe in having the curiosity
              to learn anything.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-orange-400/20 bg-gradient-to-br from-orange-500/10 to-transparent p-8 flex flex-col justify-between">
            <Sparkles className="text-orange-400" size={32} />

            <div>
              <p className="text-neutral-400 text-sm uppercase tracking-widest">
                My mindset
              </p>

              <h3 className="text-3xl font-medium mt-4 leading-snug">
                Learn.
                <br />
                Build.
                <br />
                Break.
                <br />
                Repeat.
              </h3>
            </div>

            <p className="text-neutral-500 text-sm mt-8">
              Growth happens outside the comfort zone.
            </p>
          </div>
        </div>

        {/* Sticky Notes */}
        <div className="mb-12" data-aos="fade-up">
          <p className="text-orange-400 text-sm uppercase tracking-widest mb-3">
            Things that define me
          </p>
          <h3 className="text-3xl md:text-4xl font-medium">
            Notes from my mind.
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {notes.map((note, index) => {
            const Icon = note.icon;

            return (
              <motion.div
                key={note.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.07 }}
                whileHover={{ y: -8, rotate: 0, scale: 1.03 }}
                className={`${note.color} ${note.rotate} min-h-[245px] p-6 rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.25)] text-neutral-900 relative transition-colors`}
              >
                <div className="flex justify-between items-center mb-8">
                  <Icon size={25} strokeWidth={1.7} />
                  <span className="text-xs opacity-50 font-mono">
                    0{index + 1}
                  </span>
                </div>

                <h4 className="font-semibold text-xl mb-3">{note.title}</h4>

                <p className="text-[15px] leading-relaxed opacity-80">
                  {note.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Interests */}
        <div className="mt-28" data-aos="fade-up">
          <p className="text-orange-400 text-sm uppercase tracking-widest mb-3">
            Outside the editor
          </p>

          <h3 className="text-3xl md:text-4xl font-medium mb-10">
            Things I genuinely enjoy.
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {interests.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -5, borderColor: "rgba(251,146,60,0.5)" }}
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                  className="flex items-center gap-4 p-5 rounded-xl border border-white/10 bg-white/[0.025] transition-colors"
                >
                  <div className="p-3 rounded-lg bg-orange-400/10 text-orange-400">
                    <Icon size={22} />
                  </div>

                  <span className="text-sm md:text-base text-neutral-300">
                    {item.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Philosophy */}
        <div
          data-aos="fade-up"
          className="mt-28 grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <p className="text-orange-400 text-sm uppercase tracking-widest mb-3">
              What I believe in
            </p>

            <h3 className="text-3xl md:text-5xl font-medium leading-tight">
              Good code.
              <br />
              <span className="text-neutral-500">Better thinking.</span>
              <br />
              Real impact.
            </h3>

            <p className="text-neutral-400 mt-6 leading-8">
              For me, programming is not only about making things work. It is
              about understanding problems, thinking differently, and creating
              solutions that actually matter.
            </p>
          </div>

          <div className="space-y-4">
            {principles.map((principle, index) => (
              <div
                key={principle}
                data-aos="fade-left"
                data-aos-delay={index * 100}
                className="flex items-center gap-4 border-b border-white/10 pb-5"
              >
                <span className="text-orange-400 font-mono text-sm">
                  0{index + 1}
                </span>

                <p className="text-neutral-300">{principle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-28 max-w-4xl mx-auto text-center border-t border-white/10 pt-16"
        >
          <Sparkles className="text-orange-400 mx-auto mb-6" size={30} />

          <h3 className="text-3xl md:text-5xl font-medium leading-tight">
            I don&apos;t just write code.
            <br />
            <span className="text-orange-400">I build possibilities.</span>
          </h3>

          <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl mx-auto mt-7">
            I use technology to understand the world a little better every day —
            and to build things that make other people&apos;s work feel lighter.
          </p>

          <p className="text-neutral-600 text-sm mt-10 tracking-widest uppercase">
            Still learning. Still building. Still growing.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
