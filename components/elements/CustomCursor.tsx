"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function CustomCursor() {
  const { theme } = useTheme();
  const [hover, setHover] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);

  // Check if desktop
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDesktop(!/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    }
  }, []);

  // Smooth cursor tracking via RAF (no React state lag)
  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const update = () => {
      const el = cursorRef.current;
      if (el) {
        const size = hover ? 60 : 42;
        el.style.transform = `translate(${mousePos.current.x - size / 2}px, ${mousePos.current.y - size / 2}px)`;
      }
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isDesktop, hover]);

  // Hover detection on interactive elements
  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    const attach = () => {
      const elements = document.querySelectorAll("a, button, [role='button'], input, textarea, select, label");
      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
      return elements;
    };

    const elements = attach();

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  const cursorImage =
    theme === "dark"
      ? hover
        ? "/assets/img/cursor/Pointer-light.svg"
        : "/assets/img/cursor/cursor-light.svg"
      : hover
      ? "/assets/img/cursor/Pointer-dark.svg"
      : "/assets/img/cursor/cursor-dark.svg";

  const size = hover ? 60 : 42;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      style={{
        width: size,
        height: size,
        willChange: "transform",
        transition: "width 0.15s ease, height 0.15s ease",
      }}
    >
      <img
        src={cursorImage}
        alt="cursor"
        width={size}
        height={size}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
