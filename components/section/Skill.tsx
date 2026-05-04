"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill, RiNextjsFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { GrWordpress } from "react-icons/gr";
import { SiMysql } from "react-icons/si";
import AnimatedText from "../elements/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const cardsData = [
  {
    icon: FaReact,
    title: "React",
    tagline: "Component Architecture",
    sys: "SYS.01",
    capacity: 86,
  },
  {
    icon: RiNextjsFill,
    title: "Next.js",
    tagline: "SSR & SSG",
    sys: "SYS.02",
    capacity: 86,
  },
  {
    icon: BiLogoTypescript,
    title: "TypeScript",
    tagline: "Type Safety",
    sys: "SYS.03",
    capacity: 76,
  },
  {
    icon: RiTailwindCssFill,
    title: "TailwindCSS",
    tagline: "Utility First",
    sys: "SYS.04",
    capacity: 96,
  },
  {
    icon: GrWordpress,
    title: "WordPress",
    tagline: "CMS Framework",
    sys: "SYS.05",
    capacity: 92,
  },
  {
    icon: SiMysql,
    title: "MySQL",
    tagline: "Database Layer",
    sys: "SYS.06",
    capacity: 72,
  },
];

export default function Coding() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    document.fonts.ready.then(() => {
      /* -------------------------
      RANDOM CARD JHATKA SYSTEM
      ------------------------- */

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".tech-card");

        const randomMove = () => {
          const randomCard = gsap.utils.random(cards);

          gsap.to(randomCard, {
            y: gsap.utils.random(-13, 13), // small jhatka
            duration: 0.18,
            yoyo: true,
            repeat: 1,
            ease: "power1.out",
            onComplete: () => {
              gsap.delayedCall(gsap.utils.random(1, 2), randomMove);
            },
          });
        };

        ScrollTrigger.create({
          trigger: section,
          start: "top 70%",
          onEnter: () => randomMove(),
        });
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="bg-white dark:bg-black relative min-h-screen w-full flex flex-col items-center py-32 px-6 lg:px-16 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-light-brand/10 dark:bg-dark-brand/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="skill-header space-y-4 text-center mb-20 max-w-4xl relative z-10">
        <AnimatedText start="top 70%">
          <span className="text-light-brand dark:text-dark-brand font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
            04 / System Architecture
          </span>
          <h2 className="my-6">
            Tech <span className="stroke-text font-bold">Matrix.</span>
          </h2>
          <p>
            A high-performance arsenal optimised for scalability, security, and
            speed.
          </p>
          <span className="block mt-4 text-xs font-mono text-gray-600 uppercase tracking-widest">
            // Hover over modules to inspect
          </span>
        </AnimatedText>
      </div>

      <div className="relative z-10 w-full max-w-350 mx-auto lg:px-16 flex flex-wrap justify-center gap-6 md:gap-8">
        {cardsData.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="tech-card group w-full border p-6 rounded-2xl bg-white dark:bg-black shadow-lg md:shadow-2xl sm:w-[calc(50%-1rem)] lg:w-[calc(30%-1.5rem)] max-w-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-1 rounded-xl border group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-10 h-10" />
                </div>

                <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest group-hover:text-lime-accent/70">
                  {card.sys}
                </span>
              </div>

              <div>
                <h5>{card.title}</h5>

                <span className="text-gray-600 dark:text-gray-400 text-xs">
                  {card.tagline}
                </span>

                <div className="mt-2 w-full h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden flex items-center">
                  <div
                    className="h-full bg-light-brand dark:bg-dark-brand shadow-[0_0_10px_rgba(206,244,65,0.5)] transform origin-left transition-transform duration-1000 ease-out scale-x-0 group-hover:scale-x-100"
                    style={{ width: `${card.capacity}%` }}
                  ></div>
                </div>

                <div className="flex justify-between mt-2">
                  <span className="text-[9px]">CAPACITY</span>

                  <span className="text-[10px] text-light-brand dark:text-dark-brand opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                    {card.capacity} %
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
