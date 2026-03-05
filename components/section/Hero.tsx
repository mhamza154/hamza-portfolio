"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "@/components/elements/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const marqueeRef = useRef<HTMLHeadingElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const rightCardRef = useRef<HTMLDivElement | null>(null);

  const progress1Ref = useRef<HTMLDivElement | null>(null);
  const progress2Ref = useRef<HTMLDivElement | null>(null);
  const progress3Ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const mm = gsap.matchMedia();

      /* =========================
         1️⃣ MARQUEE
      ==========================*/
      if (marqueeRef.current && containerRef.current) {
        const marquee = marqueeRef.current;
        const container = containerRef.current;
        const originalText = marquee.innerHTML;

        document.fonts.ready.then(() => {
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

          gsap.to(marquee, {
            x: -totalWidth,
            ease: "linear",
            duration: 350,
            repeat: -1,
          });
        });
      }

      /* =========================
         2️⃣ DESKTOP HERO ENTRY + FLOAT
      ==========================*/
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline();
        if (leftCardRef.current)
          gsap.set(leftCardRef.current, { x: -120, opacity: 0 });
        if (rightCardRef.current)
          gsap.set(rightCardRef.current, { x: 120, opacity: 0 });
        if (nameRef.current) gsap.set(nameRef.current, { opacity: 0, y: 40 });

        tl.to(
          leftCardRef.current,
          { x: 0, opacity: 1, duration: 0.7, ease: "power4.out" },
          0,
        );
        tl.to(
          rightCardRef.current,
          { x: 0, opacity: 1, duration: 0.7, ease: "power4.out" },
          0.1,
        );
        tl.to(
          nameRef.current,
          { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" },
          0.2,
        );

        progressAnimation(tl);

        // Desktop floating up/down subtle
        if (leftCardRef.current)
          gsap.to(leftCardRef.current, {
            y: -12,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        if (rightCardRef.current)
          gsap.to(rightCardRef.current, {
            y: -16,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
      });

      /* =========================
         3️⃣ MOBILE HERO ENTRY (FLOAT REMOVED)
      ==========================*/
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline();
        gsap.set([leftCardRef.current, rightCardRef.current, nameRef.current], {
          y: 60,
          opacity: 0,
        });
        tl.to([leftCardRef.current, rightCardRef.current, nameRef.current], {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: "power4.out",
        });
        progressAnimation(tl);

        // Mobile par floating animation removed completely
      });

      /* =========================
         4️⃣ PROGRESS BARS FUNCTION
      ==========================*/
      function progressAnimation(tl: gsap.core.Timeline) {
        if (
          !progress1Ref.current ||
          !progress2Ref.current ||
          !progress3Ref.current
        )
          return;
        gsap.set(
          [progress1Ref.current, progress2Ref.current, progress3Ref.current],
          { width: "0%" },
        );
        tl.to(
          progress1Ref.current,
          { width: "95%", duration: 1, ease: "power2.out" },
          0.7,
        );
        tl.to(
          progress2Ref.current,
          { width: "92%", duration: 1, ease: "power2.out" },
          0.8,
        );
        tl.to(
          progress3Ref.current,
          { width: "90%", duration: 1, ease: "power2.out" },
          0.9,
        );
      }

      /* =========================
         5️⃣ POINTER 3D NAME
      ==========================*/
      if (nameRef.current) {
        const nameEl = nameRef.current;
        gsap.set(section, { perspective: 650 });
        gsap.set(nameEl, { yPercent: -33 });
        const outerRX = gsap.quickTo(nameEl, "rotationX", { ease: "power3" });
        const outerRY = gsap.quickTo(nameEl, "rotationY", { ease: "power3" });
        const innerX = gsap.quickTo(nameEl, "x", { ease: "power3" });
        const innerY = gsap.quickTo(nameEl, "y", { ease: "power3" });

        const handleMove = (e: PointerEvent) => {
          outerRX(
            gsap.utils.interpolate(15, -15, e.clientY / window.innerHeight),
          );
          outerRY(
            gsap.utils.interpolate(-15, 15, e.clientX / window.innerWidth),
          );
          innerX(
            gsap.utils.interpolate(-30, 30, e.clientX / window.innerWidth),
          );
          innerY(
            gsap.utils.interpolate(-30, 30, e.clientY / window.innerHeight),
          );
        };
        const handleLeave = () => {
          outerRX(0);
          outerRY(0);
          innerX(0);
          innerY(0);
        };
        section.addEventListener("pointermove", handleMove);
        section.addEventListener("pointerleave", handleLeave);
      }

      /* =========================
         6️⃣ STACK SCROLL
      ==========================*/
      mm.add("(min-width: 768px)", () => {
        // Desktop + Tablet stack scroll

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
          },
        });

        tl.to(section, {
          scale: 0.7,
          opacity: 0.5,
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
          ease: "none",
        }).to(section, {
          opacity: 0,
          ease: "none",
        });
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile par animation completely disable

        gsap.set(section, {
          clearProps: "all",
        });
      });

      // resize par refresh
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="flex items-center justify-center pt-16 h-screen relative bg-white dark:bg-black"
    >
      {/* LEFT CARD */}
      <div
        ref={leftCardRef}
        className="absolute left-4 md:left-10 top-32 md:top-20 xl:top-1/2 xl:-translate-y-1/12 z-20 space-y-4"
      >
        <div className="w-60 md:w-72 backdrop-blur-xl bg-white/70 dark:bg-black/70 border shadow-xl rounded-2xl p-6">
          <p className="text-[10px] tracking-widest mb-4">TELEMETRY / ACTIVE</p>
          <h3 className="text-xl font-semibold">Kha, Pak</h3>
          <p className="text-[12px] text-black/60 dark:text-white/60 mt-2">
            10:30 AM IST
          </p>
        </div>
        <AnimatedButton label="Get Started" />
      </div>

      {/* RIGHT CARD */}
      <div
        ref={rightCardRef}
        className="absolute right-4 md:right-10 bottom-28 xl:top-1/2 xl:-translate-y-1/12 z-20"
      >
        <div className="w-60 md:w-80 backdrop-blur-xl bg-white/70 dark:bg-black/70 border shadow-xl rounded-2xl p-6">
          <p className="text-[10px] tracking-widest mb-6">TECH SPECS / LOAD</p>
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span>JAVASCRIPT</span>
              <span>95%</span>
            </div>
            <div className="h-1 bg-black/10 dark:bg-white/20 rounded-full">
              <div
                ref={progress1Ref}
                className="h-1 bg-[#9bc22d] dark:bg-[#cef441] rounded-full"
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span>REACT.JS</span>
              <span>92%</span>
            </div>
            <div className="h-1 bg-black/10 dark:bg-white/20 rounded-full">
              <div
                ref={progress2Ref}
                className="h-1 bg-[#9bc22d] dark:bg-[#cef441] rounded-full"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>NEXT.JS</span>
              <span>90%</span>
            </div>
            <div className="h-1 bg-black/10 dark:bg-white/20 rounded-full">
              <div
                ref={progress3Ref}
                className="h-1 bg-[#9bc22d] dark:bg-[#cef441] rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* NAME */}
      <h1
        ref={nameRef}
        className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl absolute text-center leading-[0.8] transform"
      >
        Muhammad <br />
        <span className="text-black/80 dark:text-white/80">Hamza</span>
      </h1>

      {/* MARQUEE */}
      <div ref={containerRef} className="overflow-hidden w-full">
        <h2
          ref={marqueeRef}
          className="text-[6rem] sm:text-[8rem] md:text-[10rem] xl:text-[12rem] hero-stroke-text"
        >
          Front end web developer
        </h2>
      </div>
    </section>
  );
}
