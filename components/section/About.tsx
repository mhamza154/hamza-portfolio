"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import "../../public/assets/img/photo.jpg";

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
              end: () => "+=" + section.offsetWidth,
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
                  src="/assets/img/photo.jpg"
                  alt="Muhammad Hamza"
                  fill
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-[var(--light-brand)]/20 dark:bg-[var(--dark-brand)]/20 rounded-xl -z-10"></div>
              <div className="absolute -top-3 -left-3 w-16 h-16 border border-[var(--light-brand)]/30 dark:border-[var(--dark-brand)]/30 rounded-xl -z-10"></div>
            </div>
            <div className="text-center md:text-left space-y-8 mt-8 md:mt-0">
              <span className="text-sm uppercase text-[var(--light-brand)] dark:text-[var(--dark-brand)]">
                The Profile
              </span>
              <h2 className="mt-6">
                Muhammad <br />
                <span className="stroke-text font-bold">Hamza.</span>
              </h2>
              <p>
                I'm a passionate full-stack developer crafting beautiful digital
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
              <div className="hidden md:block text-[12vw] font-black font-display text-[var(--light-brand)]/20 dark:text-[var(--dark-brand)]/20 leading-none select-none absolute -top-20 -left-10 z-0">
                2022
              </div>
              <div className="relative z-10 md:pl-6 flex md:flex-col items-center md:items-start gap-4 md:gap-0">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-lime-accent rounded-xl md:rounded-2xl flex items-center justify-center md:mb-8 shadow-[0_0_30px_rgba(206,244,65,0.2)]"></div>
                <div>
                  <span className="md:hidden text-gray-500 font-mono text-[10px] uppercase tracking-wider block">
                    phase 1
                  </span>
                  <h3>2022</h3>
                </div>
                <div className="hidden md:block h-1 w-32 bg-gradient-to-r from-[var(--light-brand)] to-transparent"></div>
              </div>
            </div>
            <div className="max-w-xl">
              <h4 className="mb-3 md:mb-6 leading-tight">
                Building the <br className="hidden md:block" />
                <span>Foundation.</span>
              </h4>
              <p>
                Dived deep into Spring Boot, Spring Security, JPA, and MySQL.
                Learned how real backend systems are designed — authentication,
                role-based access control, REST APIs, and transactional
                workflows.
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
              <div className="hidden md:block text-[12vw] font-black font-display text-[var(--light-brand)]/20 dark:text-[var(--dark-brand)]/20 leading-none select-none absolute -top-20 -left-10 z-0">
                2023
              </div>
              <div className="relative z-10 md:pl-6 flex md:flex-col items-center md:items-start gap-4 md:gap-0">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-lime-accent rounded-xl md:rounded-2xl flex items-center justify-center md:mb-8 shadow-[0_0_30px_rgba(206,244,65,0.2)]"></div>
                <div>
                  <span className="md:hidden text-gray-500 font-mono text-[10px] uppercase tracking-wider block">
                    phase 2
                  </span>
                  <h3>2023</h3>
                </div>
                <div className="hidden md:block h-1 w-32 bg-gradient-to-r from-[var(--light-brand)] to-transparent"></div>
              </div>
            </div>
            <div className="max-w-xl">
              <h4 className="mb-3 md:mb-6 leading-tight">
                Shipping Real <br className="hidden md:block" />
                <span>Products.</span>
              </h4>
              <p>
                Built and deployed full-stack products — a URL shortener,
                e-commerce platform, and quiz SaaS. Entered the hackathon
                circuit and reached the finals at Vadodara Hackathon 5.0,
                placing in the top 45 out of 400+ teams.
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
              <div className="hidden md:block text-[12vw] font-black font-display text-[var(--light-brand)]/20 dark:text-[var(--dark-brand)]/20 leading-none select-none absolute -top-20 -left-10 z-0">
                2024
              </div>
              <div className="relative z-10 md:pl-6 flex md:flex-col items-center md:items-start gap-4 md:gap-0">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-lime-accent rounded-xl md:rounded-2xl flex items-center justify-center md:mb-8 shadow-[0_0_30px_rgba(206,244,65,0.2)]"></div>
                <div>
                  <span className="md:hidden text-gray-500 font-mono text-[10px] uppercase tracking-wider block">
                    phase 3
                  </span>
                  <h3>2024</h3>
                </div>
                <div className="hidden md:block h-1 w-32 bg-gradient-to-r from-[var(--light-brand)] to-transparent"></div>
              </div>
            </div>
            <div className="max-w-xl">
              <h4 className="mb-3 md:mb-6 leading-tight">
                Going Production <br className="hidden md:block" />
                <span>Grade.</span>
              </h4>
              <p>
                Won PU Code Hackathon 3.0 — ranked Top 10 out of 210 teams
                nationally. Built a microservices-based ride booking platform
                using gRPC, circuit breakers, and Redis geospatial queries.
                Selected as a finalist from 19,000+ participants at Odoo
                Hackathon 2025.
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
              <div className="hidden md:block text-[12vw] font-black font-display text-[var(--light-brand)]/20 dark:text-[var(--dark-brand)]/20 leading-none select-none absolute -top-20 -left-10 z-0">
                2025
              </div>
              <div className="relative z-10 md:pl-6 flex md:flex-col items-center md:items-start gap-4 md:gap-0">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-lime-accent rounded-xl md:rounded-2xl flex items-center justify-center md:mb-8 shadow-[0_0_30px_rgba(206,244,65,0.2)]"></div>
                <div>
                  <span className="md:hidden text-gray-500 font-mono text-[10px] uppercase tracking-wider block">
                    phase 4
                  </span>
                  <h3>2025</h3>
                </div>
                <div className="hidden md:block h-1 w-32 bg-gradient-to-r from-[var(--light-brand)] to-transparent"></div>
              </div>
            </div>
            <div className="max-w-xl">
              <h4 className="mb-3 md:mb-6 leading-tight">
                Scaling &
                <br className="hidden md:block" />
                <span>Deploying.</span>
              </h4>
              <p>
                Built an AI voice agent for automated patient appointment
                booking. Containerized backend systems using distroless Docker
                builds — slashing image size by 52%. Engineered APIs handling
                250+ requests/sec with sub-30ms P90 latency and zero errors
                under load.
              </p>
            </div>
          </div>
          <div className="absolute leading-0 bottom-38 right-4 hidden md:flex md:text-[250px] lg:text-[350px] font-bold text-black/10 dark:text-white/10">
            05
          </div>
        </div>

        {/* Sixth Panel */}

        <div className="panel bg-[var(--light-brand)] dark:bg-[var(--dark-brand)] md:min-h-screen md:min-w-full p-8 md:p-12 w-full flex flex-col justify-center relative px-6 py-10 md:py-0 md:px-24 border-t border-black/10 dark:border-white/10">
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
