"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";

interface MacDockProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

// ─── Pin-aware scroll position ───────────────────────────────────────────────
async function getScrollPositionForId(id: string): Promise<number> {
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  const el = document.getElementById(id);
  if (!el) return 0;
  ScrollTrigger.refresh();
  const triggers = ScrollTrigger.getAll();
  let best: { trigger: any; depth: number } | null = null;
  for (const st of triggers) {
    const triggerEl = st.trigger as HTMLElement | null;
    if (!triggerEl) continue;
    if (triggerEl === el || triggerEl.contains(el) || el.contains(triggerEl)) {
      let depth = 0;
      let node: HTMLElement | null = triggerEl;
      while (node) { depth++; node = node.parentElement; }
      if (!best || depth > best.depth) best = { trigger: st, depth };
    }
  }
  if (best) return best.trigger.start;

  // Fallback: walk up to get true offsetTop accounting for all parent offsets
  // This works correctly even when pinned sections inflate the scroll height
  let offsetTop = 0;
  let node: HTMLElement | null = el;
  while (node) {
    offsetTop += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return offsetTop;
}

// ─── Pin-aware active section ────────────────────────────────────────────────
async function getActiveSectionFromScroll(): Promise<string> {
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  const sectionIds = ["home", "about", "skills", "projects", "hire", "contact"];
  const scroll = window.scrollY;
  const positions: { id: string; start: number }[] = [];
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;
    const triggers = ScrollTrigger.getAll();
    let start: number | null = null;
    for (const st of triggers) {
      const triggerEl = st.trigger as HTMLElement | null;
      if (!triggerEl) continue;
      if (triggerEl === el || triggerEl.contains(el) || el.contains(triggerEl)) {
        start = st.start; break;
      }
    }
    // If no trigger found, use offsetTop walk (accurate regardless of pinning)
    if (start === null) {
      let offsetTop = 0;
      let node: HTMLElement | null = el;
      while (node) {
        offsetTop += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      start = offsetTop;
    }
    positions.push({ id, start });
  }
  positions.sort((a, b) => a.start - b.start);
  let active = "home";
  for (const { id, start } of positions) {
    if (scroll + window.innerHeight * 0.5 >= start) active = id;
  }
  return active;
}

// ─── Premium SVG Icons ───────────────────────────────────────────────────────
const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="7" r="4"/>
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);

const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

const IconBriefcase = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="12"/>
    <path d="M2 12h20"/>
  </svg>
);

const IconLaptop = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="3" y="4" width="18" height="13" rx="2"/>
    <path d="M1 21h22"/>
    <path d="M9 17l-1 4M15 17l1 4"/>
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
);

const IconGithub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.021C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const IconResume = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="12" y1="18" x2="12" y2="12"/>
    <line x1="9" y1="15" x2="15" y2="15"/>
  </svg>
);

