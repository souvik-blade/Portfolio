import Section from "../components/Section";
import { motion } from "framer-motion";

export default function About() {
  return (
    <Section id="about" title="About Me">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/3"
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10" />
            <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold text-4xl group-hover:scale-110 transition-transform duration-500">
              Avatar
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-2/3"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">
            Hi, I'm a passionate developer focused on <span className="text-primary">scalability</span>.
          </h3>
          <div className="space-y-4 text-white/70 leading-relaxed text-lg">
            <p>
              With years of experience in Flutter and React, I've dedicated my career to building high-performance applications that users love. 
              My expertise lies in integrating complex APIs, managing state in large applications, and implementing real-time features.
            </p>
            <p>
              Whether it's a seamless e-commerce checkout or a low-latency video calling app, I bring a product-focused mindset to every line of code I write.
              I believe in clean architecture, thorough documentation, and pixel-perfect UI.
            </p>
          </div>
          
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-8">
            {[
              { label: "Experience", value: "3+ Yrs" },
              { label: "Projects", value: "20+" },
              { label: "Clients", value: "15+" },
              { label: "Commitment", value: "100%" },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}