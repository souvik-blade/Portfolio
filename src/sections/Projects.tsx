import Section from "../components/Section";
import Card from "../components/Card";
import { FiExternalLink, FiGithub } from "react-icons/fi";

const projects = [
  {
    title: "Real-time Chat & Call App",
    desc: "A high-performance communication platform with low latency chat, voice, and video calling capabilities powered by ZEGOCLOUD.",
    tech: ["Flutter", "Dart", "ZEGOCLOUD", "Firebase"],
    link: "#",
    github: "#"
  },
  {
    title: "E-commerce Platform",
    desc: "Scalable digital storefront with full cart functionality, secure checkout, and dynamic product listings.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    link: "#",
    github: "#"
  },
];

export default function Projects() {
  return (
    <Section id="work" title="Featured Work" subtitle="A selection of my recent projects focusing on performance and scalability.">
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((p, index) => (
          <Card key={p.title} delay={index * 0.1} className="flex flex-col h-full">
            <div className="mb-6 h-48 w-full rounded-xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center border border-white/5 relative overflow-hidden group-hover:border-primary/30 transition-colors">
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-white/20 font-medium">Project Preview</span>
            </div>
            
            <h3 className="text-2xl text-white font-bold mb-3">{p.title}</h3>
            <p className="text-white/60 mb-6 flex-grow">{p.desc}</p>
            
            <div className="mb-6 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-4 mt-auto pt-4 border-t border-white/10">
              <a href={p.link} className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-primary transition-colors">
                <FiExternalLink /> Live Demo
              </a>
              <a href={p.github} className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-primary transition-colors">
                <FiGithub /> Source Code
              </a>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}