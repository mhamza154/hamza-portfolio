import Hero from "@/components/section/Hero";
import About from "@/components/section/About";

export default function Home() {
  return (
    <main className="min-h-screen text-black dark:text-white transition-all duration-300">
      <Hero />
      <About />
    </main>
  );
}
