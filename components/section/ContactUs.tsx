"use client";

import Image from "next/image";
import AnimatedButton from "@/components/elements/AnimatedButton";
import { Github, Linkedin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { IoIosArrowDown } from "react-icons/io";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_srt00lg";
const EMAILJS_TEMPLATE_ID = "template_2eme1rp";
const EMAILJS_PUBLIC_KEY = "CjgAomL6qNsQQlHWh";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [proposal, setProposal] = useState("");

  const [budget, setBudget] = useState("");
  const [customBudget, setCustomBudget] = useState("");
  const [stack, setStack] = useState("");
  const [customStack, setCustomStack] = useState("");

  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const [showStackDropdown, setShowStackDropdown] = useState(false);

  const [showCustomBudgetInput, setShowCustomBudgetInput] = useState(false);
  const [showCustomStackInput, setShowCustomStackInput] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const budgetDropdownRef = useRef<HTMLUListElement>(null);
  const stackDropdownRef = useRef<HTMLUListElement>(null);

  const budgetOptions = ["$100", "$500", "$1000", "Custom"];
  const stackOptions = ["Next.js", "WordPress", "Full Stack Website", "Custom"];

  useEffect(() => {
    if (budgetDropdownRef.current) {
      gsap.to(budgetDropdownRef.current, {
        height: showBudgetDropdown ? "auto" : 0,
        opacity: showBudgetDropdown ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
        overflow: "hidden",
      });
    }
  }, [showBudgetDropdown]);

  useEffect(() => {
    if (stackDropdownRef.current) {
      gsap.to(stackDropdownRef.current, {
        height: showStackDropdown ? "auto" : 0,
        opacity: showStackDropdown ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
        overflow: "hidden",
      });
    }
  }, [showStackDropdown]);

  const handleBudgetSelect = (option: string) => {
    if (option === "Custom") {
      setShowCustomBudgetInput(true);
      setBudget("");
    } else {
      setBudget(option);
      setCustomBudget("");
      setShowCustomBudgetInput(false);
    }
    setShowBudgetDropdown(false);
  };

  const handleStackSelect = (option: string) => {
    if (option === "Custom") {
      setShowCustomStackInput(true);
      setStack("");
    } else {
      setStack(option);
      setCustomStack("");
      setShowCustomStackInput(false);
    }
    setShowStackDropdown(false);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !proposal.trim()) {
      setStatus("error");
      setStatusMessage("Please fill in your name, email, and message.");
      return;
    }

    const finalBudget = showCustomBudgetInput ? customBudget : budget;
    const finalStack = showCustomStackInput ? customStack : stack;

    setIsLoading(true);
    setStatus("idle");
    setStatusMessage("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          message: proposal,
          budget: finalBudget || "Not specified",
          stack: finalStack || "Not specified",
          to_email: "m.hamzamughal60@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setStatusMessage("Message sent! I'll get back to you soon.");
      setName("");
      setEmail("");
      setProposal("");
      setBudget("");
      setCustomBudget("");
      setStack("");
      setCustomStack("");
      setShowCustomBudgetInput(false);
      setShowCustomStackInput(false);
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
      setStatusMessage("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="contact" className="relative z-20 bg-dark-bg">
      <section className="relative min-h-[90vh] bg-white dark:bg-black py-24 px-6 lg:px-16 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-20"></div>
        <div className="absolute inset-0 bg-[url('/assets/img/noise.svg')] opacity-70 dark:opacity-40"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col">
          {/* Big heading - NO AnimatedText wrapper to prevent re-animation on typing */}
          <div className="flex-1 select-none">
            <div>
              <span className="text-light-brand dark:text-dark-brand text-sm uppercase tracking-[0.25em]">
                05 / Get Connected
              </span>
              <h2 className="text-[12vw] leading-[0.85] mt-6 md:mt-10 font-black font-display uppercase tracking-tighter">
                <div>Let's</div>
                <div className="text-light-brand dark:text-dark-brand">Work</div>
                <div>Together</div>
              </h2>
            </div>
          </div>

          {/* Form & Info grid */}
          <div className="grid md:grid-cols-2 gap-12 mt-20 border-t pt-12">
            {/* Form */}
            <div className="p-1">
              <h3 className="text-2xl font-display mb-8">Send a Message</h3>
              <div className="space-y-8 max-w-md">

                {/* Name */}
                <div className="space-y-1">
                  <label className="text-gray-700 dark:text-gray-200 text-xs uppercase ml-1">Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent focus:border-b-dark-brand border-b py-3 outline-none transition-colors font-display text-lg placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-gray-700 dark:text-gray-200 text-xs uppercase ml-1">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b py-3 focus:border-b-dark-brand outline-none transition-colors font-display text-lg placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>

                {/* Proposal */}
                <div className="space-y-1">
                  <label className="text-gray-700 dark:text-gray-200 text-xs uppercase ml-1">Proposal</label>
                  <textarea
                    rows={1}
                    placeholder="Project details..."
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                    className="w-full bg-transparent border-b py-3 focus:border-b-dark-brand outline-none transition-colors font-display text-lg resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  ></textarea>
                </div>

                {/* Budget */}
                <div className="space-y-1 relative">
                  <label className="text-xs uppercase ml-1">Budget</label>
                  <div
                    onClick={() => setShowBudgetDropdown(!showBudgetDropdown)}
                    className="w-full border-b py-3 flex justify-between cursor-pointer"
                  >
                    <span className="text-gray-600 dark:text-gray-300 text-xs uppercase ml-1">
                      {budget || customBudget || "Select budget"}
                    </span>
                    <span className={`transition-transform ${showBudgetDropdown ? "rotate-180" : ""}`}>
                      <IoIosArrowDown className="w-4 h-4" />
                    </span>
                  </div>
                  <ul
                    ref={budgetDropdownRef}
                    className="absolute z-10 mt-1 w-full bg-white dark:bg-black border rounded shadow-md overflow-hidden"
                  >
                    {budgetOptions.map((option) => (
                      <li
                        key={option}
                        onClick={() => handleBudgetSelect(option)}
                        className="px-3 py-2 cursor-pointer hover:bg-light-brand/30 dark:hover:bg-dark-brand/30"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                  {showCustomBudgetInput && (
                    <input
                      type="number"
                      placeholder="Enter custom budget ($)"
                      value={customBudget}
                      onChange={(e) => setCustomBudget(e.target.value)}
                      className="w-full mt-2 bg-transparent border-b py-3 outline-none font-display text-lg placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  )}
                </div>

                {/* Stack */}
                <div className="space-y-1 relative">
                  <label className="text-xs uppercase ml-1">Stack</label>
                  <div
                    onClick={() => setShowStackDropdown(!showStackDropdown)}
                    className="w-full border-b py-3 flex justify-between cursor-pointer"
                  >
                    <span className="text-gray-600 dark:text-gray-300 text-xs uppercase ml-1">
                      {stack || customStack || "Select stack"}
                    </span>
                    <span className={`transition-transform ${showStackDropdown ? "rotate-180" : ""}`}>
                      <IoIosArrowDown className="w-4 h-4" />
                    </span>
                  </div>
                  <ul
                    ref={stackDropdownRef}
                    className="absolute z-20 mt-1 w-full bg-white dark:bg-black border rounded shadow-md overflow-hidden"
                  >
                    {stackOptions.map((option) => (
                      <li
                        key={option}
                        onClick={() => handleStackSelect(option)}
                        className="px-3 py-2 cursor-pointer hover:bg-light-brand/30 dark:hover:bg-dark-brand/30"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                  {showCustomStackInput && (
                    <input
                      type="text"
                      placeholder="Enter custom stack"
                      value={customStack}
                      onChange={(e) => setCustomStack(e.target.value)}
                      className="w-full mt-2 bg-transparent border-b py-3 outline-none font-display text-lg placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  )}
                </div>

                {/* Status message */}
                {status !== "idle" && (
                  <div
                    className={`text-sm font-mono px-4 py-3 rounded border ${
                      status === "success"
                        ? "text-green-600 dark:text-green-400 border-green-500/30 bg-green-500/10"
                        : "text-red-500 dark:text-red-400 border-red-500/30 bg-red-500/10"
                    }`}
                  >
                    {statusMessage}
                  </div>
                )}

                {/* Submit button */}
                <AnimatedButton
                  onClick={isLoading ? undefined : handleSubmit}
                  label={isLoading ? "SENDING..." : "SEND MESSAGE"}
                  iconPosition="right"
                  className={`font-bold transition-colors flex items-center gap-3 group tracking-widest uppercase text-xs ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  icon={
                    isLoading ? (
                      <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform stroke-[3px]">
                        <path d="M7 7h10v10"></path>
                        <path d="M7 17 17 7"></path>
                      </svg>
                    )
                  }
                />
              </div>
            </div>

            {/* Profile / Contact info */}
            <div className="flex flex-col justify-start space-y-8">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-white/10">
                    <Image src="/assets/img/photo.jpg" alt="Muhammad Hamza" width={300} height={300} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-light-brand dark:bg-dark-brand rounded-full border-2"></div>
                </div>
                <div>
                  <div className="font-display font-bold text-lg">Muhammad Hamza</div>
                  <div className="text-gray-500 font-mono text-xs uppercase tracking-wider">Front End Developer</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-gray-500 font-mono text-xs uppercase">Contact Directly</div>
                <a href="mailto:m.hamzamughal60@gmail.com" className="text-2xl md:text-3xl font-display hover:text-lime-accent transition-colors block break-all">
                  m.hamzamughal60@gmail.com
                </a>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 border rounded-full">
                  <AnimatedButton variant="icon" href="https://github.com/mhamza154" icon={<Github />} newTab={true} />
                </div>
                <div className="w-12 h-12 border rounded-full">
                  <AnimatedButton variant="icon" href="https://www.linkedin.com/in/muhammad-hamza-6b8a91179/" icon={<Linkedin />} newTab={true} />
                </div>
              </div>

              <div className="flex justify-between items-end font-mono text-xs uppercase pt-8">
                <div>© 2026 Muhammad Hamza.</div>
                <div>Designed & Built in Nextjs</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
