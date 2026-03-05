"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const boxesRef = useRef<HTMLDivElement[]>([]);

  // Progress animation
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const duration = 3000;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(newProgress));

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            document.body.style.overflow = "auto";
            onComplete();
          }, 800);
        }, 400);
      }
    };

    requestAnimationFrame(updateProgress);

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  // MH boxes GSAP animation
  useEffect(() => {
    if (!boxesRef.current) return;

    gsap.to(boxesRef.current, {
      keyframes: {
        y: [0, 80, -10, 30, 0],
        ease: "none",
        easeEach: "power2.inOut",
      },
      rotate: 180,
      ease: "elastic",
      duration: 5,
      stagger: 0.2,
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 bg-white dark:bg-black transition-transform duration-700 ${
        isExiting ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* CENTERED MH BOXES */}
      <div className="absolute inset-0 flex items-center justify-center space-x-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) boxesRef.current[i] = el;
            }}
            className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-r from-[var(--light-brand)] to-[var(--light-brand)] dark:bg-gradient-to-r dark:from-[var(--dark-brand)] dark:to-[var(--dark-brand)] rounded-md"
          />
        ))}
      </div>

      {/* BOTTOM RIGHT PROGRESS CIRCLE */}
      <div className="absolute bottom-10 right-10">
          <div className="text-center z-10">
            <h2 className="flex items-center justify-center space-x-2">
              <span className="text-7xl lg:text-9xl font-bold">{progress}</span>
              <span className="text-7xl lg:text-9xl">%</span>
            </h2>
        </div>
      </div>
    </div>
  );
}