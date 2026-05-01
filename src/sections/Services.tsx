import Section from "../components/Section";
import Card from "../components/Card";
import { FiSmartphone, FiMessageCircle, FiDatabase, FiTool } from "react-icons/fi";

const services = [
  {
    title: "Mobile App Development",
    desc: "Native-quality iOS and Android apps built with Flutter for maximum performance and code reuse.",
    icon: <FiSmartphone className="text-3xl text-primary mb-4" />
  },
  {
    title: "Real-time Chat & Calls",
    desc: "Integration of WebRTC, WebSockets, and third-party SDKs like ZEGOCLOUD for seamless communication.",
    icon: <FiMessageCircle className="text-3xl text-primary mb-4" />
  },
  {
    title: "API Integration",
    desc: "Robust integration of RESTful and GraphQL APIs ensuring secure and efficient data flow.",
    icon: <FiDatabase className="text-3xl text-primary mb-4" />
  },
  {
    title: "App Optimization",
    desc: "Performance profiling, bug fixing, and refactoring to ensure your app runs smoothly.",
    icon: <FiTool className="text-3xl text-primary mb-4" />
  },
];

export default function Services() {
  return (
    <Section id="services" title="Services" subtitle="Specialized solutions for your technical needs.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, index) => (
          <Card key={s.title} delay={index * 0.1}>
            {s.icon}
            <h3 className="text-xl text-white font-semibold mb-2">{s.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}