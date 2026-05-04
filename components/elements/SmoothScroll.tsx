"use client";

import { useEffect } from "react";
import gsap from "gsap";

declare global {
  interface Window {
    __gsapSmoother?: any;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    let smoother: any;

    const init = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { ScrollSmoother } = await import("gsap/ScrollSmoother");

      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
      });

      // Globally expose so MacDoc can use smoother.scrollTo()
      window.__gsapSmoother = smoother;
    };

    init();

    return () => {
      if (smoother) smoother.kill();
      window.__gsapSmoother = undefined;
    };
  }, []);

  return null;
}
