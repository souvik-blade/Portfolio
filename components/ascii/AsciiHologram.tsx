"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Globe, Box, Waves, Sparkles, RotateCw } from "lucide-react";

type HologramMode = "globe" | "core" | "wave" | "torus";

type Point3D = {
  x: number;
  y: number;
  z: number;
  nx: number;
  ny: number;
  nz: number;
  accent?: boolean;
};

const GLYPH_RAMP = " .·:+*░▒▓#@█";
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

// 1. Digital Globe with Lat/Lon rings & continents
function generateGlobe(): Point3D[] {
  const pts: Point3D[] = [];
  // Latitude & Longitude grid
  for (let lat = -Math.PI / 2 + 0.1; lat < Math.PI / 2; lat += 0.12) {
    for (let lon = 0; lon < Math.PI * 2; lon += 0.12) {
      const cosLat = Math.cos(lat);
      const sinLat = Math.sin(lat);
      const cosLon = Math.cos(lon);
      const sinLon = Math.sin(lon);
      const x = cosLat * cosLon;
      const y = sinLat;
      const z = cosLat * sinLon;

      // Simulated continent clusters using trigonometric noise
      const continent = Math.sin(lon * 3 + Math.cos(lat * 4)) * Math.cos(lat * 2) > 0.15;
      const isEquator = Math.abs(lat) < 0.08;
      const isMeridian = Math.abs(lon % (Math.PI / 2)) < 0.08;

      if (continent || isEquator || isMeridian || (Math.round(lat * 10 + lon * 10) % 7 === 0)) {
        pts.push({
          x: x * 1.15,
          y: y * 1.15,
          z: z * 1.15,
          nx: x,
          ny: y,
          nz: z,
          accent: continent || isEquator,
        });
      }
    }
  }

  // Orbiting satellite ring
  for (let a = 0; a < Math.PI * 2; a += 0.08) {
    const r = 1.75;
    const x = Math.cos(a) * r;
    const y = Math.sin(a * 2) * 0.35;
    const z = Math.sin(a) * r;
    pts.push({
      x,
      y,
      z,
      nx: x / r,
      ny: y,
      nz: z / r,
      accent: Math.sin(a * 4) > 0.85,
    });
  }
  return pts;
}

// 2. Nested Cybernetic Core (Cube inside Icosahedral Cage)
function generateCyberCore(): Point3D[] {
  const pts: Point3D[] = [];

  // Inner Solid Cube
  const n = 18;
  const faces = [
    { n: [0, 0, 1], fn: (u: number, v: number) => [u, v, 0.65] },
    { n: [0, 0, -1], fn: (u: number, v: number) => [u, v, -0.65] },
    { n: [1, 0, 0], fn: (u: number, v: number) => [0.65, u, v] },
    { n: [-1, 0, 0], fn: (u: number, v: number) => [-0.65, u, v] },
    { n: [0, 1, 0], fn: (u: number, v: number) => [u, 0.65, v] },
    { n: [0, -1, 0], fn: (u: number, v: number) => [u, -0.65, v] },
  ];

  for (const f of faces) {
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= n; j++) {
        if (i % 2 !== 0 && j % 2 !== 0 && i !== 0 && i !== n && j !== 0 && j !== n) continue;
        const u = -0.65 + (1.3 * i) / n;
        const v = -0.65 + (1.3 * j) / n;
        const [x, y, z] = f.fn(u, v);
        pts.push({
          x,
          y,
          z,
          nx: f.n[0],
          ny: f.n[1],
          nz: f.n[2],
          accent: i === 0 || i === n || j === 0 || j === n,
        });
      }
    }
  }

  // Outer Geodesic Halo
  for (let lat = -Math.PI / 2 + 0.15; lat < Math.PI / 2; lat += 0.22) {
    for (let lon = 0; lon < Math.PI * 2; lon += 0.22) {
      const R = 1.6;
      const x = Math.cos(lat) * Math.cos(lon) * R;
      const y = Math.sin(lat) * R;
      const z = Math.cos(lat) * Math.sin(lon) * R;
      pts.push({
        x,
        y,
        z,
        nx: x / R,
        ny: y / R,
        nz: z / R,
        accent: Math.sin(lon * 4 + lat * 2) > 0.7,
      });
    }
  }

  return pts;
}

// 3. Kinetic Perspective Wave Field
function generateWaveField(): Point3D[] {
  const pts: Point3D[] = [];
  const rows = 28;
  const cols = 28;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const x = -1.5 + (3.0 * j) / cols;
      const z = -1.5 + (3.0 * i) / rows;
      const dist = Math.hypot(x, z);
      const y = Math.sin(dist * 5) * 0.35;
      pts.push({
        x,
        y,
        z,
        nx: (x / (dist || 1)) * 0.5,
        ny: 0.8,
        nz: (z / (dist || 1)) * 0.5,
        accent: (i + j) % 8 === 0 || dist < 0.4,
      });
    }
  }
  return pts;
}

