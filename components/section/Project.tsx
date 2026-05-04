"use client";

import { useState, useEffect, useRef } from "react";
import ProjectPopup, { ProjectType } from "@/components/elements/ProjectPopup";
import AnimatedText from "../elements/SplitText";
import gsap from "gsap";

export interface Type {
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
}

export default function Project() {
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);
  const projectRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imgRefs = useRef<Array<HTMLImageElement | null>>([]);

  const projects: ProjectType[] = [
    {
      id: 1,
      number: "01",
      category: "FRONTEND / LUXURY TRANSPORT",
      year: "2025",
      title: "LUXENTINA — LUXURY CAR BOOKING PLATFORM",
      description:
        "A premium fleet booking platform for a luxury chauffeur service based in Barcelona, Spain serving corporate clients, events, and VIP travellers.",
      tech: ["Next.js", "Tailwind CSS"],
      highlights: [
        "Multi-step real-time booking flow",
        "Fleet browsing with vehicle categories",
        "Multilingual-ready UI for international users",
        "Mobile-first responsive design",
        "Smooth UX for corporate and VIP clients",
        "Integrated WhatsApp contact for quick bookings",
        "Integrated Language switcher for global users",
        "Integrated Currency switcher for quick bookings",
      ],
      github: "https://github.com/mhamza154",
      liveUrl: "https://luxentina.com",
      image: "/assets/img/projects-logo/luxentina.jpg",
    },
    {
      id: 2,
      number: "02",
      category: "Wordpress / HEALTHCARE",
      year: "2025",
      title: "medi centre bolton — medical and wellness platform",
      description:
        "A full-featured medical and wellness platform for a UK-registered private clinic offering 20+ services across medical, wellbeing, and beauty categories.",
      tech: ["WordPress", "CSS", "Elementor"],
      highlights: [
        "20+ service pages with appointment booking system",
        "Fully responsive across all devices",
        "SEO-optimized structure for local UK search",
        "Integrated emergency contact and location features",
        "Connected with multiple healthcare partners",
        "Professional and trustworthy UI for medical audience",
      ],
      github: "https://github.com/mhamza154",
      liveUrl: "https://medicentrebolton.com/",
      image: "/assets/img/projects-logo/medicentrebolton.jpg",
    },
    {
      id: 3,
      number: "03",
      category: "Wordpress / HOME SERVICES — UK",
      year: "2025",
      title: "SMART SPRAY FOAM REMOVAL LTD — HOME SERVICES PLATFORM",
      description:
        " A professional lead-generation website for a UK-based specialist spray foam removal company targeting homeowners and mortgage-affected properties.",
      tech: ["WordPress", "CSS", "Elementor"],
      highlights: [
        "Free quote request form integrated",
        "Insurance-backed guarantee section",
        "Clear service breakdown for UK property owners",
        "Mortgage lender compliance content",
        "Gallery section showcasing real works",
        "SEO-focused structure for UK local search",
      ],
      github: "https://github.com/mhamza154",
      liveUrl: "https://smartsprayfoamremoval.co.uk/",
      image: "/assets/img/projects-logo/smart-spray-foam.jpg",
    },
    {
      id: 4,
      number: "04",
      category: "Wordpress / GLASS CLEANING — DENMARK",
      year: "2026",
      title: "CONSTRUCTION STEAMY SHINE — GLASS CLEANING SERVICES",
      description:
        "A clean and minimal WordPress website for a Danish glass cleaning and construction services company.",
      tech: ["WordPress", "CSS", "Elementor"],
      highlights: [
        "Minimalist Scandinavian design aesthetic",
        "Service pages with clear descriptions",
        "Mobile responsive layout",
        "Local SEO structure for Denmark market",
        "Fast and lightweight build",
        "Professional brand presentation",
      ],
      github: "https://github.com/mhamza154",
      liveUrl: "https://constructionsteamyshine.dk/",
      image: "/assets/img/projects-logo/smart-spray-foam.jpg",
    },
    {
      id: 5,
      number: "05",
      category: "Wordpress / E-COMMERCE — PAKISTAN",
      year: "2026",
      title: "POWER FAN COMPANY — E-COMMERCE WEBSITE FOR INDUSTRIAL FANS",
      description:
        "A full e-commerce store for Pakistan's first Eco Smart fan manufacturer — featuring multiple product lines, variant selection, and a complete shopping experience.",
      tech: ["WordPress", "CSS", "Elementor"],
      highlights: [
        "Full product catalog with variant options",
        "Hybrid Inverter & ECO Smart fan categories",
        "Free delivery threshold system integrated",
        "Mobile-first shopping experience",
        "WhatsApp integration for direct orders",
        "Clean brand presentation for Pakistani market",
      ],
      github: "https://github.com/mhamza154",
      liveUrl: "https://powerfancompany.com",
      image: "/assets/img/projects-logo/Power-Fan-Logo.png",
    },
    {
      id: 6,
      number: "06",
      category: "Wordpress /  LEGAL SERVICES — DENMARK",
      year: "2025",
      title: "GODKENDT BYGGERI — LEGAL SERVICES FOR CONSTRUCTION COMPANIES",
      description:
        "A professional WordPress website for a Danish building permit and property legalization consultancy — designed to build trust with homeowners and contractors.",
      tech: ["WordPress", "CSS", "Elementor"],
      highlights: [
        "Clean, authority-building design",
        "Service-focused layout for legal clarity",
        "Optimized for Danish local search",
        "Clear CTA structure for consultation bookings",
        "Mobile-responsive and fast-loading",
        "Multilingual-ready structure",
      ],
      github: "https://github.com/mhamza154",
      liveUrl: "https://godkendtbyggeri.dk",
      image: "/assets/img/projects-logo/godkendtbyggeri.png",
    },
  ];

  useEffect(() => {
    projectRefs.current.forEach((el, index) => {
      const image = imgRefs.current[index];
      if (!el || !image) return;

      gsap.set(image, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

      const setX = gsap.quickTo(image, "left", {
        duration: 0.4,
        ease: "power3",
      });
      const setY = gsap.quickTo(image, "top", {
        duration: 0.4,
        ease: "power3",
      });

      const align = (e: MouseEvent) => {
        setX(e.clientX);
        setY(e.clientY);
      };

      const startFollow = () => document.addEventListener("mousemove", align);
      const stopFollow = () => document.removeEventListener("mousemove", align);

      const fade = gsap.to(image, {
        autoAlpha: 1,
        ease: "none",
        paused: true,
        duration: 0.1,
        onReverseComplete: stopFollow,
      });

      el.addEventListener("mouseenter", (e: MouseEvent) => {
        align(e);
        fade.play();
        startFollow();
      });

      el.addEventListener("mouseleave", () => fade.reverse());
    });
  }, []);

  return (
    <>
      <section
        id="projects"
        className="relative bg-white dark:bg-black min-h-screen flex justify-center pb-32 md:py-32"
      >
        <div className="w-full">
          <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b to-transparent pointer-events-none z-10"></div>
          <div className="px-6 lg:px-16 pb-10 flex flex-col md:flex-row justify-between items-end">
            <div className="w-full">
              <AnimatedText start="top 70%">
                <span className="text-light-brand dark:text-dark-brand text-sm uppercase tracking-[0.2em] block mb-4">
                  Why Choosing Me?
                </span>
                <h2 className="italic">
                  Why Choosing <br />{" "}
                  <span className="stroke-text font-bold">Me?</span>
                </h2>
              </AnimatedText>
            </div>
            <div className="hidden md:flex gap-12 text-gray-500 text-sm tracking-widest">
              <div>
                <span className="block mb-2">PROJECTS</span>
                {"10"}
              </div>
              <div>
                <span className="block mb-2">YEAR</span>
                {"2025"}
              </div>
            </div>
          </div>
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el: HTMLDivElement | null) => {
                projectRefs.current[index] = el;
              }}
              onClick={() => setActiveProject(project)}
              className="group relative w-full border overflow-hidden cursor-pointer flex flex-col md:flex-row items-center justify-between px-6 lg:px-16 py-12 transition-colors"
            >
              {/* Floating image */}
              <img
                ref={(el: HTMLImageElement | null) => {
                  imgRefs.current[index] = el;
                }}
                src={project.image}
                alt={project.title}
                className="swipeimage fixed w-72 h-72 object-cover z-50 pointer-events-none rounded-lg shadow-xl"
              />
              <div className="absolute top-0 right-0 text-[20vw] font-black text-black/10 dark:text-white/10 leading-none select-none pointer-events-none group-hover:text-light-brand/10 dark:group-hover:text-dark-brand/10 transition-colors duration-500">
                {project.number}
              </div>
              <div className="absolute inset-0 bg-light-brand/20 dark:bg-dark-brand/20 -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out z-0 pointer-events-none"></div>
              <div className="relative z-10 max-w-2xl flex flex-col items-start gap-6">
                <div className="flex items-center gap-3">
                  <div className="px-4 py-1.5 border/20 rounded-full text-[10px] uppercase bg-black/10 backdrop-blur-md">
                    {project.category}
                  </div>
                </div>
                <h4 className="italic tracking-tighter group-hover:translate-x-4 transition-transform duration-500">
                  {project.title}
                </h4>
                <p className="max-w-lg">{project.description}</p>
                <div className="flex flex-wrap gap-4 mt-4">
                  {project.tech.map((tech, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-black dark:group-hover:text-white uppercase tracking-wider"
                    >
                      <span className="w-1.5 h-1.5 bg-light-brand dark:bg-dark-brand rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></span>
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative z-10 flex flex-col items-end gap-8 mt-10 md:mt-0">
                <div className="p-8 border rounded-full bg-white hidden md:flex dark:bg-black group-hover:scale-110 group-hover:border-light-brand/30 dark:group-hover:text-dark-brand/30 group-hover:bg-light-brand/10 dark:group-hover:bg-dark-brand/10 transition-all duration-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pin text-black/20 dark:text-white/20  group-hover:text-light-brand dark:group-hover:text-dark-brand transition-colors"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="flex items-center gap-4 text-sm uppercase tracking-widest group-hover:text-lime-accent transition-colors">
                  View Case Study
                  <div className="p-3 rounded-full group-hover:bg-lime-accent transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-right -rotate-45 group-hover:rotate-0 transition-transform duration-500"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {activeProject && (
          <ProjectPopup
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </section>
    </>
  );
}
