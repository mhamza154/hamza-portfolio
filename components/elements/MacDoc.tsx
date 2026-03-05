"use client";

import { useEffect, useRef, useState } from "react";
import {
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Github,
  FileText,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";

interface MacDockProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export default function MacDock({
  activeSection = "home",
  onSectionChange,
}: MacDockProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeScroll, setActiveScroll] = useState<string>("home");
  const dockRef = useRef<HTMLUListElement | null>(null);
  const iconWrappersRef = useRef<HTMLDivElement[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      let currentSection = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            currentSection = section;
          }
        }
      }

      setActiveScroll(currentSection);
      onSectionChange?.(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onSectionChange]);

  useEffect(() => {
    if (isMobile) return;

    const dock = dockRef.current;
    const iconWrappers = iconWrappersRef.current;

    if (!dock || iconWrappers.length === 0) return;

    const min = 56;
    const max = 80;
    const bound = min * Math.PI;

    const updateIcons = (mouseX: number) => {
      const dockRect = dock.getBoundingClientRect();

      for (let i = 0; i < iconWrappers.length; i++) {
        const wrapper = iconWrappers[i];
        const wrapperRect = wrapper.getBoundingClientRect();
        const wrapperCenter = wrapperRect.left + wrapperRect.width / 2;
        const distance = mouseX - wrapperCenter;

        let scale = 1;
        let yOffset = 0;

        if (Math.abs(distance) < bound) {
          const rad = (distance / min) * 0.5;
          scale = 1 + (max / min - 1) * Math.cos(rad);
          yOffset = -8 * Math.sin(rad);
        }

        wrapper.style.transform = `scale(${scale}) translateY(${yOffset}px)`;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      updateIcons(event.clientX);
    };

    const handleMouseLeave = () => {
      iconWrappers.forEach((wrapper) => {
        wrapper.style.transform = "scale(1) translateY(0)";
      });
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile]);

  const items = [
    { icon: Home, href: "#home", label: "Home", id: "home" },
    { icon: User, href: "#about", label: "About", id: "about" },
    { icon: Code, href: "#skills", label: "Skills", id: "skills" },
    { icon: Briefcase, href: "#projects", label: "Projects", id: "projects" },
    { icon: Mail, href: "#contact", label: "Contact", id: "contact" },
    { icon: Github, href: "#", label: "GitHub", id: "github" },
    { icon: FileText, href: "#", label: "Resume", id: "resume" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (id === "github" || id === "resume") {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 px-2 w-full max-w-full sm:w-auto">
      <ul
        ref={dockRef}
        className="flex items-end justify-center px-2 sm:px-1 gap-1 sm:gap-2 w-auto mx-auto
          bg-white dark:bg-black border dark:border
          rounded-2xl sm:rounded-full shadow-2xl will-change-transform
          py-2 sm:py-1"
      >
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeScroll === item.id;
          return (
            <li
              key={index}
              className="relative h-10 sm:h-12 flex items-end justify-center"
            >
              <div
                ref={(el) => {
                  if (el) iconWrappersRef.current[index] = el;
                }}
                className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-transform duration-300 ease-out"
                style={{ willChange: "transform", transformOrigin: "50% 100%" }}
              >
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-light-brand dark:bg-dark-brand"
                      : "bg-transparent scale-95 opacity-0"
                  }`}
                />

                <div
                  className="relative z-10 flex items-center justify-center group cursor-pointer"
                  onMouseEnter={() => !isMobile && setActiveIndex(index)}
                  onMouseLeave={() => !isMobile && setActiveIndex(null)}
                  onClick={() =>
                    isMobile &&
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="flex items-center justify-center transition-colors duration-200"
                  >
                    <Icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 ${
                        isActive
                          ? "text-black"
                          : "text-gray-700 dark:text-white"
                      }`}
                      strokeWidth={1.5}
                    />
                  </a>

                  <span
                    className={`absolute bottom-full mb-2 sm:mb-3 left-1/2 -translate-x-1/2
                      px-2 py-1 sm:px-3 sm:py-1.5 text-xs font-medium whitespace-nowrap
                      rounded-lg bg-gray-900 dark:bg-gray-100
                      text-white dark:text-gray-900
                      translate-y-1 transition-all duration-200
                      pointer-events-none shadow-xl ${
                        activeIndex === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-1"
                      }`}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            </li>
          );
        })}

        <li className="relative cursor-pointer h-10 sm:h-12 flex items-end justify-center border-l border-gray-300 dark:border-white/20 ml-1 pl-1 sm:ml-2 sm:pl-2">
          <div
            ref={(el) => {
              if (el) iconWrappersRef.current[items.length] = el;
            }}
            className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-transform duration-300 ease-out"
            style={{ willChange: "transform", transformOrigin: "50% 100%" }}
          >
            <div
              className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                activeIndex === items.length
                  ? " scale-100 opacity-100"
                  : "bg-transparent scale-95 opacity-0"
              }`}
            />

            <div
              className="relative z-10 flex items-center justify-center group"
              onMouseEnter={() => !isMobile && setActiveIndex(items.length)}
              onMouseLeave={() => !isMobile && setActiveIndex(null)}
              onClick={() =>
                isMobile &&
                setActiveIndex(
                  activeIndex === items.length ? null : items.length,
                )
              }
            >
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center justify-center transition-colors duration-200 cursor-pointer"
              >
                <Sun
                  className="absolute w-4 h-4 sm:w-5 sm:h-5 text-gray-700 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 transition-all duration-300"
                  strokeWidth={1.5}
                />
                <Moon
                  className="absolute w-4 h-4 sm:w-5 sm:h-5 text-white rotate-90 scale-0 dark:rotate-0 dark:scale-100 transition-all duration-300"
                  strokeWidth={1.5}
                />
              </button>

              <span
                className={`absolute bottom-full mb-2 sm:mb-3 left-1/2 -translate-x-1/2
                  px-2 py-1 sm:px-3 sm:py-1.5 text-xs font-medium whitespace-nowrap
                  rounded-lg bg-gray-900 dark:bg-gray-100
                  text-white dark:text-gray-900
                  transition-all duration-200
                  pointer-events-none shadow-xl ${
                    activeIndex === items.length
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1"
                  }`}
              >
                Theme
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
