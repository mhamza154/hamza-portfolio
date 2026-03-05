"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function Header() {
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    let split: SplitText;

    const animate = () => {
      split && split.revert();

      split = SplitText.create(textRef.current, {
        type: "words",
      });

      gsap.from(split.words, {
        y: -100,
        opacity: 0,
        rotation: "random(-80, 80)",
        duration: 0.7,
        ease: "back",
        stagger: 0.15,
        onComplete: () => {
          gsap.delayedCall(5, animate);
        },
      });
    };

    animate();

    return () => {
      split && split.revert();
    };
  }, []);

  return (
    <header className="w-full py-2 px-4 flex items-center justify-between max-w-7xl mx-auto fixed left-1/2 -translate-x-1/2 z-10">
      <Image
        src="/assets/img/logo.png"
        alt="Hamza-portfolio"
        width={52}
        height={52}
        className="rounded-md"
      />
      <span
        ref={textRef}
        className="text-[10px] uppercase overflow-hidden sm:text-[12px] tracking-[0.2em]"
      >
        Front End Developer
      </span>
    </header>
  );
}