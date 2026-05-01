import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-bg/60 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold group-hover:bg-primary group-hover:text-white transition-colors">
            B
          </div>
          <span className="font-bold text-white text-xl tracking-tight">Blade<span className="text-primary">.dev</span></span>
        </a>
        <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
          <a href="#work" className="hover:text-primary transition-colors">Work</a>
          <a href="#services" className="hover:text-primary transition-colors">Services</a>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
        </div>
        <a 
          href="#contact" 
          className="rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-primary hover:shadow-glow"
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
}