// 4. Quantum Torus
function generateQuantumTorus(): Point3D[] {
  const pts: Point3D[] = [];
  for (let u = 0; u < Math.PI * 2; u += 0.08) {
    for (let v = 0; v < Math.PI * 2; v += 0.12) {
      const R = 1.15;
      const r = 0.45;
      const x = (R + r * Math.cos(v)) * Math.cos(u);
      const y = r * Math.sin(v);
      const z = (R + r * Math.cos(v)) * Math.sin(u);
      pts.push({
        x,
        y,
        z,
        nx: Math.cos(v) * Math.cos(u),
        ny: Math.sin(v),
        nz: Math.cos(v) * Math.sin(u),
        accent: Math.sin(u * 5 + v * 3) > 0.92,
      });
    }
  }
  return pts;
}

const MODES: { id: HologramMode; label: string; icon: typeof Globe; tag: string }[] = [
  { id: "globe", label: "TERRA_GLOBE", icon: Globe, tag: "WORLDWIDE / CONNECTED" },
  { id: "core", label: "CYBER_CORE", icon: Box, tag: "GEODESIC / ARCHITECTURE" },
  { id: "wave", label: "KINETIC_WAVE", icon: Waves, tag: "SPECTRUM / REALTIME" },
  { id: "torus", label: "QUANTUM_RING", icon: Sparkles, tag: "TOPOLOGY / MATH" },
];

