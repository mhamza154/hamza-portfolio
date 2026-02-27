"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    let smoother: any;

    const init = async () => {
      const ScrollSmoother = (await import("gsap/ScrollSmoother")).default;

      gsap.registerPlugin(ScrollSmoother);

      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
      });
    };

    init();

    return () => {
      if (smoother) smoother.kill();
    };
  }, []);

  return null;
}