"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; z: number; nx: number; ny: number; nz: number; accent?: boolean };
type SceneObject = { points: Point[]; kind: "torus" | "sphere" | "cube" | "saturn"; x: number; y: number; size: number; lime: boolean; phase: number; drift: number; speed: number };

const SHADES = " .,:;irsXA253hMHGS#9B&@";
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

function makeSphere(): Point[] {
  const pts: Point[] = [];
  for (let lat = -Math.PI / 2 + 0.08; lat < Math.PI / 2; lat += 0.105) {
    for (let lon = 0; lon < Math.PI * 2; lon += 0.105) {
      const x = Math.cos(lat) * Math.cos(lon), y = Math.sin(lat), z = Math.cos(lat) * Math.sin(lon);
      pts.push({ x, y, z, nx: x, ny: y, nz: z, accent: (Math.floor((lon + lat) * 8) % 23 === 0) });
    }
  }
  return pts;
}

function makeTorus(): Point[] {
  const pts: Point[] = [];
  for (let u = 0; u < Math.PI * 2; u += 0.075) for (let v = 0; v < Math.PI * 2; v += 0.115) {
    const R = 1, r = 0.36, x = (R + r * Math.cos(v)) * Math.cos(u), y = r * Math.sin(v), z = (R + r * Math.cos(v)) * Math.sin(u);
    pts.push({ x, y, z, nx: Math.cos(v) * Math.cos(u), ny: Math.sin(v), nz: Math.cos(v) * Math.sin(u), accent: Math.sin(u * 5 + v * 2) > 0.96 });
  }
  return pts;
}

function makeCube(): Point[] {
  const pts: Point[] = [], n = 34;
  const faces: Array<{ normal: [number, number, number]; point: (a: number, b: number) => [number, number, number] }> = [
    { normal: [0, 0, 1], point: (a, b) => [a, b, 1] }, { normal: [0, 0, -1], point: (a, b) => [a, b, -1] },
    { normal: [1, 0, 0], point: (a, b) => [1, a, b] }, { normal: [-1, 0, 0], point: (a, b) => [-1, a, b] },
    { normal: [0, 1, 0], point: (a, b) => [a, 1, b] }, { normal: [0, -1, 0], point: (a, b) => [a, -1, b] },
  ];
  for (const face of faces) for (let i = 0; i <= n; i++) for (let j = 0; j <= n; j++) {
    const a = -1 + 2 * i / n, b = -1 + 2 * j / n;
    // Use a sparse grid with extra density at the edges, preserving a wireframe-like look.
    if (i % 3 !== 0 && j % 3 !== 0 && i !== 0 && i !== n && j !== 0 && j !== n) continue;
    const [x, y, z] = face.point(a, b), [nx, ny, nz] = face.normal;
    pts.push({ x, y, z, nx, ny, nz, accent: (i + j) % 13 === 0 });
  }
  return pts;
}

function makeSaturn(): Point[] {
  const pts: Point[] = [];
  // Spherical body.
  for (let lat = -Math.PI / 2 + 0.08; lat < Math.PI / 2; lat += 0.13) for (let lon = 0; lon < Math.PI * 2; lon += 0.13) {
    const x = Math.cos(lat) * Math.cos(lon), y = Math.sin(lat), z = Math.cos(lat) * Math.sin(lon);
    pts.push({ x: x * 0.52, y: y * 0.52, z: z * 0.52, nx: x, ny: y, nz: z });
  }
  // Tilted ring plane around the planet. A small gap separates the rings.
  for (let a = 0; a < Math.PI * 2; a += 0.035) for (let r = 0.72; r < 1.62; r += 0.035) {
    if (r > 1.16 && r < 1.28) continue;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    pts.push({ x, y: 0, z, nx: 0, ny: 1, nz: 0, accent: Math.sin(a * 12) > 0.96 || r > 1.45 });
  }
  return pts;
}

const objects: SceneObject[] = [
  { points: makeTorus(), kind: "torus", x: 0.77, y: 0.25, size: 52, lime: true, phase: 0.8, drift: 8, speed: 0.72 },
  { points: makeSphere(), kind: "sphere", x: 0.88, y: 0.76, size: 31, lime: false, phase: 2.4, drift: 12, speed: 0.42 },
  { points: makeCube(), kind: "cube", x: 0.12, y: 0.72, size: 28, lime: true, phase: 4.1, drift: 10, speed: 0.94 },
  { points: makeSaturn(), kind: "saturn", x: 0.13, y: 0.19, size: 35, lime: true, phase: 1.6, drift: 6, speed: 0.34 },
];

