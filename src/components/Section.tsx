import type { ReactNode } from "react";
import { motion } from "framer-motion";

export default function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="py-20 md:py-32 relative">
      <div className="mx-auto max-w-6xl px-4 relative z-10">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 md:mb-16"
          >
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {title}
                <span className="text-primary">.</span>
              </h2>
            )}
            {subtitle && (
              <p className="text-white/60 max-w-2xl text-lg">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
