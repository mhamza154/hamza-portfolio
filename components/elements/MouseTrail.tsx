"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const TECH_ICONS: { name: string; svg: string }[] = [
  {
    name: "HTML5",
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path d="M6 2l2.4 26L16 30l7.6-2L26 2z" fill="#E34F26"/>
      <path d="M16 27.9l6.1-1.7 2-22.2H16z" fill="#EF652A"/>
      <path d="M16 13h-4.5l-.3-3.5H16V6H8.2l.8 9H16zm0 8.4l-.1.1-3.2-.9-.2-2.5H9.2l.4 5 6.4 1.8z" fill="#fff"/>
      <path d="M16 13v3.5h4.1l-.4 4.5-3.7 1v3.5l6.4-1.8.9-10.7z" fill="#fff"/>
    </svg>`,
  },
  {
    name: "CSS3",
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path d="M6 2l2.4 26L16 30l7.6-2L26 2z" fill="#1572B6"/>
      <path d="M16 27.9l6.1-1.7 2-22.2H16z" fill="#33A9DC"/>
      <path d="M16 13H11l.3 3.5H16V13zm-4.7-3.5L11 13H16V9.5zm4.7 11.9v-3.5l-.1.1-3.2-.9-.2-1.6H9.2l.4 4 6.4 1.8z" fill="#fff"/>
      <path d="M19.9 13H16v3.5h3.7l-.4 4.5-3.3.9v3.5l6.4-1.8.1-.9.9-10.7z" fill="#fff"/>
    </svg>`,
  },
  {
    name: "JavaScript",
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
      <rect width="32" height="32" rx="4" fill="#F7DF1E"/>
      <path d="M9 24.5c.7 1.2 1.7 2 3.3 2 1.4 0 2.3-.7 2.3-1.6 0-1.1-.9-1.5-2.5-2.2l-.8-.4c-2.5-1-4.2-2.4-4.2-5.1 0-2.5 1.9-4.4 4.9-4.4 2.1 0 3.7.7 4.8 2.6l-2.6 1.7c-.6-1.1-1.2-1.5-2.2-1.5-1 0-1.6.6-1.6 1.5 0 1 .6 1.4 2.1 2.1l.8.4c3 1.2 4.7 2.5 4.7 5.4 0 3.1-2.4 4.7-5.6 4.7-3.1 0-5.1-1.5-6.1-3.4zm12.5.3c.5 1 1 1.7 2 1.7.9 0 1.5-.4 1.5-1.8V13.5H28v11.3c0 3-1.7 4.3-4.3 4.3-2.3 0-3.6-1.2-4.3-2.6z" fill="#1a1a1a"/>
    </svg>`,
  },
  {
    name: "React",
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
      <circle cx="16" cy="16" r="2.8" fill="#61DAFB"/>
      <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" stroke-width="1.5"/>
      <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" stroke-width="1.5" transform="rotate(60 16 16)"/>
      <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" stroke-width="1.5" transform="rotate(120 16 16)"/>
    </svg>`,
  },
  {
    name: "Next.js",
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
      <circle cx="16" cy="16" r="14" fill="#1a1a1a" stroke="#555" stroke-width="1"/>
      <path d="M10 21V11h1.5l7 9.2V11H20v10h-1.5l-7-9.2V21z" fill="#fff"/>
    </svg>`,
  },
  {
    name: "TypeScript",
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
      <rect width="32" height="32" rx="4" fill="#3178C6"/>
      <path d="M18 17.5v2.1c.4.2.9.4 1.4.5.6.1 1.1.2 1.7.2.6 0 1.1-.1 1.6-.2.5-.1.9-.3 1.2-.6.3-.3.6-.6.8-1 .2-.4.3-.9.3-1.5 0-.4-.1-.8-.2-1.1-.1-.3-.3-.6-.6-.9-.3-.3-.6-.5-1-.7-.4-.2-.9-.4-1.5-.6-.4-.1-.7-.3-.9-.4-.2-.1-.4-.3-.5-.4-.1-.2-.2-.4-.2-.6 0-.2.1-.4.2-.6.1-.2.3-.3.5-.4.2-.1.5-.1.8-.1.3 0 .6 0 .8.1.3.1.5.2.7.3l.4.3V12c-.3-.1-.7-.2-1.1-.3-.4-.1-.9-.1-1.4-.1-.5 0-1 .1-1.5.2-.5.1-.9.3-1.2.6-.3.3-.6.6-.8 1-.2.4-.3.8-.3 1.4 0 .7.2 1.3.6 1.8.4.5 1 .9 1.8 1.2.4.1.8.3 1.1.4.3.1.5.3.7.4.2.2.3.3.4.5.1.2.1.4.1.6 0 .2 0 .4-.1.6-.1.2-.3.3-.5.4-.2.1-.5.2-.9.2-.6 0-1.1-.1-1.6-.4-.5-.2-.9-.5-1.3-.8zM8 12h3.5v10h2V12H17V10H8v2z" fill="#fff"/>
    </svg>`,
  },
  {
    name: "WordPress",
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
      <circle cx="16" cy="16" r="14" fill="#21759B"/>
      <path d="M3 16c0 5.8 3.4 10.9 8.3 13.3L4.1 10A13 13 0 003 16zm21.7-1.3c0-1.8-.7-3.1-1.2-4-.8-1.3-1.5-2.3-1.5-3.6 0-1.4 1-2.7 2.5-2.7h.2A13 13 0 0016 3C12 3 8.4 5 6.2 8.1h.9c1.6 0 4-.2 4-.2.8 0 .9 1.1.1 1.2 0 0-.8.1-1.7.1l5.4 16 3.3-9.8-2.3-6.2c-.8 0-1.6-.1-1.6-.1-.8-.1-.7-1.2.1-1.2 0 0 2.5.2 4 .2 1.6 0 4-.2 4-.2.8 0 .9 1.1.1 1.2 0 0-.8.1-1.7.1l5.4 16 1.5-4.9c.6-2 1.1-3.5 1.1-4.7zm-7.4 1.5L13 27.4a13 13 0 007.6-.2l-.1-.2zM28 10.8a13 13 0 01-9.3 17.6L24 12.5c.7-1.7 1-3 1-4.1v-.5c.4.9.7 1.9.7 2.9z" fill="#fff"/>
    </svg>`,
  },
  {
    name: "Git",
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path d="M29.5 14.6L17.4 2.5a1.7 1.7 0 00-2.4 0L12.6 5l3 3a2 2 0 012.5 2.6l2.9 2.9a2 2 0 012.6 2.5 2 2 0 01-2 2 2 2 0 01-2-2c0-.2 0-.5.1-.7l-2.7-2.7v7.1a2 2 0 01.5 3.8 2 2 0 01-2-2 2 2 0 011-1.7V13a2 2 0 01-1-1.7 2 2 0 011-1.7L11.5 6.6l-9 9a1.7 1.7 0 000 2.4l12.1 12.1a1.7 1.7 0 002.4 0l12.5-12.5a1.7 1.7 0 000-2.4z" fill="#F05032"/>
    </svg>`,
  },
  {
    name: "MySQL",
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path d="M16 4C9.4 4 4 6.7 4 10v12c0 3.3 5.4 6 12 6s12-2.7 12-6V10c0-3.3-5.4-6-12-6z" fill="#4479A1"/>
      <ellipse cx="16" cy="10" rx="12" ry="4" fill="#00618A"/>
      <path d="M28 14c0 2.2-5.4 4-12 4S4 16.2 4 14" stroke="#5DADE2" stroke-width="1.2"/>
      <path d="M28 18c0 2.2-5.4 4-12 4S4 20.2 4 18" stroke="#5DADE2" stroke-width="1.2"/>
      <ellipse cx="16" cy="10" rx="12" ry="4" fill="none" stroke="#5DADE2" stroke-width="1.2"/>
    </svg>`,
  },
  {
    name: "AI",
    svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
      <rect x="7" y="7" width="18" height="18" rx="4" fill="#7C3AED"/>
      <circle cx="12" cy="12" r="1.5" fill="#fff"/>
      <circle cx="20" cy="12" r="1.5" fill="#fff"/>
      <path d="M11 19c1 2 9 2 10 0" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M16 7V4M16 28v-3M7 16H4M28 16h-3" stroke="#7C3AED" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="16" cy="16" r="2" fill="#C4B5FD"/>
    </svg>`,
  },
];

