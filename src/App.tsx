import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import WhyMe from "./sections/WhyMe";
import About from "./sections/About";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <div className="bg-bg text-white font-sans selection:bg-primary/30 selection:text-white relative">
      <Navbar />
      <Hero />
      <Projects />
      <Services />
      <WhyMe />
      <About />
      <Contact />
      
      <footer className="border-t border-white/10 py-8 mt-20 relative z-10">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Blade.dev. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Global abstract background effects */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] h-96 w-96 rounded-full bg-primary opacity-5 blur-[150px]" />
        <div className="absolute bottom-[20%] right-[10%] h-96 w-96 rounded-full bg-accent opacity-5 blur-[150px]" />
      </div>
    </div>
  );
}
