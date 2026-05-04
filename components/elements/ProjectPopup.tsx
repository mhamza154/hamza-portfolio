"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, X } from "lucide-react";
import { gsap } from "gsap";
import { SplitText } from "gsap/dist/SplitText";
import AnimatedButton from "./AnimatedButton";

gsap.registerPlugin(SplitText);

export type ProjectType = {
  id: number;
  number: string;
  category: string;
  year: string;
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  github: string;
  liveUrl?: string;
  image: string;
};

type ProjectPopupProps = {
  project: ProjectType;
  onClose: () => void;
};

export default function ProjectPopup({ project, onClose }: ProjectPopupProps) {
  const [mounted, setMounted] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const scrollBarCompensation =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarCompensation}px`;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      )
        .fromTo(
          popupRef.current,
          { opacity: 0, scale: 0.9, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.15",
        )
        .fromTo(
          closeButtonRef.current,
          { opacity: 0, scale: 0, rotation: -180 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: "back.out(1.7)" },
          "-=0.3",
        );

      const titleEl = headerRef.current?.querySelector("h2");
      const descEl = headerRef.current?.querySelector("p");

      if (titleEl) {
        const titleSplit = new SplitText(titleEl, {
          type: "lines,words",
          linesClass: "line",
        });
        tl.from(
          titleSplit.lines,
          { yPercent: 100, opacity: 0, stagger: 0.08, duration: 0.8, ease: "expo.out" },
          "-=0.2",
        );
      }

      if (descEl) {
        const descSplit = new SplitText(descEl, {
          type: "lines,words",
          linesClass: "line",
        });
        tl.from(
          descSplit.lines,
          { yPercent: 100, opacity: 0, stagger: 0.05, duration: 0.7, ease: "expo.out" },
          "-=0.4",
        );
      }

      tl.fromTo(
        contentRef.current?.querySelectorAll(".animate-section") || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.15, ease: "power2.out" },
        "-=0.2",
      );
    });

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) return null;

  // Live URL: liveUrl field use karo, warna github field (jisme live URL hai)
  const projectUrl = project.liveUrl || project.github;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6">
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />

      <div
        ref={popupRef}
        className="bg-white dark:bg-black border border-white/10 w-full max-w-6xl max-h-[90vh] md:rounded-3xl overflow-hidden flex flex-col relative z-10 shadow-2xl"
      >
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full">
          <AnimatedButton ref={closeButtonRef} onClick={onClose} variant="icon" icon={<X />} />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-8 md:p-20 pt-20">
            <div
              ref={headerRef}
              className="mb-16 border-b pb-16 overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-6 animate-item">
                <span className="px-3 py-1 bg-light-brand dark:bg-dark-brand text-black rounded text-xs uppercase">
                  {project.category}
                </span>
                <span className="text-gray-500 text-xs uppercase">
                  {project.year}
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold italic mb-8 overflow-hidden">
                {project.title}
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300 overflow-hidden">
                {project.description}
              </p>
            </div>

            <div ref={contentRef}>
              <div className="grid md:grid-cols-2 gap-12 mb-16 animate-section">
                <div>
                  <h3 className="font-bold uppercase mb-6 text-lg">Tech Stack</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold uppercase mb-6 text-lg">Key Highlights</h3>
                  <ul className="space-y-4">
                    {project.highlights.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-light-brand dark:text-dark-brand mt-1">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Project Logo + View Project Link */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-8 border rounded-2xl animate-section">
                {/* Project Logo */}
                <div className="flex-shrink-0">
                  <img
                    src={project.image}
                    alt={`${project.title} logo`}
                    className="w-16 h-16 object-contain rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2"
                  />
                </div>

                {/* Project Info + Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Live Project</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium truncate max-w-xs">
                      {projectUrl.replace(/^https?:\/\//, "")}
                    </p>
                  </div>

                  <AnimatedButton
                    label="View Project"
                    href={projectUrl}
                    icon={<ExternalLink />}
                    newTab={true}
                    iconPosition="left"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
