"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "@/components/elements/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const marqueeRef = useRef<HTMLHeadingElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    let marqueeTween: gsap.core.Tween | null = null;
    let stackTimeline: gsap.core.Timeline | null = null;

    /* =========================
       1️⃣ MARQUEE ANIMATION
    ==========================*/
    if (marqueeRef.current && containerRef.current) {
      const marquee = marqueeRef.current;
      const container = containerRef.current;

      const originalText = marquee.innerHTML;
      const textWidth = marquee.offsetWidth;
      const containerWidth = container.offsetWidth;

      const copies = Math.ceil(containerWidth / textWidth) + 2;

      marquee.innerHTML = "";
      for (let i = 0; i < copies; i++) {
        const span = document.createElement("span");
        span.style.paddingRight = "4rem";
        span.innerHTML = originalText;
        marquee.appendChild(span);
      }

      const totalWidth = marquee.scrollWidth / 2;

      marqueeTween = gsap.to(marquee, {
        x: -totalWidth,
        ease: "linear",
        duration: 100,
        repeat: -1,
      });
    }

    /* =========================
       2️⃣ POINTER 3D EFFECT
    ==========================*/
    let handleMove: ((e: PointerEvent) => void) | null = null;
    let handleLeave: (() => void) | null = null;

    if (nameRef.current) {
      const nameEl = nameRef.current;

      gsap.set(section, { perspective: 650 });
      gsap.set(nameEl, {
        yPercent: -33.3333,
        rotationX: 0,
        rotationY: 0,
        x: 0,
        y: 0,
      });

      const outerRX = gsap.quickTo(nameEl, "rotationX", { ease: "power3" });
      const outerRY = gsap.quickTo(nameEl, "rotationY", { ease: "power3" });
      const innerX = gsap.quickTo(nameEl, "x", { ease: "power3" });
      const innerY = gsap.quickTo(nameEl, "y", { ease: "power3" });

      handleMove = (e: PointerEvent) => {
        outerRX(
          gsap.utils.interpolate(15, -15, e.clientY / window.innerHeight),
        );
        outerRY(gsap.utils.interpolate(-15, 15, e.clientX / window.innerWidth));
        innerX(gsap.utils.interpolate(-30, 30, e.clientX / window.innerWidth));
        innerY(gsap.utils.interpolate(-30, 30, e.clientY / window.innerHeight));
      };

      handleLeave = () => {
        outerRX(0);
        outerRY(0);
        innerX(0);
        innerY(0);

        gsap.to(nameEl, {
          yPercent: -33.3333,
          duration: 0.5,
          ease: "power3.out",
        });
      };

      section.addEventListener("pointermove", handleMove);
      section.addEventListener("pointerleave", handleLeave);
    }

    /* =========================
       3️⃣ STACK PANEL SCROLL
    ==========================*/
    stackTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
        pin: true,
        pinSpacing: false,
      },
    });

    stackTimeline
      .to(section, {
        scale: 0.7,
        opacity: 0.5,
        borderTopLeftRadius: "30px",
        borderTopRightRadius: "30px",
        ease: "none",
      })
      .to(section, {
        opacity: 0,
        ease: "none",
      });
    /* =========================
       CLEANUP
    ==========================*/
    return () => {
      if (marqueeTween) marqueeTween.kill();
      if (stackTimeline) stackTimeline.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());

      if (handleMove) section.removeEventListener("pointermove", handleMove);
      if (handleLeave) section.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex items-center justify-center pt-16 h-screen relative bg-white dark:bg-black"
    >
      {/* ================= LEFT CARD ================= */}
      <div className="absolute smooth left-4 md:left-10 top-32 md:top-20 xl:top-1/2 xl:-translate-y-1/12 z-20 space-y-4">
        <div className="w-60 md:w-72 backdrop-blur-xl bg-white/70 dark:bg-black/70 border shadow-xl rounded-2xl p-6">
          <p className="text-[10px] md:text-xs tracking-widest mb-4">
            TELEMETRY / ACTIVE
          </p>

          <h3 className="text-md md:text-xl font-semibold">SURAT, IN</h3>
          <p className="text-[10px] md:text-sm text-black/60 dark:text-white/60 mt-2">
            09:37 AM IST
          </p>
        </div>
        <AnimatedButton label="Get Started" />
      </div>

      {/* ================= RIGHT CARD ================= */}
      <div className="absolute smooth right-4 md:right-10 bottom-28 xl:top-1/2 xl:-translate-y-1/12 z-20">
        <div className="w-60 md:w-80 backdrop-blur-xl bg-white/70 dark:bg-black/70 border shadow-xl rounded-2xl p-6">
          <p className="text-[10px] md:text-xs tracking-widest  mb-6">
            TECH SPECS / LOAD
          </p>

          {/* Skill 1 */}
          <div className="mb-4">
            <div className="flex justify-between text-xs md:text-sm mb-1">
              <span>JAVASCRIPT</span>
              <span>95%</span>
            </div>
            <div className="h-1 bg-black/10 dark:bg-white/20 rounded-full">
              <div className="h-1 bg-[var(--light-brand)] dark:bg-[var(--dark-brand)] rounded-full w-[95%]" />
            </div>
          </div>

          {/* Skill 2 */}
          <div className="mb-4">
            <div className="flex justify-between text-xs md:text-sm mb-1">
              <span>REACT.JS</span>
              <span>92%</span>
            </div>
            <div className="h-1 bg-black/10 dark:bg-white/20 rounded-full">
              <div className="h-1 bg-[var(--light-brand)] dark:bg-[var(--dark-brand)] rounded-full w-[95%]" />
            </div>
          </div>

          {/* Skill 3 */}
          <div>
            <div className="flex justify-between text-xs md:text-sm mb-1">
              <span>NEXT.JS</span>
              <span>90%</span>
            </div>
            <div className="h-1 bg-black/10 dark:bg-white/20 rounded-full">
              <div className="h-1 bg-[var(--light-brand)] dark:bg-[var(--dark-brand)] rounded-full w-[92%]" />
            </div>
          </div>
        </div>
      </div>
      <h1
        ref={nameRef}
        className="logo text-5xl sm:text-6xl md:text-7xl xl:text-8xl absolute text-center leading-[0.8] transform -translate-y-1/3"
      >
        Muhammad <br />
        <span className="text-black/80 dark:text-white/80">Hamza</span>
      </h1>
      <div ref={containerRef} className="overflow-hidden w-full">
        <h2
          ref={marqueeRef}
          className="text-[6rem] sm:text-[8rem] md:text-[10rem] xl:text-[12rem] stroke-text"
        >
          Front end web developer
        </h2>
      </div>
    </section>
  );
}
