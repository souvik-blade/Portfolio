"use client";

import { useState } from "react";
import Link from "next/link";
import Whale from "@/components/ascii/Whale";
import FloatingObjects from "@/components/ascii/FloatingObjects";
import AsciiTrail from "@/components/ascii/AsciiTrail";
import ScrollScene from "@/components/ascii/ScrollScene";
import { ArrowUpRight, ArrowRight, Github, Linkedin, Mail } from "lucide-react";

const projects = [
  { n: "01", name: "KINOMI", type: "Japanese learning · Mobile", tags: ["Flutter", "Dart", "Local data"], visual: "kinomi", description: "A focused vocabulary companion built around daily learning, spaced repetition, and recall." },
  { n: "02", name: "NEXA CHAT", type: "Realtime communication", tags: ["Flutter", "Agora", "Realtime"], visual: "nexa", description: "A social chat experience with live audio rooms and interactive party features." },
  { n: "03", name: "GREEDY CASINO", type: "Game · UI engineering", tags: ["Flutter", "Game logic", "Animation"], visual: "greedy", description: "A playful casino-style game interface with custom mechanics and visual assets." },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return <main>
    <ScrollScene />
    <header className="topbar">
      <Link href="#top" className="brand"><span className="brand-mark">&gt;_</span> BLADE.DEV</Link>
      <nav id="main-navigation" aria-label="Main navigation" className={menuOpen ? "nav-open" : ""}><a href="#work" onClick={closeMenu}><span>[01]</span> Work</a><a href="#about" onClick={closeMenu}><span>[02]</span> About</a><a href="#stack" onClick={closeMenu}><span>[03]</span> Stack</a><a href="#contact" onClick={closeMenu}><span>[04]</span> Contact</a></nav>
      <a className="resume-link" href="#contact">Contact <ArrowUpRight size={16}/></a>
      <button className="menu-button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(v => !v)}>{menuOpen ? "×" : "☰"}</button>
    </header>

    <section className="hero" id="top">
      <div className="corner corner-tl"/><div className="corner corner-tr"/><div className="corner corner-bl"/><div className="corner corner-br"/>
      <div className="hero-copy">
        <div className="role-label"><span>//</span> SOFTWARE DEVELOPER</div>
        <h1>Building digital<br/>products with<br/><em>code & curiosity.</em></h1>
        <p className="hero-description">I design, build, and ship products across mobile, web, and backend — with a focus on clean architecture, thoughtful UI, and real-world impact.</p>
        <div className="hero-actions"><a href="#work" className="button button-primary">[ View Work ] <ArrowRight size={17}/></a><a href="#contact" className="button button-outline">[ Get in Touch ]</a></div>
      </div>
      <Whale />
      <FloatingObjects />
      <AsciiTrail />
      <div className="hero-meta"><a href="#work" className="scroll-note"><span className="scroll-line"/>SCROLL<br/>TO EXPLORE</a><div className="availability"><i/> AVAILABLE FOR OPPORTUNITIES</div><div className="stack-strip">FLUTTER <b>/</b> NEXT.JS <b>/</b> TS <b>/</b> LARAVEL</div></div>
    </section>

    <section className="work-section section-shell" id="work">
      <div className="section-heading"><div><div className="eyebrow">// SELECTED WORK</div><h2>Things I’ve built.</h2></div><a href="#contact" className="text-link">[ View All Projects ] <ArrowRight size={16}/></a></div>
      <div className="project-grid">{projects.map((p, index) => <article className={`project-card project-card-${index + 1}`} key={p.n}>
        <div className={`project-art ${p.visual}`}><div className="project-number">{p.n} / 03</div><div className="art-label">{p.name}<span> / FEATURED PROJECT</span></div><div className="project-art-grid" aria-hidden="true"/><div className="project-orbit-mark" aria-hidden="true">{p.visual === "kinomi" ? "木" : p.visual === "nexa" ? "◉" : "✳"}</div>
          {p.visual === "kinomi" && <div className="phone-art"><div className="phone-notch"/><div className="phone-content"><span>木の実</span><small>今日のことば</small><strong>学習の進捗</strong><div className="progress-bars"><i/><i/><i/><i/><i/></div></div></div>}
          {p.visual === "nexa" && <div className="chat-art"><div className="chat-bubble">◌</div><div className="chat-line line-1"/><div className="chat-line line-2"/><div className="chat-line line-3"/><div className="chat-orbit">●　○　●</div></div>}
          {p.visual === "greedy" && <div className="game-art"><div className="game-crown">♛</div><strong>GREEDY</strong><small>CASINO</small><div className="game-slots">♣　♦　♥</div></div>}
        </div>
        <div className="project-info"><div className="project-index">SELECTED PROJECT / {p.n}</div><div className="project-title-row"><h3>{p.name}</h3><span className="project-type">{p.type}</span></div><p>{p.description}</p><div className="tags">{p.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-card-footer"><span>PROJECT SNAPSHOT</span><span className="project-arrow" aria-hidden="true">↗</span></div></div>
      </article>)}</div>
    </section>
    <section className="capabilities section-shell" id="stack">
      <div className="eyebrow">// TOOLKIT / CURRENT SKILL MAP</div>
      <div className="skills-heading"><div><h2>My stack is a<br/><em>work in progress.</em></h2><p className="skills-intro">Technologies I use to build, tools I’m getting sharper with, and areas I’m actively exploring.</p></div></div>
      <div className="skill-groups">
        <article className="skill-group skill-primary"><div className="skill-group-head"><span>01 / MOBILE</span><b>BUILDING</b></div><h3>Mobile development</h3><p>My strongest practical area: cross-platform apps, UI implementation, state management, and API integration.</p><div className="skill-chips"><span className="skill-chip featured">Flutter</span><span className="skill-chip featured">Dart</span><span className="skill-chip">flutter_bloc</span><span className="skill-chip">Dio</span><span className="skill-chip">Firebase</span><span className="skill-chip">Android</span></div></article>
        <article className="skill-group"><div className="skill-group-head"><span>02 / WEB</span><b>EXPANDING</b></div><h3>Frontend & web</h3><p>Building modern interfaces and learning the full web application workflow.</p><div className="skill-chips"><span className="skill-chip">React</span><span className="skill-chip featured">Next.js</span><span className="skill-chip">TypeScript</span><span className="skill-chip">Tailwind CSS</span></div></article>
        <article className="skill-group"><div className="skill-group-head"><span>03 / BACKEND</span><b>WORKING KNOWLEDGE</b></div><h3>Backend & data</h3><p>API-driven applications, backend integrations, and database-backed services.</p><div className="skill-chips"><span className="skill-chip">Laravel</span><span className="skill-chip">Node.js</span><span className="skill-chip">Express</span><span className="skill-chip">REST APIs</span><span className="skill-chip">PostgreSQL</span><span className="skill-chip">MongoDB</span><span className="skill-chip">Prisma</span></div></article>
        <article className="skill-group skill-learning"><div className="skill-group-head"><span>04 / EXPLORING</span><b>IN PROGRESS</b></div><h3>Next frontier</h3><p>Currently learning these to broaden my engineering foundation.</p><div className="skill-chips"><span className="skill-chip learning">Kotlin</span><span className="skill-chip learning">Jetpack Compose</span><span className="skill-chip learning">Python</span><span className="skill-chip learning">AI / ML</span></div></article>
      </div>
      <div className="skills-foot"><span>SKILL LEVELS ARE SELF-DESCRIBED</span><span>ALWAYS LEARNING <b>↗</b></span></div>
    </section>
    <section className="about-section section-shell" id="about">
      <div className="eyebrow">// ABOUT / THE JOURNEY</div>
      <div className="about-layout about-intro">
        <h2>Curious by default.<br/><em>Developer by choice.</em></h2>
        <p>I’m a software developer focused on building useful digital products. I started with mobile development and gradually moved into the wider product stack—interfaces, APIs, integrations, and the systems that connect them. I care about how things work, but also about how they feel to use.</p>
      </div>
      <div className="about-details-grid">
        <div className="about-focus"><div className="eyebrow">// CURRENT FOCUS</div><div className="focus-item"><span>01</span><div><strong>Product engineering</strong><p>Shipping practical features, refining UI, and improving app experiences.</p></div></div><div className="focus-item"><span>02</span><div><strong>Native Android</strong><p>Growing beyond cross-platform work and learning Kotlin / Jetpack Compose.</p></div></div><div className="focus-item"><span>03</span><div><strong>AI & machine learning</strong><p>Building foundations in Python, mathematics, and AI concepts.</p></div></div></div>
        <div className="about-timeline"><div className="eyebrow">// DEVELOPMENT LOG</div><div className="timeline-entry"><span className="timeline-marker">●</span><div className="timeline-meta">PROFESSIONAL EXPERIENCE</div><h3>Application Development</h3><p>Working on real applications, feature implementation, API integrations, debugging, and delivering updates in a team environment.</p></div><div className="timeline-entry"><span className="timeline-marker">●</span><div className="timeline-meta">BUILDING / INDEPENDENT</div><h3>Side projects & experiments</h3><p>Creating personal products and prototypes to explore app architecture, interaction design, realtime features, games, and new technologies.</p></div><div className="timeline-entry"><span className="timeline-marker">●</span><div className="timeline-meta">NOW / LEARNING</div><h3>Expanding the toolkit</h3><p>Exploring native Android development and steadily building toward deeper AI/ML engineering knowledge.</p></div></div>
      </div>
      <div className="about-footnote"><span>PROFILE: MULTI-DISCIPLINARY DEVELOPER</span><span>STATUS: ALWAYS LEARNING <b>↗</b></span></div>
    </section>
    <section className="contact-section section-shell" id="contact"><div className="eyebrow">// OPEN CHANNEL</div><h2>Have something<br/><em>interesting in mind?</em></h2><a className="contact-cta" href="mailto:hello@blade.dev">LET’S TALK <ArrowUpRight/></a><div className="contact-bottom"><div className="contact-status"><i/> OPEN TO OPPORTUNITIES</div><div className="socials"><a href="#contact" aria-label="GitHub link to be configured"><Github/></a><a href="#contact" aria-label="LinkedIn link to be configured"><Linkedin/></a><a href="mailto:hello@blade.dev" aria-label="Email"><Mail/></a></div></div></section>
    <footer><span>© {new Date().getFullYear()} BLADE.DEV</span><span>BUILT WITH CURIOSITY <span className="lime">✳</span></span><a href="#top">BACK TO TOP ↑</a></footer>
  </main>;
}
