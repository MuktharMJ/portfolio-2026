import Hero from "@/components/sections/Hero";
import FeaturedWork from "@/components/sections/FeaturedWork";
import TheLab from "@/components/sections/TheLab";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Philosophy from "@/components/sections/Philosophy";
import ResumeSection from "@/components/sections/ResumeSection";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <main id="content">
      <Hero />
      <FeaturedWork />
      <TheLab />
      <About />
      <Skills />
      <Philosophy />
      <ResumeSection />
      <Contact />
    </main>
  );
}
