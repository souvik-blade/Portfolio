"use client";

import { useState } from "react";
import Link from "next/link";
import KineticHeroField from "@/components/ascii/KineticHeroField";
import HeroConsole from "@/components/ascii/HeroConsole";
import ProjectBlueprint from "@/components/ascii/ProjectBlueprint";
import { ArrowUpRight, ArrowRight, Github, Linkedin, Mail, Copy, Check } from "lucide-react";

interface ProjectItem {
  n: string;
  id: "kinomi" | "nexa" | "greedy";
  name: string;
  type: string;
  status: string;
  tags: string[];
  description: string;
}

const projects: ProjectItem[] = [
  {
    n: "01",
    id: "kinomi",
    name: "KINOMI",
    type: "Japanese Learning · Mobile",
    status: "PROD // v1.2",
    tags: ["Flutter", "Dart", "Local Storage", "SRS Engine", "Offline First"],
    description:
      "A distraction-free vocabulary companion built around spaced repetition (SRS), custom kanji memory decks, and offline-first persistence.",
  },
  {
    n: "02",
    id: "nexa",
    name: "NEXA CHAT",
    type: "Realtime Communication",
    status: "BETA // v0.9",
    tags: ["Flutter", "Agora RTC", "WebSockets", "Audio Rooms", "State Management"],
    description:
      "A social audio experience supporting ultra-low latency voice rooms, synchronized interactive party games, and realtime presence tracking.",
  },
  {
    n: "03",
    id: "greedy",
    name: "GREEDY CASINO",
    type: "Game Engine · UI Mechanics",
    status: "ENGINE // ACTIVE",
    tags: ["Flutter", "Game Loop", "Custom Painter", "Sound FX", "State Machine"],
    description:
      "A stylized casino-inspired game interface engineered with deterministic math reels, custom particle animations, and high-frame-rate tactile UI.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("souviknayak1290@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {}
  };

  return (
    <main>
      {/* Top Header / Navigation */}
      <header className="topbar">
        <Link href="#top" className="brand">
          <span className="brand-mark">&gt;_</span> BLADE.DEV
          <span className="brand-badge">SYS: ONLINE</span>
        </Link>

        <nav id="main-navigation" aria-label="Main navigation" className={menuOpen ? "nav-open" : ""}>
          <a href="#work" onClick={closeMenu}>
            <span>[01]</span> Work
          </a>
          <a href="#stack" onClick={closeMenu}>
            <span>[02]</span> Stack
          </a>
          <a href="#about" onClick={closeMenu}>
            <span>[03]</span> About
          </a>
          <a href="#contact" onClick={closeMenu}>
            <span>[04]</span> Contact
          </a>
        </nav>

        <div className="topbar-actions">
          <div className="status-pill">
            <span className="status-dot" />
            <span>AVAILABLE FOR HIRE</span>
          </div>
          <a className="resume-btn" href="#contact">
            Contact <ArrowUpRight size={14} />
          </a>
          <button
            className="menu-button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
      </header>

      {/* Hero Section with Full-Bleed Kinetic Wave Landscape & Interactive Identity Console */}
      <section className="hero" id="top">
        {/* Full-bleed 3D kinetic ASCII wave field covering the entire hero backdrop */}
        <KineticHeroField />

        <div className="hero-grid">
          <div className="hero-copy">
            <div className="role-label">
              <span>{"//"}</span> {"BLADE — APPLICATION & SYSTEMS ENGINEER"}
            </div>
            <h1>
              Building digital
              <br />
              products with
              <br />
              <em>code & curiosity.</em>
            </h1>
            <p className="hero-description">
              Engineering cross-platform mobile experiences, high-performance web systems, and resilient architectures.
              Explore my technical identity, projects, and active development log below.
            </p>
            <div className="hero-actions">
              <a href="#work" className="button button-primary">
                [ View Selected Work ] <ArrowRight size={16} />
              </a>
              <a href="#contact" className="button button-outline">
                [ Initiate Contact ]
              </a>
            </div>
          </div>

          <div className="hero-console-col">
            {/* Interactive Developer Bio Console */}
            <HeroConsole />
          </div>
        </div>

        <div className="hero-meta">
          <a href="#work" className="scroll-indicator">
            <div className="scroll-dot-anim" />
            <span>{"SCROLL // EXPLORE CODEBASE"}</span>
          </a>
          <div className="stack-tags">
            <span>FLUTTER</span> <b>/</b>
            <span>NEXT.JS</span> <b>/</b>
            <span>TYPESCRIPT</span> <b>/</b>
            <span>DART</span> <b>/</b>
            <span>SYSTEMS</span>
          </div>
        </div>
      </section>

      {/* Selected Work Section with Monospace Blueprints */}
      <section className="work-section section-shell" id="work">
        <div className="section-heading">
          <div>
            <h2>Things I’ve built & shipped.</h2>
          </div>
          <a href="#contact" className="text-link">
            [ Inquire About More Projects ] <ArrowRight size={14} />
          </a>
        </div>

        <div className="project-grid">
          {projects.map((p) => (
            <article className="project-card" key={p.n}>
              <div className="project-art-panel">
                <div className="blueprint-meta-header">
                  <span>{"SCHEMATIC // ARCHITECTURE"}</span>
                  <span className="blueprint-badge">{p.status}</span>
                </div>
                <ProjectBlueprint id={p.id} />
              </div>

              <div className="project-info-panel">
                <div className="project-index-row">
                  <span className="project-index">{"SELECTED PROJECT // " + p.n}</span>
                  <span className="project-type-tag">{p.type}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="tags">
                  {p.tags.map((tag, idx) => (
                    <span key={tag} className={`tag-chip ${idx === 0 ? "primary" : ""}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-card-footer">
                  <span>VIEW ARCHITECTURE & DEMO</span>
                  <span className="project-arrow-icon">↗</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Toolkit / Skill Radar Section */}
      <section className="capabilities section-shell" id="stack">
        <div className="skills-intro-row">
          <div>
            <h2>
              Tools honed through
              <br />
              <em>production & curiosity.</em>
            </h2>
            <p className="skills-intro-copy">
              A transparent breakdown of my core technical stack, libraries I use daily, and emerging technologies I am
              actively building with.
            </p>
          </div>
          <div className="skills-telemetry-badge">
            <span>RADAR STATUS:</span>
            <b>ACTIVE LEARNING & PRODUCTION</b>
          </div>
        </div>

        <div className="skill-groups-grid">
          <article className="skill-card primary">
            <div className="skill-card-head">
              <span>{"01 // MOBILE & CROSS-PLATFORM"}</span>
              <span className="skill-status-tag">PRIMARY FOCUS</span>
            </div>
            <h3>Mobile Engineering</h3>
            <p>
              Deep practical experience building performant iOS & Android apps from architecture to app store deployment.
            </p>
            <div className="skill-chips-row">
              <span className="skill-pill featured">Flutter</span>
              <span className="skill-pill featured">Dart</span>
              <span className="skill-pill featured">flutter_bloc</span>
              <span className="skill-pill">Dio</span>
              <span className="skill-pill">Firebase</span>
              <span className="skill-pill">Android SDK</span>
              <span className="skill-pill">Clean Architecture</span>
            </div>
          </article>

          <article className="skill-card">
            <div className="skill-card-head">
              <span>{"02 // WEB & FRONTEND"}</span>
              <span className="skill-status-tag">EXPANDING</span>
            </div>
            <h3>Modern Web Interfaces</h3>
            <p>
              Crafting responsive, accessible, high-performance web applications with clean component hierarchy.
            </p>
            <div className="skill-chips-row">
              <span className="skill-pill featured">Next.js 15</span>
              <span className="skill-pill featured">React 19</span>
              <span className="skill-pill featured">TypeScript</span>
              <span className="skill-pill">Tailwind CSS</span>
              <span className="skill-pill">HTML5 Canvas</span>
            </div>
          </article>

          <article className="skill-card">
            <div className="skill-card-head">
              <span>{"03 // BACKEND & DATA"}</span>
              <span className="skill-status-tag">APPLIED KNOWLEDGE</span>
            </div>
            <h3>APIs & Persistence</h3>
            <p>
              Designing predictable REST endpoints, handling authentication flows, and modeling relational databases.
            </p>
            <div className="skill-chips-row">
              <span className="skill-pill">Node.js</span>
              <span className="skill-pill">Laravel</span>
              <span className="skill-pill">REST APIs</span>
              <span className="skill-pill">PostgreSQL</span>
              <span className="skill-pill">SQLite / Isar</span>
              <span className="skill-pill">WebSockets</span>
            </div>
          </article>

          <article className="skill-card">
            <div className="skill-card-head">
              <span>{"04 // NEXT FRONTIER"}</span>
              <span className="skill-status-tag">IN PROGRESS</span>
            </div>
            <h3>Emerging & Native</h3>
            <p>
              Currently expanding foundations in native Android engineering and exploring practical AI integration.
            </p>
            <div className="skill-chips-row">
              <span className="skill-pill exploring">Kotlin</span>
              <span className="skill-pill exploring">Jetpack Compose</span>
              <span className="skill-pill exploring">Python</span>
              <span className="skill-pill exploring">AI / LLM APIs</span>
            </div>
          </article>
        </div>
      </section>

      {/* About & Development Log */}
      <section className="about-section section-shell" id="about">
        <div className="about-intro-block">
          <h2>
            Curious by default.
            <br />
            <em>Engineer by discipline.</em>
          </h2>
          <p>
            I approach development as both an engineering discipline and a craft. Whether building clean state management
            pipelines in Flutter, optimizing canvas render loops, or wiring backend endpoints, I care about the
            subtle details that make software reliable, intuitive, and enjoyable to use.
          </p>
        </div>

        <div className="about-details-grid">
          <div className="about-focus-col">
            <div className="focus-cards">
              <div className="focus-card">
                <span className="focus-card-num">01</span>
                <div className="focus-card-body">
                  <strong>Production Architecture</strong>
                  <p>Building maintainable, decoupled feature-first applications with predictable state flows.</p>
                </div>
              </div>
              <div className="focus-card">
                <span className="focus-card-num">02</span>
                <div className="focus-card-body">
                  <strong>Native Android Ecosystem</strong>
                  <p>Expanding beyond cross-platform into modern Kotlin and declarative Jetpack Compose.</p>
                </div>
              </div>
              <div className="focus-card">
                <span className="focus-card-num">03</span>
                <div className="focus-card-body">
                  <strong>Creative Coding & Shaders</strong>
                  <p>Exploring procedural math, canvas graphics, and interactive real-time visual UI.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-timeline-col">
            <div className="timeline-entries">
              <div className="timeline-entry">
                <div className="timeline-dot" />
                <div className="timeline-header-meta">{"PROFESSIONAL WORK // APP ENGINEERING"}</div>
                <h3>Mobile Application Development</h3>
                <p>
                  Delivering production features, API integrations, architectural refactors, and debugging across teams
                  and release cycles.
                </p>
              </div>

              <div className="timeline-entry">
                <div className="timeline-dot" />
                <div className="timeline-header-meta">{"INDEPENDENT BUILDS // RESEARCH"}</div>
                <h3>Side Projects & Technical Experiments</h3>
                <p>
                  Prototyping realtime audio applications, game interaction loops, spaced repetition algorithms, and
                  custom visual UI.
                </p>
              </div>

              <div className="timeline-entry">
                <div className="timeline-dot" />
                <div className="timeline-header-meta">{"CONTINUOUS GROWTH // NOW"}</div>
                <h3>Deepening Native & Systems Knowledge</h3>
                <p>
                  Broadening practical engineering toolkit with Kotlin, full-stack Next.js, and backend architecture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section with Immediate Visual Feedback */}
      <section className="contact-section section-shell" id="contact">
        <h2>
          Have a project or
          <br />
          <em>role in mind?</em>
        </h2>

        <div className="contact-interactive-bar">
          <a className="contact-cta-btn" href="mailto:souviknayak1290@gmail.com">
            [ INITIATE CONVERSATION ] <ArrowUpRight size={18} />
          </a>
          <button
            className={`contact-copy-btn ${copied ? "copied" : ""}`}
            onClick={handleCopyEmail}
            aria-label="Copy email address"
          >
            {copied ? (
              <>
                <Check size={16} /> [ ✓ COPIED: souviknayak1290@gmail.com ]
              </>
            ) : (
              <>
                <Copy size={16} /> [ CLICK TO COPY: souviknayak1290@gmail.com ]
              </>
            )}
          </button>
        </div>

        <div className="contact-status-row">
          <div className="status-pill">
            <span className="status-dot" />
            <span>OPEN TO CONTRACTS & FULL-TIME ROLES</span>
          </div>
          <div className="social-links-row">
            <a href="https://github.com/souvik-blade" target="_blank" rel="noopener noreferrer" className="social-link">
              <Github size={15} /> <span>GITHUB</span>
            </a>
            <a href="https://www.linkedin.com/in/souviknayak1290/" target="_blank" rel="noopener noreferrer" className="social-link">
              <Linkedin size={15} /> <span>LINKEDIN</span>
            </a>
            <a href="mailto:souviknayak1290@gmail.com" className="social-link">
              <Mail size={15} /> <span>EMAIL</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <span>{"© " + new Date().getFullYear() + " BLADE.DEV // SOFTWARE ENGINEERING"}</span>
        <span>
          STATUS: PRODUCTION <span style={{ color: "var(--lime)" }}>●</span>
        </span>
        <a href="#top">[ BACK TO TOP ↑ ]</a>
      </footer>
    </main>
  );
}