export default function AsciiHologram() {
  const [activeMode, setActiveMode] = useState<HologramMode>("globe");
  const [telemetry, setTelemetry] = useState({ pitch: 14, yaw: 32, fps: 60, status: "AUTORUN" });
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000, active: false });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotRef = useRef({ rx: 0.28, ry: 0.55, rz: 0 });
  const dragRef = useRef({ active: false, startX: 0, startY: 0, baseRx: 0.28, baseRy: 0.55 });
  const modelsRef = useRef<Record<HologramMode, Point3D[]>>({
    globe: [],
    core: [],
    wave: [],
    torus: [],
  });

  useEffect(() => {
    modelsRef.current = {
      globe: generateGlobe(),
      core: generateCyberCore(),
      wave: generateWaveField(),
      torus: generateQuantumTorus(),
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      baseRx: rotRef.current.rx,
      baseRy: rotRef.current.ry,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      });
    }

    if (!dragRef.current.active) return;
    const dx = (e.clientX - dragRef.current.startX) * 0.007;
    const dy = (e.clientY - dragRef.current.startY) * 0.007;
    rotRef.current.ry = dragRef.current.baseRy + dx;
    rotRef.current.rx = clamp(dragRef.current.baseRx - dy, -Math.PI / 2.2, Math.PI / 2.2);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    dragRef.current.active = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerLeave = () => {
    dragRef.current.active = false;
    setCursorPos({ x: -1000, y: -1000, active: false });
  };

  const resetView = useCallback(() => {
    rotRef.current = { rx: 0.28, ry: 0.55, rz: 0 };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = performance.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const render = (time: number) => {
      const dt = (time - lastTime) * 0.001;
      lastTime = time;

      // Telemetry update
      frameCount++;
      if (time - fpsTimer > 500) {
        const curFps = Math.round((frameCount * 1000) / (time - fpsTimer));
        frameCount = 0;
        fpsTimer = time;
        const pDeg = Math.round((rotRef.current.rx * 180) / Math.PI);
        const yDeg = Math.round(((rotRef.current.ry * 180) / Math.PI) % 360);
        setTelemetry({
          pitch: pDeg,
          yaw: yDeg,
          fps: Math.min(60, curFps),
          status: dragRef.current.active ? "USER_INPUT" : "AUTOPILOT",
        });
      }

      // Idle Rotation
      if (!dragRef.current.active && !reducedMotion) {
        rotRef.current.ry += dt * (activeMode === "wave" ? 0.25 : 0.42);
        if (activeMode === "core") rotRef.current.rz += dt * 0.15;
      }

      const w = container.clientWidth;
      const h = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Render 3D points to ASCII
      const pts = modelsRef.current[activeMode] || [];
      const scale = Math.min(w, h) * (activeMode === "wave" ? 0.32 : 0.27);
      const cx = w / 2;
      const cy = h / 2;

      const rx = rotRef.current.rx;
      const ry = rotRef.current.ry;
      const rz = rotRef.current.rz;

      const cX = Math.cos(rx);
      const sX = Math.sin(rx);
      const cY = Math.cos(ry);
      const sY = Math.sin(ry);
      const cZ = Math.cos(rz);
      const sZ = Math.sin(rz);

      const fontSize = Math.max(7, Math.min(10, w / 64));
      ctx.font = `${fontSize}px "IBM Plex Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        let py0 = p.y;

        // Wave displacement animation
        if (activeMode === "wave" && !reducedMotion) {
          const dist = Math.hypot(p.x, p.z);
          py0 = Math.sin(dist * 4 - time * 0.003) * 0.3;
        }

        // Rotate X -> Y -> Z
        const y1 = py0 * cX - p.z * sX;
        const z1 = py0 * sX + p.z * cX;

        const x2 = p.x * cY + z1 * sY;
        const z2 = -p.x * sY + z1 * cY;

        const x3 = x2 * cZ - y1 * sZ;
        const y3 = x2 * sZ + y1 * cZ;

        const perspective = 3.6 / (3.6 + z2);
        const px = cx + x3 * scale * perspective;
        const py = cy + y3 * scale * perspective;

        if (px < 0 || px > w || py < 0 || py > h) continue;

        // Dynamic light normal calculation
        const nx1 = p.nx * cY + p.nz * sY;
        const nz1 = -p.nx * sY + p.nz * cY;
        const nx2 = nx1 * cZ - p.ny * sZ;
        const ny2 = nx1 * sZ + p.ny * cZ;

        const light = clamp(nx2 * -0.4 + ny2 * -0.35 + nz1 * 0.85, 0, 1);
        const depthShade = clamp((z2 + 1) * 0.22, 0, 0.4);

        // Proximity flare to user cursor
        let mouseBoost = 0;
        if (cursorPos.active) {
          const mDist = Math.hypot(px - cursorPos.x, py - cursorPos.y);
          if (mDist < 75) {
            mouseBoost = (1 - mDist / 75) * 0.55;
          }
        }

        const shadeIdx = Math.floor(clamp((light + mouseBoost) * 10 + depthShade * 4, 0, GLYPH_RAMP.length - 1));
        const glyph = GLYPH_RAMP[shadeIdx];
        if (glyph === " ") continue;

        const isAccent = p.accent || mouseBoost > 0.25;
        const alpha = clamp(0.2 + (light + mouseBoost) * 0.7 + depthShade, 0.15, 0.98);

        ctx.fillStyle = isAccent ? `rgba(215,255,100,${alpha})` : `rgba(228,234,230,${alpha * 0.75})`;
        ctx.fillText(glyph, px, py);
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [activeMode, cursorPos]);

  const activeMeta = MODES.find((m) => m.id === activeMode) || MODES[0];

  return (
    <div className="ascii-hologram-card" ref={containerRef} aria-label="3D Interactive ASCII Hologram">
      {/* Top HUD Header */}
      <div className="hologram-top-bar">
        <div className="hologram-mode-title">
          <span className="hologram-live-beacon" />
          <span className="hologram-tag">HOLOGRAM // 3D_MATRIX</span>
          <span className="hologram-subtag">[{activeMeta.tag}]</span>
        </div>
        <div className="hologram-nav-tabs">
          {MODES.map((m) => {
            const Icon = m.icon;
            const isSel = activeMode === m.id;
            return (
              <button
                key={m.id}
                role="tab"
                aria-selected={isSel}
                className={`hologram-tab-pill ${isSel ? "active" : ""}`}
                onClick={() => setActiveMode(m.id)}
              >
                <Icon size={11} />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Canvas Display Stage */}
      <div
        className="hologram-canvas-stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      >
        <canvas ref={canvasRef} className="hologram-canvas" aria-label={`3D ASCII render of ${activeMode}`} />

        {/* Tactical Crosshairs & Corner Brackets */}
        <div className="holo-bracket holo-tl" />
        <div className="holo-bracket holo-tr" />
        <div className="holo-bracket holo-bl" />
        <div className="holo-bracket holo-br" />

        <div className="hologram-tactile-hint">
          <span>DRAG TO RE-ORIENT // HOVER FOR MAGNETIC FLARE</span>
        </div>
      </div>

      {/* Telemetry Footer */}
      <div className="hologram-telemetry-bar">
        <div className="telemetry-readouts">
          <span>
            PITCH: <b>{telemetry.pitch > 0 ? `+${telemetry.pitch}` : telemetry.pitch}°</b>
          </span>
          <span>
            YAW: <b>{telemetry.yaw}°</b>
          </span>
          <span>
            FPS: <b>{telemetry.fps}</b>
          </span>
          <span className="telemetry-mode">
            STATE: <b>{telemetry.status}</b>
          </span>
        </div>
        <button className="hologram-reset-action" onClick={resetView} title="Reset camera coordinates">
          <RotateCw size={11} /> [ RESET VIEW ]
        </button>
      </div>
    </div>
  );
}
