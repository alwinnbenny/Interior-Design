
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
   <main>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Services />
      <Footer />
      </main>
  );
}