export default function FloatingObjects() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    let raf = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pointerX = 0, pointerY = 0, sx = 0, sy = 0;
    const pointer = (e: PointerEvent) => { pointerX = (e.clientX / window.innerWidth - 0.5) * 2; pointerY = (e.clientY / window.innerHeight - 0.5) * 2; };
    const leave = () => { pointerX = pointerY = 0; };
    window.addEventListener("pointermove", pointer, { passive: true }); window.addEventListener("pointerleave", leave);
    const render = (time: number) => {
      const w = canvas.clientWidth, h = canvas.clientHeight, dpr = Math.min(window.devicePixelRatio || 1, 1.65);
      if (!w || !h) { raf = requestAnimationFrame(render); return; }
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      sx += (pointerX - sx) * 0.035; sy += (pointerY - sy) * 0.035;
      const fontSize = Math.max(6, Math.min(10.5, w / 170));
      ctx.font = `${fontSize}px "IBM Plex Mono", monospace`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      for (const obj of objects) {
        const seconds = time * 0.001;
        const t = reduced ? 0 : seconds * obj.speed;
        const driftX = reduced ? 0 : Math.sin(seconds * 0.44 + obj.phase) * obj.drift;
        const driftY = reduced ? 0 : Math.cos(seconds * 0.58 + obj.phase) * obj.drift * 0.68;
        const rx = t * (obj.kind === "cube" ? 0.9 : 0.48) + sy * 0.16;
        const ry = t * (obj.kind === "torus" ? 1.12 : obj.kind === "saturn" ? 0.45 : 0.7) + sx * 0.16;
        const rz = obj.kind === "cube" ? t * 0.55 + sx * 0.1 : obj.kind === "saturn" ? -0.42 : 0;
        const cx = w * obj.x + driftX + sx * 7, cy = h * obj.y + driftY + sy * 7;
        const scale = obj.size * (w < 760 ? 0.64 : 1);
        const cX = Math.cos(rx), sX = Math.sin(rx), cY = Math.cos(ry), sY = Math.sin(ry), cZ = Math.cos(rz), sZ = Math.sin(rz);
        for (const p of obj.points) {
          // Rotate object point X -> Y -> Z.
          const y1 = p.y * cX - p.z * sX, z1 = p.y * sX + p.z * cX;
          const x2 = p.x * cY + z1 * sY, z2 = -p.x * sY + z1 * cY;
          const x3 = x2 * cZ - y1 * sZ, y3 = x2 * sZ + y1 * cZ;
          const perspective = 3.5 / (3.5 + z2);
          const px = cx + x3 * scale * perspective, py = cy + y3 * scale * perspective;
          if (px < -20 || px > w + 20 || py < -20 || py > h + 20) continue;
          const nx1 = p.nx * cY + p.nz * sY, nz1 = -p.nx * sY + p.nz * cY;
          const nx2 = nx1 * cZ - p.ny * sZ, ny2 = nx1 * sZ + p.ny * cZ;
          const light = clamp(nx2 * -0.45 + ny2 * -0.3 + nz1 * 0.82, 0, 1);
          const depthShade = clamp((z2 + 1) * 0.22, 0, 0.38);
          const shade = Math.floor(clamp(light * 19 + depthShade * 6, 0, SHADES.length - 1));
          const glyph = SHADES[shade]; if (glyph === " ") continue;
          const accent = obj.lime && (p.accent || ((Math.round(p.x * 19 + p.y * 31 + p.z * 23) % 29) === 0));
          const alpha = clamp(0.18 + light * 0.65 + depthShade, 0.12, 0.92);
          ctx.fillStyle = accent ? `rgba(215,255,100,${alpha})` : `rgba(225,231,226,${alpha})`;
          ctx.fillText(glyph, px, py);
        }
      }
      if (!reduced) raf = requestAnimationFrame(render);
    };
    render(0);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", pointer); window.removeEventListener("pointerleave", leave); };
  }, []);
  return <canvas ref={ref} className="ascii-float-canvas" aria-hidden="true" />;
}
