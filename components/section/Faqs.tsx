"use client";

import Image from "next/image";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "../elements/SplitText";

gsap.registerPlugin(ScrollTrigger);

// Different avatar images for each FAQ item — using UI Avatars API (no external assets needed)
const avatarUrls = [
  "https://ui-avatars.com/api/?name=Clean+Code&background=CEF441&color=000&bold=true&size=52",
  "https://ui-avatars.com/api/?name=On+Time&background=D3D3FF&color=000&bold=true&size=52",
  "https://ui-avatars.com/api/?name=Modern+UI&background=FFE3AC&color=000&bold=true&size=52",
  "https://ui-avatars.com/api/?name=Mobile+First&background=C7F9CC&color=000&bold=true&size=52",
  "https://ui-avatars.com/api/?name=Full+Support&background=B2DBFF&color=000&bold=true&size=52",
];

export default function WhyHireMe() {
  const container = useRef<HTMLDivElement>(null);

  const answersRef = useRef<HTMLDivElement[]>([]);
  const plusIcons = useRef<HTMLDivElement[]>([]);
  const minusIcons = useRef<HTMLDivElement[]>([]);
  const activeIndex = useRef<number | null>(null);

 const faqData = [
  {
    question: "Clean, Maintainable Code",
    answer:
      "I write code that is easy to read, scale, and maintain. Every project follows best practices proper folder structure, reusable components, and meaningful naming so your codebase stays clean long after launch.",
    color: "#CEF441",
    initials: "CC",
  },
  {
    question: "Deadlines Are Sacred",
    answer:
      "I take timelines seriously. I plan, communicate, and deliver on time every time. You'll always know where the project stands, with no last-minute surprises.",
    color: "#D3D3FF",
    initials: "OT",
  },
  {
    question: "Pixel Perfect Modern UI",
    answer:
      "I convert Figma or any design into flawless, responsive interfaces. From micro animations to smooth transitions, I build UIs that look professional and feel great to use.",
    color: "#FFE3AC",
    initials: "MU",
  },
  {
    question: "Mobile First Approach",
    answer:
      "Every project I build works beautifully on all screen sizes phones, tablets, and desktops. Mobile-first isn't an afterthought for me, it's baked into the foundation.",
    color: "#C7F9CC",
    initials: "MF",
  },
  {
    question: "Post-Launch Support",
    answer:
      "My work doesn't stop at delivery. I offer clear handover, documentation, and continued support to make sure your product runs perfectly even after we're done.",
    color: "#B2DBFF",
    initials: "PS",
  },
];

  useEffect(() => {
    /* FAQ INITIAL STATE */
    answersRef.current.forEach((el, index) => {
      if (!el) return;

      gsap.set(el, {
        height: 0,
        opacity: 0,
        x: 150,
        scale: 0,
        overflow: "hidden",
        transformOrigin: "right center",
      });

      if (minusIcons.current[index]) {
        gsap.set(minusIcons.current[index], {
          opacity: 0,
          scale: 0,
        });
      }
    });

    /* OPEN FIRST FAQ */
    const firstAnswer = answersRef.current[0];
    const firstPlus = plusIcons.current[0];
    const firstMinus = minusIcons.current[0];

    if (firstAnswer && firstPlus && firstMinus) {
      activeIndex.current = 0;

      gsap.to(firstAnswer, {
        height: "auto",
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      });

      gsap.to(firstPlus, {
        rotate: 90,
        opacity: 0,
        duration: 0.3,
      });

      gsap.to(firstMinus, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(2)",
      });
    }
  }, []);

  const toggle = (index: number) => {
    const current = answersRef.current[index];
    if (!current) return;

    /* CLOSE PREVIOUS */
    if (activeIndex.current !== null && activeIndex.current !== index) {
      const prev = answersRef.current[activeIndex.current];

      gsap.to(prev, {
        height: 0,
        opacity: 0,
        x: 150,
        scale: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });

      gsap.to(plusIcons.current[activeIndex.current], {
        rotate: 0,
        opacity: 1,
        duration: 0.3,
      });

      gsap.to(minusIcons.current[activeIndex.current], {
        scale: 0,
        opacity: 0,
        duration: 0.3,
      });
    }

    /* CLOSE SAME */
    if (activeIndex.current === index) {
      gsap.to(current, {
        height: 0,
        opacity: 0,
        x: 150,
        scale: 0,
        duration: 0.4,
      });

      gsap.to(plusIcons.current[index], {
        rotate: 0,
        opacity: 1,
        duration: 0.3,
      });

      gsap.to(minusIcons.current[index], {
        scale: 0,
        opacity: 0,
        duration: 0.3,
      });

      activeIndex.current = null;
    } else {
      /* OPEN */
      gsap.to(current, {
        height: "auto",
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      });

      gsap.to(plusIcons.current[index], {
        rotate: 90,
        opacity: 0,
        duration: 0.3,
      });

      gsap.to(minusIcons.current[index], {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(2)",
      });

      activeIndex.current = index;
    }

    ScrollTrigger.refresh();
  };

  return (
    <section id="hire" className="relative bg-white dark:bg-black min-h-screen pb-32">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-light-brand/10 dark:bg-dark-brand/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div ref={container} className="px-6 text-center mb-20">
        <AnimatedText start="top 70%">
          <h2>
            Why People Hire <br />{" "}
            <span className="stroke-text font-bold">me!</span>
          </h2>
        </AnimatedText>
      </div>

      <div className="px-6 lg:px-16 space-y-6 md:space-y-14">
        {faqData.map((item, index) => (
          <div key={index}>
            {/* Question */}
            <div
              className="flex items-end gap-2 cursor-pointer"
              onClick={() => toggle(index)}
            >
              {/* Unique avatar per FAQ item */}
              <div className="rounded-full overflow-hidden hidden md:flex w-[52px] h-[52px] flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarUrls[index]}
                  alt={`icon ${index + 1}`}
                  width={52}
                  height={52}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative text-center flex-center max-sm:w-full py-5">
                <svg
                  viewBox="0 0 654 60"
                  className="absolute inset-0 size-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M638 0C646.837 0 654 7.16344 654 16V44C654 52.8366 646.837 60 638 60H84.7361C69.9165 60 56.6343 58.7349 45.927 54.7059C34.2113 59.5307 18.902 60.3821 0.663459 59.5537C0.430289 59.5431 0.221926 59.4812 0.102574 59.387C-0.0627421 59.2566 -0.0219356 59.0959 0.1797 58.9874L0.360375 58.9171L1.67986 58.5452C10.3273 56.062 12.0329 53.8379 14.6966 51.1765C17.5418 48.3338 22.7342 41.7965 22.3738 32.2609C22.3225 31.7875 22.2979 31.3122 22.2979 30.8343V16C22.2979 7.16345 29.4613 0 38.2979 0H638Z"
                    fill="#F4F5F5"
                  />
                </svg>

                <span className="relative text-black text-base md:text-2xl font-medium md:ps-14 px-5 lg:px-10 py-5">
                  {item.question}
                </span>
              </div>

              {/* Button */}
              <button
                className="relative top-1/3 -translate-y-1/4 p-6 rounded-full cursor-pointer"
                style={{ background: item.color }}
              >
                <div
                  ref={(el) => {
                    if (el) plusIcons.current[index] = el;
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <FiPlus className="w-6 h-6 md:w-8 md:h-8 text-black" />
                </div>

                <div
                  ref={(el) => {
                    if (el) minusIcons.current[index] = el;
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <FiMinus className="w-6 h-6 md:w-8 md:h-8 text-black" />
                </div>
              </button>
            </div>

            {/* Answer */}
            <div
              ref={(el) => {
                if (el) answersRef.current[index] = el;
              }}
              className="flex items-end justify-end mt-4"
            >
              <div className="relative max-w-3xl flex-center">
                <svg
                  viewBox="0 0 860 318"
                  preserveAspectRatio="none"
                  className="absolute inset-0 size-full"
                >
                  <path
                    d="M16 0C7.16345 0 0 7.16344 0 16V302C0 310.837 7.16345 318 16 318H748.573C768.061 318 785.527 311.295 799.607 289.941C815.013 315.513 835.144 320.025 859.128 315.635C859.434 315.579 859.708 315.25 859.865 314.751C860.083 314.06 860.029 313.208 859.764 312.633L859.526 312.26L857.791 310.29C846.42 297.129 844.177 285.341 840.674 271.235C836.933 256.169 830.105 221.522 830.579 170.983C830.646 168.473 830.679 165.955 830.679 163.422V16C830.679 7.16344 823.515 0 814.679 0H16Z"
                    fill={item.color}
                  />
                </svg>

                <div className="relative z-10 text-base md:text-2xl p-8 pe-14">
                  <p className="md:leading-9 text-black text-base md:text-2xl font-medium">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
