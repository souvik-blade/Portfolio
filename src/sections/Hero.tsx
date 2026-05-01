import { motion } from "framer-motion";
import { FiArrowRight, FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[120px] animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-[120px] animate-blob" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          Available for new projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight"
        >
          Crafting scalable <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            real-time experiences
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-white/60"
        >
          Flutter & React developer specializing in high-performance applications, 
          complex APIs, and clean architecture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-4 font-semibold text-white transition-all hover:shadow-glow w-full sm:w-auto"
          >
            <span>View My Work</span>
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 w-full sm:w-auto"
          >
            Let's Talk
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 flex justify-center gap-6 text-white/40"
        >
          <a href="#" className="hover:text-white transition-colors"><FiGithub size={24} /></a>
          <a href="#" className="hover:text-primary transition-colors"><FiTwitter size={24} /></a>
          <a href="#" className="hover:text-primary transition-colors"><FiLinkedin size={24} /></a>
        </motion.div>
      </div>
    </div>
  );
}
