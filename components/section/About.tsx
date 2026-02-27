"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !stripRef.current) return;

    const section = sectionRef.current;
    const strip = stripRef.current;

    const ctx = gsap.context(() => {
      let scrollWidth = strip.scrollWidth;
      let scrollLength = scrollWidth - window.innerWidth;

      gsap.to(strip, {
        x: -scrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen overflow-hidden bg-white dark:bg-black">
      <div
        ref={stripRef}
        className="flex h-full items-center"
      >
        <div className="min-w-screen flex items-center justify-center text-6xl">
          About Me
        </div>

        <div className="min-w-screen flex items-center justify-center text-6xl">
          Skills
        </div>

        <div className="min-w-screen flex items-center justify-center text-6xl">
          Experience
        </div>
      </div>
    </section>
  );
}