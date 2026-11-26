"use client";

interface ProjectBlueprintProps {
  id: "kinomi" | "nexa" | "greedy";
}

const SCHEMATICS = {
  kinomi: [
    "┌── SRS_ENGINE // KINOMI ──────────────┐",
    "│ [VOCAB_MATRIX]            KANJI: 木  │",
    "│ ░▒▓ RECALL INTERVALS: 1d 3d 7d 14d   │",
    "│ RETENTION_RATE [██████████░░] 84.6%  │",
    "│                                      │",
    "│ ┌─ DAILY DECK ─────────────────────┐ │",
    "│ │ > 今日 [kyou]       :: today     │ │",
    "│ │ > 記憶 [kioku]      :: memory    │ │",
    "│ │ > 継続 [keizoku]    :: persist   │ │",
    "│ └──────────────────────────────────┘ │",
    "│ SYNC: OFFLINE_FIRST  •  DB: ISAR/SQL │",
    "└──────────────────────────────────────┘",
  ],
  nexa: [
    "┌── RTC_STREAM // NEXA_AUDIO ──────────┐",
    "│ [AGORA_RTC_NODE]          CH: 0x9F4A │",
    "│ LATENCY: 28ms      BITRATE: 64kbps   │",
    "│ PEERS CONNECTED: 08/12               │",
    "│                                      │",
    "│ ┌─ SPECTRUM ANALYZER ──────────────┐ │",
    "│ │   ▄█ █▄  ▄▆ █  ▄█ █▄  ▄▆ █  ▄    │ │",
    "│ │ ▄███████████████████████████▄    │ │",
    "│ └──────────────────────────────────┘ │",
    "│ ROOM_KEY: SECURE   •  JITTER: 1.2ms  │",
    "└──────────────────────────────────────┘",
  ],
  greedy: [
    "┌── ENGINE // GREEDY_CASINO ───────────┐",
    "│ [STATE_MACHINE]           FPS: 60    │",
    "│ RNG_ALGO: CRYPTO_PRNG (VERIFIED)     │",
    "│ PAYOUT_MATRIX: 97.4% RTP             │",
    "│                                      │",
    "│ ┌─ REEL MECHANICS ─────────────────┐ │",
    "│ │  [ ♠ ACE ]  [ 777 ]  [ ♣ CLUB ]  │ │",
    "│ │  ── WIN LINE ACTIVATED ────────  │ │",
    "│ └──────────────────────────────────┘ │",
    "│ PARTICLES: ACTIVE  •  LOGIC: DART    │",
    "└──────────────────────────────────────┘",
  ],
};

export default function ProjectBlueprint({ id }: ProjectBlueprintProps) {
  const lines = SCHEMATICS[id] || SCHEMATICS.kinomi;

  return (
    <div className="project-blueprint-container" aria-hidden="true">
      <div className="blueprint-glow-grid" />
      <pre className="blueprint-ascii-code">
        {lines.map((line, i) => (
          <span key={i} className="blueprint-line">
            {line}
          </span>
        ))}
      </pre>
    </div>
  );
}
