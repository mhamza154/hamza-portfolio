"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function Header() {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const delayedCallRef = useRef<gsap.core.Tween | null>(null);
  const splitRef = useRef<SplitText | null>(null);

  useEffect(() => {
    const animate = () => {
      if (splitRef.current) splitRef.current.revert();

      splitRef.current = SplitText.create(textRef.current, {
        type: "words",
      });

      gsap.from(splitRef.current.words, {
        y: -100,
        opacity: 0,
        rotation: "random(-80, 80)",
        duration: 0.7,
        ease: "back",
        stagger: 0.15,
        onComplete: () => {
          delayedCallRef.current = gsap.delayedCall(5, animate);
        },
      });
    };

    animate();

    return () => {
      delayedCallRef.current?.kill();
      splitRef.current?.revert();
    };
  }, []);

  return (
    <header className="w-full py-2 px-4 flex items-center justify-between max-w-7xl mx-auto fixed top-0 left-1/2 -translate-x-1/2 z-50">
      <Image
        src="/assets/img/logo.png"
        alt="Hamza-portfolio"
        width={52}
        height={52}
        className="rounded-md"
      />
      <span
        ref={textRef}
        className="text-[10px] uppercase sm:text-[12px] tracking-[0.2em]"
      >
        Front End Developer
      </span>
    </header>
  );
}
