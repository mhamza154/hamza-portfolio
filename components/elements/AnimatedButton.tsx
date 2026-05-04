"use client";

import { useEffect, useRef, forwardRef } from "react";
import { gsap } from "gsap";

type AnimatedButtonProps = {
  label?: string;
  href?: string;
  newTab?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  variant?: "default" | "icon";
};

type RefType = HTMLAnchorElement | HTMLButtonElement;

const AnimatedButton = forwardRef<RefType, AnimatedButtonProps>(
  (
    {
      label,
      href,
      icon,
      className = "",
      iconPosition,
      newTab = false,
      onClick,
      variant = "default",
    },
    ref,
  ) => {
    const buttonRef = useRef<RefType | null>(null);
    const flairRef = useRef<HTMLSpanElement | null>(null);

    // merge forwarded ref
    useEffect(() => {
      if (!ref || !buttonRef.current) return;
      if (typeof ref === "function") ref(buttonRef.current);
      else
        (ref as React.MutableRefObject<RefType | null>).current =
          buttonRef.current;
    }, [ref]);

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
          gsap.utils.mapRange(0, width, 0, 100, e.clientX - left),
        );
        const y = gsap.utils.clamp(
          0,
          100,
          gsap.utils.mapRange(0, height, 0, 100, e.clientY - top),
        );
        return { x, y };
      };

      const handleMouseEnter = (e: MouseEvent) => {
        const { x, y } = getXY(e);
        xSet(x);
        ySet(y);
        gsap.to(flair, { scale: 1, duration: 0.4, ease: "power2.out" });
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

      (button as HTMLElement).addEventListener(
        "mouseenter",
        handleMouseEnter as EventListener,
      );
      (button as HTMLElement).addEventListener(
        "mouseleave",
        handleMouseLeave as EventListener,
      );
      (button as HTMLElement).addEventListener(
        "mousemove",
        handleMouseMove as EventListener,
      );

      return () => {
        (button as HTMLElement).removeEventListener(
          "mouseenter",
          handleMouseEnter as EventListener,
        );
        (button as HTMLElement).removeEventListener(
          "mouseleave",
          handleMouseLeave as EventListener,
        );
        (button as HTMLElement).removeEventListener(
          "mousemove",
          handleMouseMove as EventListener,
        );
      };
    }, []);

    const baseClass = `animated-button flex items-center gap-3 relative overflow-hidden ${className}`;

    // Render <a> if href is provided
    if (href) {
      return (
        <a
          ref={buttonRef as React.Ref<HTMLAnchorElement>}
          href={href}
          target={newTab ? "_blank" : "_self"}
          className={baseClass}
        >
          <span
            ref={flairRef}
            className="button__flair before:absolute before:inset-0 before:rounded-full before:bg-light-brand dark:before:bg-dark-brand"
          />

          {icon && iconPosition === "left" && (
            <span className="w-6 h-6 z-10">{icon}</span>
          )}

          {variant !== "icon" && label && (
            <span className="button__label z-10">{label}</span>
          )}

          {icon && iconPosition === "right" && (
            <span className="w-6 h-6 z-10">{icon}</span>
          )}

          {variant === "icon" && icon && (
            <span className="w-6 h-6 z-10">{icon}</span>
          )}
        </a>
      );
    }

    // Render <button> if no href (for modal)
    return (
      <button
        ref={buttonRef as React.Ref<HTMLButtonElement>}
        type="button"
        onClick={onClick}
        className={baseClass}
      >
        <span
          ref={flairRef}
          className="button__flair before:absolute before:inset-0 before:rounded-full before:bg-light-brand dark:before:bg-dark-brand"
        />

        {icon && iconPosition === "left" && (
          <span className="w-6 h-6 z-10">{icon}</span>
        )}

        {variant !== "icon" && label && (
          <span className="button__label z-10">{label}</span>
        )}

        {icon && iconPosition === "right" && (
          <span className="w-6 h-6 z-10">{icon}</span>
        )}

        {variant === "icon" && icon && (
          <span className="w-6 h-6 z-10">{icon}</span>
        )}
      </button>
    );
  },
);

AnimatedButton.displayName = "AnimatedButton";

export default AnimatedButton;
