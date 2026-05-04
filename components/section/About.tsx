"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import "../../public/assets/img/photo.jpg";
import { FiBookOpen, FiLayers } from "react-icons/fi";
import { LiaTelegramPlane } from "react-icons/lia";
import { RiAwardLine } from "react-icons/ri";


gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !stripRef.current) return;

    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          const sections = gsap.utils.toArray(".panel");

          gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1,
              snap: 1 / (sections.length - 1),
              // FIX: (panels - 1) × viewport width → each panel gets
              // exactly one screen-width of scroll. Original was only 1×
              // which caused all subsequent section positions to be wrong.
              end: () => "+=" + section.offsetWidth * (sections.length - 1),
              invalidateOnRefresh: true,
            },
          });
        },

        "(max-width: 767px)": () => {
          gsap.set(".panel", { clearProps: "all" });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-white dark:bg-black overflow-hidden"
    >
      <div ref={stripRef} className="flex flex-col md:flex-row">
        {/* First Panel */}
        <div className="panel relative min-w-full flex justify-center p-8 py-10 md:p-12">
          <div className="max-w-6xl w-full relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="relative `flex-shrink-0`">
              <div className="w-48 h-48 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(206,244,65,0.15)]">
                <Image
                  src="/assets/img/Muhammad-Hamza.png"
                  alt="Muhammad Hamza"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-light-brand/20 dark:bg-dark-brand/20 rounded-xl -z-10"></div>
              <div className="absolute -top-3 -left-3 w-16 h-16 border border-light-brand/30 dark:border-dark-brand/30 rounded-xl -z-10"></div>
            </div>
            <div className="text-center md:text-left space-y-8 mt-8 md:mt-0">
              <span className="text-sm uppercase text-light-brand dark:text-dark-brand">
                The Profile
              </span>
              <h2 className="mt-6">
                Muhammad <br />
                <span className="stroke-text font-bold">Hamza.</span>
              </h2>
              <p>
                I'm a passionate front end developer crafting beautiful digital
                experiences. With expertise in modern web technologies, I
                transform ideas into elegant solutions.
              </p>
            </div>
          </div>
          <div className="absolute leading-0 bottom-38 right-4 hidden md:flex md:text-[250px] lg:text-[350px] font-bold text-black/10 dark:text-white/10">
            01
          </div>
        </div>

        {/* Second Panel */}
        <div className="panel md:min-h-screen md:min-w-full p-8 md:p-12 w-full flex flex-col justify-center relative px-6 py-10 md:py-0 md:px-24 border-t border-black/10 dark:border-white/10">
          <div className="hidden md:block absolute top-16 left-16">
            <span className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em]">
              02 / Journey / Phase 1
            </span>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12 w-full max-w-7xl mx-auto md:items-center">
            <div className="relative">
              <div className="hidden md:block text-[12vw] font-black font-display text-light-brand/20 dark:text-dark-brand/20 leading-none select-none absolute -top-20 -left-10 z-0">
                2021
              </div>
              <div className="relative z-10 md:pl-6 flex md:flex-col items-center md:items-start gap-4 md:gap-0">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-light-brand dark:bg-dark-brand rounded-xl md:rounded-2xl flex items-center justify-center md:mb-8 shadow-[0_0_30px_rgba(206,244,65,0.2)]">
                  <FiBookOpen className="w-8 h-8 md:w-12 md:h-12 text-black" />
                </div>
                <div>
                  <span className="md:hidden text-gray-500 font-mono text-[10px] uppercase tracking-wider block">
                    phase 1
                  </span>
                  <h3>2021</h3>
                </div>
                <div className="hidden md:block h-1 w-32 bg-linear-to-r from-light-brand to-transparent"></div>
              </div>
            </div>
            <div className="max-w-xl">
              <h4 className="mb-3 md:mb-6 leading-tight">
                Building the Foundation.
              </h4>
              <p>
                Began my development journey with WordPress as a freelancer, building responsive websites for clients from scratch. Customized themes, managed content, and improved layouts using CSS to create clean, modern, and user-friendly designs.
              </p>
            </div>
          </div>
          <div className="absolute leading-0 bottom-38 right-4 hidden md:flex md:text-[250px] lg:text-[350px] font-bold text-black/10 dark:text-white/10">
            02
          </div>
        </div>

        {/* Third Panel */}
        <div className="panel md:min-h-screen md:min-w-full p-8 md:p-12 w-full flex flex-col justify-center relative px-6 py-10 md:py-0 md:px-24 border-t border-black/10 dark:border-white/10">
          <div className="hidden md:block absolute top-16 left-16">
            <span className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em]">
              03 / Journey / Phase 2
            </span>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12 w-full max-w-7xl mx-auto md:items-center">
            <div className="relative">
              <div className="hidden md:block text-[12vw] font-black font-display text-light-brand/20 dark:text-dark-brand/20 leading-none select-none absolute -top-20 -left-10 z-0">
                2022
              </div>
              <div className="relative z-10 md:pl-6 flex md:flex-col items-center md:items-start gap-4 md:gap-0">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-light-brand dark:bg-dark-brand rounded-xl md:rounded-2xl flex items-center justify-center md:mb-8 shadow-[0_0_30px_rgba(206,244,65,0.2)]">
                  <LiaTelegramPlane className="w-8 h-8 md:w-12 md:h-12 text-black" />
                </div>
                <div>
                  <span className="md:hidden text-gray-500 font-mono text-[10px] uppercase tracking-wider block">
                    phase 2
                  </span>
                  <h3>2022</h3>
                </div>
                <div className="hidden md:block h-1 w-32 bg-linear-to-r from-light-brand to-transparent"></div>
              </div>
            </div>
            <div className="max-w-xl">
              <h4 className="mb-3 md:mb-6 leading-tight">
                GROWING AS A FRONTEND DEVELOPER.
              </h4>
              <p>
                Started working as a Frontend Developer at NexGen, focusing on HTML, CSS, and JavaScript to build clean and responsive web pages. Improved my frontend skills by converting designs into mobile-friendly layouts and creating better user experiences.
              </p>
            </div>
          </div>
          <div className="absolute leading-0 bottom-38 right-4 hidden md:flex md:text-[250px] lg:text-[350px] font-bold text-black/10 dark:text-white/10">
            03
          </div>
        </div>

        {/* Fourth Panel */}
        <div className="panel md:min-h-screen md:min-w-full p-8 md:p-12 w-full flex flex-col justify-center relative px-6 py-10 md:py-0 md:px-24 border-t border-black/10 dark:border-white/10">
          <div className="hidden md:block absolute top-16 left-16">
            <span className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em]">
              03 / Journey / Phase 3
            </span>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12 w-full max-w-7xl mx-auto md:items-center">
            <div className="relative">
              <div className="hidden md:block text-[12vw] font-black font-display text-light-brand/20 dark:text-dark-brand/20 leading-none select-none absolute -top-20 -left-10 z-0">
                2023
              </div>
              <div className="relative z-10 md:pl-6 flex md:flex-col items-center md:items-start gap-4 md:gap-0">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-light-brand dark:bg-dark-brand rounded-xl md:rounded-2xl flex items-center justify-center md:mb-8 shadow-[0_0_30px_rgba(206,244,65,0.2)]">
                  <RiAwardLine className="w-8 h-8 md:w-12 md:h-12 text-black" />
                </div>
                <div>
                  <span className="md:hidden text-gray-500 font-mono text-[10px] uppercase tracking-wider block">
                    phase 3
                  </span>
                  <h3>2023</h3>
                </div>
                <div className="hidden md:block h-1 w-32 bg-linear-to-r from-light-brand to-transparent"></div>
              </div>
            </div>
            <div className="max-w-xl">
              <h4 className="mb-3 md:mb-6 leading-tight">MASTERING REACT.JS.</h4>
              <p>
                Started building modern frontend projects with React.js, creating responsive and interactive web interfaces. Worked with reusable components, JavaScript logic, and clean UI layouts to improve development speed and user experience.
              </p>
            </div>
          </div>
          <div className="absolute leading-0 bottom-38 right-4 hidden md:flex md:text-[250px] lg:text-[350px] font-bold text-black/10 dark:text-white/10">
            04
          </div>
        </div>

        {/* Fifth Panel */}
        <div className="panel md:min-h-screen md:min-w-full p-8 md:p-12 w-full flex flex-col justify-center relative px-6 py-10 md:py-0 md:px-24 border-t border-black/10 dark:border-white/10">
          <div className="hidden md:block absolute top-16 left-16">
            <span className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em]">
              04 / Journey / Phase 4
            </span>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12 w-full max-w-7xl mx-auto md:items-center">
            <div className="relative">
              <div className="hidden md:block text-[12vw] font-black font-display text-light-brand/20 dark:text-dark-brand/20 leading-none select-none absolute -top-20 -left-10 z-0">
                2024
              </div>
              <div className="relative z-10 md:pl-6 flex md:flex-col items-center md:items-start gap-4 md:gap-0">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-light-brand dark:bg-dark-brand rounded-xl md:rounded-2xl flex items-center justify-center md:mb-8 shadow-[0_0_30px_rgba(206,244,65,0.2)]">
                  <FiLayers className="w-8 h-8 md:w-12 md:h-12 text-black" />
                </div>
                <div>
                  <span className="md:hidden text-gray-500 font-mono text-[10px] uppercase tracking-wider block">
                    phase 4
                  </span>
                  <h3>2024</h3>
                </div>
                <div className="hidden md:block h-1 w-32 bg-linear-to-r from-light-brand to-transparent"></div>
              </div>
            </div>
            <div className="max-w-xl">
              <h4 className="mb-3 md:mb-6 leading-tight">
                Polishing Next.js with TypeScript.
              </h4>
              <p>
                Started using TypeScript for type safety and more maintainable
                React/Next.js projects. Delivered professional, scalable
                front-end applications with clean and modern UI designs.
              </p>
            </div>
          </div>
          <div className="absolute leading-0 bottom-38 right-4 hidden md:flex md:text-[250px] lg:text-[350px] font-bold text-black/10 dark:text-white/10">
            05
          </div>
        </div>

        {/* Six Panel */}
        <div className="panel md:min-h-screen md:min-w-full p-8 md:p-12 w-full flex flex-col justify-center relative px-6 py-10 md:py-0 md:px-24 border-t border-black/10 dark:border-white/10">
          <div className="hidden md:block absolute top-16 left-16">
            <span className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em]">
              05 / Journey / Phase 5
            </span>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12 w-full max-w-7xl mx-auto md:items-center">
            <div className="relative">
              <div className="hidden md:block text-[12vw] font-black font-display text-light-brand/20 dark:text-dark-brand/20 leading-none select-none absolute -top-20 -left-10 z-0">
                2025
              </div>
              <div className="relative z-10 md:pl-6 flex md:flex-col items-center md:items-start gap-4 md:gap-0">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-light-brand dark:bg-dark-brand rounded-xl md:rounded-2xl flex items-center justify-center md:mb-8 shadow-[0_0_30px_rgba(206,244,65,0.2)]">
                  <FiLayers className="w-8 h-8 md:w-12 md:h-12 text-black" />
                </div>
                <div>
                  <span className="md:hidden text-gray-500 font-mono text-[10px] uppercase tracking-wider block">
                    phase 5
                  </span>
                  <h3>2025</h3>
                </div>
                <div className="hidden md:block h-1 w-32 bg-linear-to-r from-light-brand to-transparent"></div>
              </div>
            </div>
            <div className="max-w-xl">
              <h4 className="mb-3 md:mb-6 leading-tight">
                WORKING WITH UK CLIENTS.
              </h4>
              <p>
                Started working with a UK-based digital agency on WordPress and frontend projects. Built Elementor Pro websites, redesigned existing WordPress sites, optimized speed and SEO, and developed custom frontend interfaces using React.js, Next.js, and TypeScript.
              </p>
            </div>
          </div>
          <div className="absolute leading-0 bottom-38 right-4 hidden md:flex md:text-[250px] lg:text-[350px] font-bold text-black/10 dark:text-white/10">
            06
          </div>
        </div>

        {/* Sixth Panel */}

        <div className="panel bg-light-brand dark:bg-dark-brand md:min-h-screen md:min-w-full p-8 md:p-12 w-full flex flex-col justify-center relative px-6 py-10 md:py-0 md:px-24 border-t border-black/10 dark:border-white/10">
          <div className="absolute inset-0 bg-[url('/assets/img/noise.svg')]"></div>
          <div className="text-center relative z-10 px-6">
            <span className="block font-mono text-black/60 text-xs md:text-sm uppercase tracking-widest mb-2 md:mb-4">
              What's Next?
            </span>
            <h3 className="text-6xl md:text-[15vw] font-black font-display text-black leading-[0.8] mb-4 md:mb-6 tracking-tighter">
              READY?
            </h3>
            <p className="text-black font-mono text-sm md:text-3xl tracking-[0.15em] md:tracking-[0.25em] uppercase font-bold">
              Let's build the future.
            </p>
          </div>
        </div>

        {/* end */}
      </div>
    </section>
  );
}
