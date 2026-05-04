"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MouseTrail from "@/components/elements/MouseTrail";
import AnimatedText from "@/components/elements/SplitText";
import AnimatedButton from "@/components/elements/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const circleRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const circle = circleRef.current;
      const footer = footerRef.current;
      const content = contentRef.current;

      if (!circle || !footer || !content) return;

      const isMobile = window.innerWidth < 768;

      // ── MOBILE: no circle animation, content always visible ──────────────
      if (isMobile) {
        gsap.set(circle, { display: "none" });
        gsap.set(content, { opacity: 1, y: 0 });
        return;
      }

      // ── DESKTOP ───────────────────────────────────────────────────────────
      // Content starts hidden — circle reveal shows it
      gsap.set(content, { opacity: 0, y: 40 });
      // Circle starts small at top-center of footer
      gsap.set(circle, { scale: 1 });

      // Timeline: circle grows then content appears
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 80%",
          end: "center center",
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1: circle scales to cover entire footer area
      tl.to(circle, {
        scale: 200,
        ease: "power2.inOut",
        duration: 0.6,
      });

      // Phase 2: content fades in after circle fills screen
      tl.to(
        content,
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          duration: 0.4,
        },
        ">-0.1"
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-light-brand dark:bg-dark-brand md:bg-white md:dark:bg-black"
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('/assets/img/noise.svg')] opacity-70 dark:opacity-40 z-10 pointer-events-none" />

      {/* Mouse trail — only visible inside footer */}
      <MouseTrail />

      {/* Expanding circle — desktop reveal element */}
      <div
        ref={circleRef}
        className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-light-brand dark:bg-dark-brand rounded-full pointer-events-none z-0"
        style={{ transformOrigin: "center center" }}
      />

      {/* Main content — always on top of circle */}
      <div
        ref={contentRef}
        className="container mx-auto relative text-center flex flex-col items-center gap-8 z-20 px-6 py-20"
      >
        {/* Heading */}
        <AnimatedText scrollTrigger={false}>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight text-black dark:text-black md:text-black">
            Let&apos;s Work <br />
            <span className="stroke-text font-black">Together.</span>
          </h2>
        </AnimatedText>

        {/* Sub-paragraph */}
        <p className="max-w-xl text-base md:text-lg text-black/70 dark:text-black/70 md:text-black/70 leading-relaxed">
          I&apos;m a Frontend developer passionate about building fast, modern,
          and responsive websites. Whether you have a project in mind or just
          want to chat my inbox is always open.
        </p>

        {/* CTA Button */}
        <AnimatedButton
          label="Let's Work Together"
          href="mailto:m.hamzamughal60@gmail.com"
          newTab={true}
          iconPosition="right"
          className="font-bold w-fit transition-colors hover:text-black flex items-center gap-3 group tracking-widest uppercase text-xs"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform stroke-[3px]"
            >
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          }
        />

        {/* Divider */}
        <div className="w-full max-w-2xl h-px bg-black/20 mt-4" />

        {/* Footer bottom info */}
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-2xl gap-4 text-sm text-black/60">
          <span>© {new Date().getFullYear()} Muhammad Hamza. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
