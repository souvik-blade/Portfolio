"use client";

import { useState } from "react";
import { Terminal, Shield, Cpu, Sparkles, Send } from "lucide-react";

type CommandId = "whoami" | "architecture" | "stack" | "mission";

interface ConsoleCommand {
  id: CommandId;
  label: string;
  icon: typeof Terminal;
  desc: string;
  output: Array<{ label: string; value: string; highlight?: boolean }>;
}

const COMMANDS: ConsoleCommand[] = [
  {
    id: "whoami",
    label: "whoami",
    icon: Terminal,
    desc: "Identity & profile summary",
    output: [
      { label: "DEVELOPER", value: "Blade — Application & Systems Engineer", highlight: true },
      { label: "CORE_FOCUS", value: "Mobile (Flutter/Dart) + Modern Web (Next.js/React)" },
      { label: "CRAFT", value: "Bridging clean architecture with fluid, tactile UI" },
      { label: "PHILOSOPHY", value: "\"Structure without rigidity; curiosity without noise.\"" },
      { label: "AVAILABILITY", value: "Open for impactful engineering contracts & full-time roles", highlight: true },
    ],
  },
  {
    id: "architecture",
    label: "architecture",
    icon: Shield,
    desc: "Engineering standards & design flow",
    output: [
      { label: "PATTERN", value: "Feature-First Architecture (Decoupled, Testable, Scalable)" },
      { label: "STATE_FLOW", value: "Strict flutter_bloc / Cubits with immutable states", highlight: true },
      { label: "DATA_LAYER", value: "Dio client + interceptors + offline-first caching" },
      { label: "UI_DISCIPLINE", value: "Responsive LayoutBuilders, no hardcoded math, 60fps renders" },
      { label: "CODE_QUALITY", value: "Zero dead code, strict linting, zero-dependency bloat" },
    ],
  },
  {
    id: "stack",
    label: "stack",
    icon: Cpu,
    desc: "Active production toolkit",
    output: [
      { label: "MOBILE", value: "Flutter, Dart, flutter_bloc, Dio, Firebase, Android SDK", highlight: true },
      { label: "FRONTEND", value: "Next.js 15, React 19, TypeScript, Tailwind CSS, Canvas" },
      { label: "SERVICES", value: "Node.js, Laravel, REST APIs, WebSockets, PostgreSQL" },
      { label: "EXPLORING", value: "Native Kotlin, Jetpack Compose, AI Inference & Shaders" },
    ],
  },
  {
    id: "mission",
    label: "mission",
    icon: Sparkles,
    desc: "Work ethos & current directive",
    output: [
      { label: "DIRECTIVE", value: "Build software that feels fast, reliable, and deeply intuitive" },
      { label: "STANDARDS", value: "Production-ready, battle-tested, polished to the pixel" },
      { label: "NEXT_STEP", value: "Collaborate with high-conviction founders & ambitious teams", highlight: true },
      { label: "COMM_CHANNEL", value: "souviknayak1290@gmail.com (Direct channel open)" },
    ],
  },
];

export default function HeroConsole() {
  const [activeCmd, setActiveCmd] = useState<CommandId>("whoami");
  const current = COMMANDS.find((c) => c.id === activeCmd) || COMMANDS[0];

  return (
    <div className="hero-console-card" aria-label="Interactive developer identity console">
      {/* Console Window Header */}
      <div className="console-header">
        <div className="console-traffic-lights">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
          <span className="console-title">BLADE_SHELL // INTERACTIVE_BIO</span>
        </div>
        <div className="console-env-tag">ENV: PRODUCTION</div>
      </div>

      {/* Command Selector Tabs */}
      <div className="console-tabs" role="tablist" aria-label="Console prompts">
        {COMMANDS.map((cmd) => {
          const Icon = cmd.icon;
          const isActive = activeCmd === cmd.id;
          return (
            <button
              key={cmd.id}
              role="tab"
              aria-selected={isActive}
              className={`console-tab-btn ${isActive ? "active" : ""}`}
              onClick={() => setActiveCmd(cmd.id)}
            >
              <Icon size={12} />
              <span>&gt; {cmd.label}</span>
            </button>
          );
        })}
      </div>

      {/* Terminal Output Screen */}
      <div className="console-body">
        <div className="console-prompt-line">
          <span className="prompt-host">blade@system</span>
          <span className="prompt-path">:~$</span>
          <span className="prompt-cmd">run inspect --target={current.label}</span>
        </div>

        <div className="console-output-grid">
          {current.output.map((row, i) => (
            <div key={i} className={`console-row ${row.highlight ? "highlight" : ""}`}>
              <span className="row-key">[{row.label}]</span>
              <span className="row-val">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="console-footer-line">
          <span className="cursor-indicator" />
          <span className="console-hint">CLICK TABS ABOVE TO QUERY IDENTITY & SYSTEMS</span>
          <a href="#contact" className="console-action-link">
            <span>[ CONTACT BLADE ]</span> <Send size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}
