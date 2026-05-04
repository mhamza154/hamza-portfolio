"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

// "MUHAMMAD HAMZA" split into letters for GSAP animation
const NAME_LINE1 = "MUHAMMAD".split("");
const NAME_LINE2 = "HAMZA".split("");

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Refs = useRef<HTMLSpanElement[]>([]);
  const line2Refs = useRef<HTMLSpanElement[]>([]);
  const progressRef = useRef<HTMLSpanElement>(null);
  const progressValueRef = useRef({ val: 0 });

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const allLetters = [...line1Refs.current, ...line2Refs.current].filter(Boolean);

    // Initial state — letters hidden below
    gsap.set(allLetters, { yPercent: 120, opacity: 0 });
    gsap.set(progressRef.current, { opacity: 0 });

    const tl = gsap.timeline();

    // 1) Letters animate in — staggered like GSAP.com hero text
    tl.to(allLetters, {
      yPercent: 0,
      opacity: 1,
      ease: "power4.out",
      duration: 0.5,
      stagger: 0.025,
    });

    // 2) Progress counter fades in
    tl.to(progressRef.current, { opacity: 1, duration: 0.2 }, "-=0.2");

    // 3) Count from 0 to 100
    tl.to(progressValueRef.current, {
      val: 100,
      duration: 1.0,
      ease: "power1.inOut",
      onUpdate: () => {
        if (progressRef.current) {
          progressRef.current.textContent = `${Math.floor(progressValueRef.current.val)}%`;
        }
      },
    }, "-=0.1");

    // 4) Letters animate out — slide up like GSAP.com exit
    tl.to(allLetters, {
      yPercent: -120,
      opacity: 0,
      ease: "power4.in",
      duration: 0.4,
      stagger: 0.015,
    }, "+=0.05");

    // 5) Whole preloader slides up
    tl.to(containerRef.current, {
      yPercent: -100,
      ease: "power4.inOut",
      duration: 0.6,
      onComplete: () => {
        document.body.style.overflow = "auto";
        onComplete();
      },
    }, "-=0.2");

    return () => {
      tl.kill();
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-white dark:bg-black flex items-center justify-center"
      style={{ willChange: "transform" }}
    >
      {/* Centered name */}
      <div className="flex flex-col items-center gap-2 select-none">
        {/* Line 1: MUHAMMAD */}
        <div className="flex overflow-hidden">
          {NAME_LINE1.map((letter, i) => (
            <span
              key={i}
              ref={(el) => { if (el) line1Refs.current[i] = el; }}
              className="inline-block text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tight leading-none text-black dark:text-white"
              style={{ willChange: "transform, opacity" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </div>

        {/* Line 2: HAMZA */}
        <div className="flex overflow-hidden">
          {NAME_LINE2.map((letter, i) => (
            <span
              key={i}
              ref={(el) => { if (el) line2Refs.current[i] = el; }}
              className="inline-block text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tight leading-none"
              style={{
                willChange: "transform, opacity",
                // Brand color for second line
                color: "var(--light-brand)",
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom-right progress counter */}
      <div className="absolute bottom-8 right-10 text-right">
        <span
          ref={progressRef}
          className="text-5xl md:text-7xl font-black tabular-nums text-black dark:text-white"
          style={{ willChange: "opacity" }}
        >
          0%
        </span>
      </div>
    </div>
  );
}
