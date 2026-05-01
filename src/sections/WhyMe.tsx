import Section from "../components/Section";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

const reasons = [
  {
    title: "Clean Architecture",
    desc: "I build scalable codebases that are easy to maintain and extend as your business grows."
  },
  {
    title: "Real-time Expertise",
    desc: "Deep knowledge in building chat systems, live streaming, and instant data synchronization."
  },
  {
    title: "Fast Communication",
    desc: "I keep you in the loop with regular updates and quick responses to your queries."
  },
  {
    title: "Performance Focused",
    desc: "Every line of code is optimized for 60fps animations and low latency operations."
  }
];

export default function WhyMe() {
  return (
    <Section id="why" title="Why Choose Me">
      <div className="grid gap-6 md:grid-cols-2">
        {reasons.map((r, index) => (
          <motion.div 
            key={r.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div className="mt-1 flex-shrink-0">
              <FiCheckCircle className="text-2xl text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">{r.title}</h3>
              <p className="text-white/60 text-sm">{r.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}