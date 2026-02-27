"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type AnimatedButtonProps = {
  label: string;
  href?: string;
};

export default function AnimatedButton({
  label,
  href = "#",
}: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const flairRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const flair = flairRef.current;

    if (!button || !flair) return;

    const xSet = gsap.quickSetter(flair, "xPercent");
    const ySet = gsap.quickSetter(flair, "yPercent");

    const getXY = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();

      const x = gsap.utils.clamp(
        0,
        100,
        gsap.utils.mapRange(0, width, 0, 100, e.clientX - left)
      );

      const y = gsap.utils.clamp(
        0,
        100,
        gsap.utils.mapRange(0, height, 0, 100, e.clientY - top)
      );

      return { x, y };
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const { x, y } = getXY(e);

      xSet(x);
      ySet(y);

      gsap.to(flair, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const { x, y } = getXY(e);

      gsap.killTweensOf(flair);

      gsap.to(flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y } = getXY(e);

      gsap.to(flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.4,
        ease: "power2",
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mousemove", handleMouseMove);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <a ref={buttonRef} href={href} className="animated-button">
      <span ref={flairRef} className={`button__flair before:absolute before:inset-0 before:rounded-full before:bg-[var(--color-light-brand)] dark:before:bg-[var(--color-dark-brand)]`} />
      <span className="button__label">{label}</span>
    </a>
  );
}