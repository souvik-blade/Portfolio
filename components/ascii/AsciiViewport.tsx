"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Point = {
  x: number;
  y: number;
  z: number;
  nx: number;
  ny: number;
  nz: number;
  accent?: boolean;
};

type ModelKind = "torus" | "saturn" | "cube" | "whale";

const SHADES = " .,:;irsXA253hMHGS#9B&@";
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

function makeTorus(): Point[] {
  const pts: Point[] = [];
  for (let u = 0; u < Math.PI * 2; u += 0.08) {
    for (let v = 0; v < Math.PI * 2; v += 0.12) {
      const R = 1.15;
      const r = 0.42;
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
        accent: Math.sin(u * 6 + v * 3) > 0.94,
      });
    }
  }
  return pts;
}

function makeSaturn(): Point[] {
  const pts: Point[] = [];
  // Spherical planet body
  for (let lat = -Math.PI / 2 + 0.1; lat < Math.PI / 2; lat += 0.14) {
    for (let lon = 0; lon < Math.PI * 2; lon += 0.14) {
      const x = Math.cos(lat) * Math.cos(lon) * 0.58;
      const y = Math.sin(lat) * 0.58;
      const z = Math.cos(lat) * Math.sin(lon) * 0.58;
      pts.push({ x, y, z, nx: x, ny: y, nz: z });
    }
  }
  // Concentric tilted rings with Cassini-like gap
  for (let a = 0; a < Math.PI * 2; a += 0.038) {
    for (let r = 0.82; r < 1.72; r += 0.045) {
      if (r > 1.22 && r < 1.34) continue;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      pts.push({
        x,
        y: 0,
        z,
        nx: 0,
        ny: 1,
        nz: 0,
        accent: Math.sin(a * 10) > 0.94 || r > 1.6,
      });
    }
  }
  return pts;
}

function makeCube(): Point[] {
  const pts: Point[] = [];
  const n = 28;
  const faces: Array<{ normal: [number, number, number]; point: (a: number, b: number) => [number, number, number] }> = [
    { normal: [0, 0, 1], point: (a, b) => [a, b, 1] },
    { normal: [0, 0, -1], point: (a, b) => [a, b, -1] },
    { normal: [1, 0, 0], point: (a, b) => [1, a, b] },
    { normal: [-1, 0, 0], point: (a, b) => [-1, a, b] },
    { normal: [0, 1, 0], point: (a, b) => [a, 1, b] },
    { normal: [0, -1, 0], point: (a, b) => [a, -1, b] },
  ];
  for (const face of faces) {
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= n; j++) {
        const a = -1 + (2 * i) / n;
        const b = -1 + (2 * j) / n;
        // Keep wireframe edges and sparse grid
        if (i % 3 !== 0 && j % 3 !== 0 && i !== 0 && i !== n && j !== 0 && j !== n) continue;
        const [x, y, z] = face.point(a, b);
        const [nx, ny, nz] = face.normal;
        pts.push({ x, y, z, nx, ny, nz, accent: (i + j) % 11 === 0 });
      }
    }
  }
  return pts;
}

const WHALE_SHAPE = [
  "                              .---.      ",
  "                     .-..    (     )     ",
  "               .--.  /  /   (       )     ",
  "         .----/   /  /___/         )      ",
  "     .--/   _/                    _  )    ",
  " ___/      /                    _/ (      ",
  "/         /      .--.          _/   (     ",
  "|         /      /    (________/      (    ",
  "|        /      /                       (___",
  " (      (____/                           (  ",
  "  (                                         ",
  "   (____                           ___.---'",
  "        (__________________________/       ",
];

const MODELS: { id: ModelKind; label: string; desc: string; count: number }[] = [
  { id: "torus", label: "[01] TORUS", desc: "Topology / Ring mesh", count: 1250 },
  { id: "saturn", label: "[02] SATURN", desc: "Sphere + Ring accretion", count: 1680 },
  { id: "cube", label: "[03] CUBE", desc: "Wireframe matrix", count: 960 },
  { id: "whale", label: "[04] CETACEAN", desc: "Whale / Organic wave", count: 320 },
];