// Double the list for enough trail items
const FLAIR_LIST = [...TECH_ICONS, ...TECH_ICONS];

const MouseTrail = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const flairRefs = useRef<HTMLDivElement[]>([]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const cachedMousePosRef = useRef({ x: 0, y: 0 });
  const indexRef = useRef(0);

  useEffect(() => {
    const GAP = 90;
    const wrap = gsap.utils.wrap(0, flairRefs.current.length);
    gsap.defaults({ duration: 1 });

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const playAnimation = (el: HTMLDivElement) => {
      gsap.timeline()
        .from(el, {
          opacity: 0,
          scale: 0,
          ease: "elastic.out(1, 0.3)",
          duration: 0.6,
        })
        .to(el, { rotation: gsap.utils.random([-360, 360]) }, "<")
        .to(el, { y: "120vh", ease: "back.in(.4)", duration: 1.2 }, 0);
    };

    const animateIcon = () => {
      const idx = wrap(indexRef.current);
      const el = flairRefs.current[idx];
      if (!el) return;

      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "all" });
      gsap.set(el, {
        opacity: 1,
        left: mousePosRef.current.x,
        top: mousePosRef.current.y,
        xPercent: -50,
        yPercent: -50,
      });

      playAnimation(el);
      indexRef.current++;
    };

    const imageTrail = () => {
      const dist = Math.hypot(
        lastMousePosRef.current.x - mousePosRef.current.x,
        lastMousePosRef.current.y - mousePosRef.current.y
      );

      cachedMousePosRef.current.x = gsap.utils.interpolate(
        cachedMousePosRef.current.x || mousePosRef.current.x,
        mousePosRef.current.x,
        0.1
      );
      cachedMousePosRef.current.y = gsap.utils.interpolate(
        cachedMousePosRef.current.y || mousePosRef.current.y,
        mousePosRef.current.y,
        0.1
      );

      if (dist > GAP) {
        animateIcon();
        lastMousePosRef.current = { ...mousePosRef.current };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    gsap.ticker.add(imageTrail);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(imageTrail);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-50 overflow-hidden"
    >
      {FLAIR_LIST.map((tech, index) => (
        <div
          key={index}
          ref={(el) => { if (el) flairRefs.current[index] = el; }}
          className="absolute opacity-0 w-14 h-14 flex items-center justify-center"
          style={{ willChange: "transform, opacity" }}
          dangerouslySetInnerHTML={{ __html: tech.svg }}
          aria-label={tech.name}
        />
      ))}
    </div>
  );
};

export default MouseTrail;
