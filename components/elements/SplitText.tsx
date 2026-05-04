"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface AnimatedTextProps {
  children: React.ReactNode;
  scrollTrigger?: boolean; // Animate on scroll or immediately
  start?: string; // ScrollTrigger start point
  end?: string;   // ScrollTrigger end point (optional)
}

export default function AnimatedText({
  children,
  scrollTrigger = true,
  start = "top 70%",
  end,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    document.fonts.ready.then(() => {
      // Animate all h2, p, and span elements inside the container
      const texts = container.querySelectorAll("h2, p, span");

      texts.forEach((el) => {
        const split = new SplitText(el, {
          type: "lines,words",
          linesClass: "line",
          autoSplit: true,
          mask: "lines",
        });

        const animConfig = {
          yPercent: 100,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "expo.out",
        };

        if (scrollTrigger) {
          gsap.from(split.lines, {
            ...animConfig,
            scrollTrigger: {
              trigger: el,
              start,
              ...(end ? { end } : {}),
              toggleActions: "play reverse play reverse",
            },
          });
        } else {
          gsap.from(split.lines, animConfig);
        }
      });
    });
  }, [children, scrollTrigger, start, end]);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {children}
    </div>
  );
}