export default function AsciiViewport() {
  const [activeModel, setActiveModel] = useState<ModelKind>("torus");
  const [telemetry, setTelemetry] = useState({ pitch: 18, yaw: 42, fps: 60, status: "RUNNING" });
  const [isInteracting, setIsInteracting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotRef = useRef({ rx: 0.35, ry: 0.8, rz: 0 });
  const dragRef = useRef({ active: false, startX: 0, startY: 0, baseRx: 0.35, baseRy: 0.8 });
  const modelDataRef = useRef<{ torus: Point[]; saturn: Point[]; cube: Point[] }>({
    torus: [],
    saturn: [],
    cube: [],
  });

  useEffect(() => {
    modelDataRef.current = {
      torus: makeTorus(),
      saturn: makeSaturn(),
      cube: makeCube(),
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
    setIsInteracting(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = (e.clientX - dragRef.current.startX) * 0.008;
    const dy = (e.clientY - dragRef.current.startY) * 0.008;
    rotRef.current.ry = dragRef.current.baseRy + dx;
    rotRef.current.rx = clamp(dragRef.current.baseRx - dy, -Math.PI / 2, Math.PI / 2);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    dragRef.current.active = false;
    setIsInteracting(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handleReset = useCallback(() => {
    rotRef.current = { rx: 0.35, ry: 0.8, rz: 0 };
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

      // FPS calculation
      frameCount++;
      if (time - fpsTimer > 600) {
        const curFps = Math.round((frameCount * 1000) / (time - fpsTimer));
        frameCount = 0;
        fpsTimer = time;
        const pDeg = Math.round((rotRef.current.rx * 180) / Math.PI);
        const yDeg = Math.round(((rotRef.current.ry * 180) / Math.PI) % 360);
        setTelemetry({
          pitch: pDeg,
          yaw: yDeg,
          fps: Math.min(60, curFps),
          status: dragRef.current.active ? "TRACKING" : "IDLE",
        });
      }

      // Auto rotation when not dragging
      if (!dragRef.current.active && !reducedMotion) {
        rotRef.current.ry += dt * 0.45;
        if (activeModel === "cube") rotRef.current.rz += dt * 0.2;
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

      // Render 2D Whale special case
      if (activeModel === "whale") {
        const scale = Math.min(w / 46, h / 16) * 0.85;
        const charW = scale * 0.58;
        const charH = scale;
        const totalW = Math.max(...WHALE_SHAPE.map((r) => r.length)) * charW;
        const totalH = WHALE_SHAPE.length * charH;
        const startX = (w - totalW) / 2;
        const startY = (h - totalH) / 2 + (reducedMotion ? 0 : Math.sin(time * 0.0012) * 8);

        ctx.font = `${Math.max(9, charH * 0.95)}px "IBM Plex Mono", monospace`;
        ctx.textBaseline = "top";

        WHALE_SHAPE.forEach((row, y) => {
          [...row].forEach((char, x) => {
            if (char === " ") return;
            const wave = reducedMotion ? 0 : Math.sin(time * 0.002 + x * 0.16 + y * 0.28) * 0.4;
            const depth = Math.max(0, Math.min(1, (x + y * 0.5) / 44));
            const isLime = (x * 7 + y * 13) % 27 === 0;
            const alpha = clamp(0.35 + depth * 0.6 + wave * 0.2, 0.2, 0.95);

            ctx.fillStyle = isLime ? `rgba(215,255,100,${alpha})` : `rgba(235,240,236,${alpha * 0.85})`;
            ctx.fillText(char, startX + x * charW, startY + y * charH + wave * 4);
          });
        });
      } else {
        // 3D Object rendering (Torus, Saturn, Cube)
        const pts = modelDataRef.current[activeModel] || [];
        const scale = Math.min(w, h) * (activeModel === "cube" ? 0.24 : 0.28);
        const cx = w / 2;
        const cy = h / 2;

        const rx = rotRef.current.rx;
        const ry = rotRef.current.ry;
        const rz = activeModel === "saturn" ? -0.38 : rotRef.current.rz;

        const cX = Math.cos(rx);
        const sX = Math.sin(rx);
        const cY = Math.cos(ry);
        const sY = Math.sin(ry);
        const cZ = Math.cos(rz);
        const sZ = Math.sin(rz);

        const fontSize = Math.max(7, Math.min(10, w / 65));
        ctx.font = `${fontSize}px "IBM Plex Mono", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (const p of pts) {
          // Rotate X -> Y -> Z
          const y1 = p.y * cX - p.z * sX;
          const z1 = p.y * sX + p.z * cX;

          const x2 = p.x * cY + z1 * sY;
          const z2 = -p.x * sY + z1 * cY;

          const x3 = x2 * cZ - y1 * sZ;
          const y3 = x2 * sZ + y1 * cZ;

          const perspective = 3.6 / (3.6 + z2);
          const px = cx + x3 * scale * perspective;
          const py = cy + y3 * scale * perspective;

          if (px < 0 || px > w || py < 0 || py > h) continue;

          // Normal rotation for lighting calculation
          const nx1 = p.nx * cY + p.nz * sY;
          const nz1 = -p.nx * sY + p.nz * cY;
          const nx2 = nx1 * cZ - p.ny * sZ;
          const ny2 = nx1 * sZ + p.ny * cZ;

          const light = clamp(nx2 * -0.4 + ny2 * -0.35 + nz1 * 0.85, 0, 1);
          const depthShade = clamp((z2 + 1) * 0.2, 0, 0.4);
          const shadeIdx = Math.floor(clamp(light * 18 + depthShade * 5, 0, SHADES.length - 1));
          const glyph = SHADES[shadeIdx];
          if (glyph === " ") continue;

          const isAccent = p.accent;
          const alpha = clamp(0.22 + light * 0.65 + depthShade, 0.15, 0.95);

          ctx.fillStyle = isAccent ? `rgba(215,255,100,${alpha})` : `rgba(226,233,228,${alpha * 0.8})`;
          ctx.fillText(glyph, px, py);
        }
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [activeModel]);

  return (
    <div className="ascii-viewport-frame" ref={containerRef}>
      {/* Top HUD bar */}
      <div className="viewport-hud-header">
        <div className="hud-title">
          <span className="hud-indicator active" />
          <span className="hud-tag">VIEWPORT // 3D_LAB</span>
        </div>
        <div className="hud-model-tabs" role="tablist" aria-label="3D Model Selection">
          {MODELS.map((m) => (
            <button
              key={m.id}
              role="tab"
              aria-selected={activeModel === m.id}
              className={`hud-tab-btn ${activeModel === m.id ? "active" : ""}`}
              onClick={() => setActiveModel(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main interactive canvas stage */}
      <div
        className={`viewport-canvas-stage ${isInteracting ? "interacting" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <canvas ref={canvasRef} className="viewport-canvas" aria-label={`3D ASCII render of ${activeModel}`} />

        {/* Framing crosshairs & watermark */}
        <div className="viewport-crosshair crosshair-tl" />
        <div className="viewport-crosshair crosshair-tr" />
        <div className="viewport-crosshair crosshair-bl" />
        <div className="viewport-crosshair crosshair-br" />

        <div className="viewport-overlay-hint">
          <span>DRAG TO ROTATE / HOVER TO INSPECT</span>
        </div>
      </div>

      {/* Bottom HUD telemetry */}
      <div className="viewport-hud-footer">
        <div className="telemetry-readout">
          <span>
            PITCH: <b>{telemetry.pitch > 0 ? `+${telemetry.pitch}` : telemetry.pitch}°</b>
          </span>
          <span>
            YAW: <b>{telemetry.yaw}°</b>
          </span>
          <span>
            FPS: <b>{telemetry.fps}</b>
          </span>
          <span className="telemetry-status">
            STATUS: <b>{telemetry.status}</b>
          </span>
        </div>
        <button className="viewport-reset-btn" onClick={handleReset} title="Reset camera angle">
          [ ⟲ RESET VIEW ]
        </button>
      </div>
    </div>
  );
}
