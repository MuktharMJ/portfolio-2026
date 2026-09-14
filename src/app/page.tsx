import Hero from "@/components/sections/Hero";
import FeaturedWork from "@/components/sections/FeaturedWork";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <main id="content">
      <Hero />
      <FeaturedWork />
      <About />
      <Skills />
      <Contact />
    </main>
  );
}
