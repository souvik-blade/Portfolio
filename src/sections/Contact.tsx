import Section from "../components/Section";
import Card from "../components/Card";
import { FiMail, FiMessageCircle, FiMapPin } from "react-icons/fi";

export default function Contact() {
  return (
    <Section id="contact" title="Get in Touch" subtitle="Have a project in mind or want to discuss a potential collaboration?">
      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <a href="mailto:you@example.com" className="block">
          <Card className="text-center hover:bg-white/5 cursor-pointer h-full">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 text-xl">
              <FiMail />
            </div>
            <h3 className="text-white font-semibold mb-2">Email Me</h3>
            <p className="text-white/60 text-sm">you@example.com</p>
          </Card>
        </a>
        
        <a href="https://wa.me/your-number" className="block">
          <Card className="text-center hover:bg-white/5 cursor-pointer h-full" delay={0.1}>
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 text-xl">
              <FiMessageCircle />
            </div>
            <h3 className="text-white font-semibold mb-2">WhatsApp</h3>
            <p className="text-white/60 text-sm">Send a message</p>
          </Card>
        </a>

        <Card className="text-center" delay={0.2}>
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 text-xl">
            <FiMapPin />
          </div>
          <h3 className="text-white font-semibold mb-2">Location</h3>
          <p className="text-white/60 text-sm">Remote / Global</p>
        </Card>
      </div>
      
      <div className="glass-panel rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto border-t-4 border-t-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
        <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Ready to start your next project?</h3>
        <p className="text-white/70 mb-8 max-w-xl mx-auto relative z-10">
          I'm currently available for freelance work and full-time opportunities. 
          Let's build something amazing together.
        </p>
        <a href="mailto:you@example.com" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 font-semibold text-white transition-all hover:shadow-glow hover:-translate-y-1 relative z-10">
          Start a Conversation
        </a>
      </div>
    </Section>
  );
}