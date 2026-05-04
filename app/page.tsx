import Hero from "@/components/section/Hero";
import About from "@/components/section/About";
import Skill from "@/components/section/Skill";
import Project from "@/components/section/Project";
import Faqs from "@/components/section/Faqs";
import Contactus from "@/components/section/ContactUs";

export default function Home() {
  return (
    <main className="min-h-screen text-black dark:text-white transition-all duration-300">
      <Hero />
      <About />
      <Skill />
      <Project />
      <Faqs />
      <Contactus />
    </main>
  );
}