const IconSun = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const IconMoon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
);

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
  const scrollRafRef = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    let isMounted = true;
    const handleScroll = () => {
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = requestAnimationFrame(async () => {
        if (!isMounted) return;
        const active = await getActiveSectionFromScroll();
        if (!isMounted) return;
        setActiveScroll(active);
        onSectionChange?.(active);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      isMounted = false;
      window.removeEventListener("scroll", handleScroll);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, [onSectionChange]);

  // ── Mac dock magnification ────────────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    const dock = dockRef.current;
    const iconWrappers = iconWrappersRef.current;
    if (!dock || iconWrappers.length === 0) return;

    const min = 56;
    const max = 80;
    const bound = min * Math.PI;

    const updateIcons = (mouseX: number) => {
      for (let i = 0; i < iconWrappers.length; i++) {
        const wrapper = iconWrappers[i];
        if (!wrapper) continue;
        const rect = wrapper.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const distance = mouseX - center;
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

    const onMove = (e: MouseEvent) => updateIcons(e.clientX);
    const onLeave = () => {
      iconWrappers.forEach((w) => {
        if (w) w.style.transform = "scale(1) translateY(0)";
      });
    };

    dock.addEventListener("mousemove", onMove);
    dock.addEventListener("mouseleave", onLeave);
    return () => {
      dock.removeEventListener("mousemove", onMove);
      dock.removeEventListener("mouseleave", onLeave);
    };
  }, [isMobile]);

  const items = [
    { icon: IconHome,      href: "#home",     label: "Home",     id: "home",     external: false, mobileHide: false },
    { icon: IconUser,      href: "#about",    label: "About",    id: "about",    external: false, mobileHide: false },
    { icon: IconCode,      href: "#skills",   label: "Skills",   id: "skills",   external: false, mobileHide: false },
    { icon: IconBriefcase, href: "#projects", label: "Projects", id: "projects", external: false, mobileHide: false },
    { icon: IconLaptop,    href: "#hire",     label: "Hire Me",  id: "hire",     external: false, mobileHide: false },
    { icon: IconMail,      href: "#contact",  label: "Contact",  id: "contact",  external: false, mobileHide: false },
    {
      icon: IconGithub,
      href: "https://github.com/mhamza154",
      label: "GitHub",
      id: "github",
      external: true,
      mobileHide: true,
    },
    {
      icon: IconResume,
      href: "/assets/resume/Muhammad-Hamza-Resume.pdf",
      label: "Resume",
      id: "resume",
      external: false,
      download: true,
      mobileHide: false,
    },
  ];

  // ── Navigation click ──────────────────────────────────────────────────────
  const handleNavClick = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>, item: typeof items[0]) => {
      // GitHub — open in new tab
      if (item.id === "github") {
        e.preventDefault();
        window.open(item.href, "_blank", "noopener,noreferrer");
        return;
      }

      // Resume — direct download
      if (item.id === "resume") {
        e.preventDefault();
        const link = document.createElement("a");
        link.href = "/assets/resume/Muhammad-Hamza-Resume.pdf";
        link.download = "Muhammad-Hamza-Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      // Internal section navigation
      e.preventDefault();
      const scrollY = await getScrollPositionForId(item.id);
      const smoother = (window as any).__gsapSmoother;
      if (smoother) {
        smoother.scrollTo(scrollY, true);
      } else {
        window.scrollTo({ top: scrollY, behavior: "smooth" });
      }
      setActiveScroll(item.id);
    },
    []
  );

  return (
    <>
      {/* ── Glassmorphism styles injected inline ── */}
      <style>{`
        .dock-glass {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.55);
          box-shadow:
            0 8px 32px rgba(0,0,0,0.10),
            0 1.5px 0 rgba(255,255,255,0.9) inset,
            0 -1px 0 rgba(0,0,0,0.06) inset;
        }
        .dark .dock-glass {
          background: rgba(18,18,18,0.72);
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow:
            0 8px 32px rgba(0,0,0,0.45),
            0 1.5px 0 rgba(255,255,255,0.07) inset,
            0 -1px 0 rgba(0,0,0,0.3) inset;
        }

        /* Icon glass pill */
        .dock-icon-glass {
          background: rgba(255,255,255,0.45);
          border: 1px solid rgba(255,255,255,0.8);
          box-shadow:
            0 2px 8px rgba(0,0,0,0.07),
            0 1px 0 rgba(255,255,255,0.9) inset;
          transition: background 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .dark .dock-icon-glass {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .dock-icon-glass:hover {
          background: rgba(255,255,255,0.75);
          border-color: rgba(255,255,255,1);
          box-shadow:
            0 4px 16px rgba(0,0,0,0.10),
            0 1px 0 rgba(255,255,255,1) inset;
        }
        .dark .dock-icon-glass:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.20);
        }

        /* Active state — brand color glow */
        .dock-icon-active {
          background: var(--light-brand) !important;
          border-color: rgba(255,255,255,0.7) !important;
          box-shadow:
            0 0 0 3px rgba(155,194,45,0.25),
            0 4px 16px rgba(155,194,45,0.35),
            0 1px 0 rgba(255,255,255,0.6) inset !important;
        }
        .dark .dock-icon-active {
          background: var(--dark-brand) !important;
          border-color: rgba(255,255,255,0.2) !important;
          box-shadow:
            0 0 0 3px rgba(206,244,65,0.20),
            0 4px 20px rgba(206,244,65,0.30),
            0 1px 0 rgba(255,255,255,0.15) inset !important;
        }

        /* Tooltip */
        .dock-tooltip {
          background: rgba(15,15,15,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
          letter-spacing: 0.03em;
        }
        .dark .dock-tooltip {
          background: rgba(240,240,240,0.90);
          border: 1px solid rgba(0,0,0,0.08);
          color: #111;
        }

        /* Divider */
        .dock-divider {
          width: 1px;
          height: 32px;
          background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.12), transparent);
          margin: 0 4px;
        }
        .dark .dock-divider {
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent);
        }

        /* Theme toggle special pill */
        .dock-theme-pill {
          background: rgba(255,255,255,0.45);
          border: 1px solid rgba(255,255,255,0.8);
          box-shadow: 0 2px 8px rgba(0,0,0,0.07), 0 1px 0 rgba(255,255,255,0.9) inset;
          transition: background 0.2s, box-shadow 0.2s;
        }
        .dark .dock-theme-pill {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
        }
        .dock-theme-pill:hover {
          background: rgba(255,255,255,0.75);
        }
        .dark .dock-theme-pill:hover {
          background: rgba(255,255,255,0.12);
        }

        /* Active dot indicator */
        .dock-active-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(0,0,0,0.5);
          position: absolute;
          bottom: -7px;
          left: 50%;
          transform: translateX(-50%);
        }
        .dark .dock-active-dot {
          background: rgba(255,255,255,0.6);
        }
      `}</style>

      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[9990]">
        <ul
          ref={dockRef}
          className="dock-glass flex items-center justify-center px-2 sm:px-2.5 gap-1 sm:gap-1.5 rounded-2xl will-change-transform py-2"
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeScroll === item.id;
            return (
              <li
                key={index}
                className={`relative flex items-center justify-center ${isMobile && item.mobileHide ? "hidden" : ""}`}
              >
                <div
                  ref={(el) => { if (el) iconWrappersRef.current[index] = el; }}
                  className="relative flex items-center justify-center transition-transform duration-200 ease-out"
                  style={{ willChange: "transform", transformOrigin: "50% 100%" }}
                >
                  {/* Tooltip */}
                  <span
                    className={`dock-tooltip absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2
                      px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap rounded-lg
                      text-white pointer-events-none
                      transition-all duration-150 ${
                        activeIndex === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-1.5"
                      }`}
                  >
                    {item.label}
                    {/* Tooltip arrow */}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[rgba(15,15,15,0.85)]" />
                  </span>

                  {/* Icon button */}
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className={`dock-icon-glass flex items-center justify-center rounded-xl w-10 h-10 sm:w-11 sm:h-11 ${isActive ? "dock-icon-active" : ""}`}
                    onMouseEnter={() => !isMobile && setActiveIndex(index)}
                    onMouseLeave={() => !isMobile && setActiveIndex(null)}
                  >
                    <span className={`transition-colors duration-200 ${isActive ? "text-black" : "text-gray-600 dark:text-gray-300"}`}>
                      <Icon />
                    </span>
                  </a>

                  {/* Active dot below icon */}
                  {isActive && <span className="dock-active-dot" />}
                </div>
              </li>
            );
          })}

          {/* ── Divider ── */}
          <li className="flex items-center self-stretch">
            <span className="dock-divider" />
          </li>

          {/* ── Theme Toggle ── */}
          <li className="relative flex items-center justify-center">
            <div
              ref={(el) => { if (el) iconWrappersRef.current[items.length] = el; }}
              className="relative flex items-center justify-center transition-transform duration-200 ease-out"
              style={{ willChange: "transform", transformOrigin: "50% 100%" }}
            >
              {/* Tooltip */}
              <span
                className={`dock-tooltip absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2
                  px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap rounded-lg
                  text-white pointer-events-none
                  transition-all duration-150 ${
                    activeIndex === items.length
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1.5"
                  }`}
              >
                {theme === "dark" ? "Light mode" : "Dark mode"}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[rgba(15,15,15,0.85)]" />
              </span>

              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="dock-theme-pill flex items-center justify-center rounded-xl w-10 h-10 sm:w-11 sm:h-11"
                onMouseEnter={() => !isMobile && setActiveIndex(items.length)}
                onMouseLeave={() => !isMobile && setActiveIndex(null)}
              >
                <span className="relative w-5 h-5 flex items-center justify-center text-gray-600 dark:text-gray-300">
                  {/* Sun */}
                  <span className="absolute transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0">
                    <IconSun />
                  </span>
                  {/* Moon */}
                  <span className="absolute transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100">
                    <IconMoon />
                  </span>
                </span>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
