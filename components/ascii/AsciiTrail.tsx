"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; glyph: string; size: number; lime: boolean;
};

const GLYPHS = ["·", ".", ":", "+", "*", "░", "▒", "╱", "╲", "⌁", "∘", "°"];

export default function AsciiTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !hero || !ctx) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reducedMotion || coarse) return;

    let particles: Particle[] = [];
    let raf = 0;
    let lastX = -1000, lastY = -1000;
    let lastEmit = 0;
    const resize = () => {
      const rect = hero.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const emit = (x: number, y: number, now: number) => {
      if (now - lastEmit < 12) return;
      lastEmit = now;
      const dx = x - lastX, dy = y - lastY;
      const speed = Math.min(3.8, Math.hypot(dx, dy) * 0.08);
      const count = Math.min(4, 1 + Math.floor(speed));
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const impulse = 0.25 + Math.random() * 1.35;
        particles.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: -dx * 0.018 + Math.cos(angle) * impulse,
          vy: -dy * 0.018 + Math.sin(angle) * impulse,
          life: 34 + Math.random() * 32,
          maxLife: 66,
          glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          size: 9 + Math.random() * 5,
          lime: Math.random() < 0.23,
        });
      }
      lastX = x; lastY = y;
      if (particles.length > 180) particles.splice(0, particles.length - 180);
    };
    const onPointer = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      emit(e.clientX - rect.left, e.clientY - rect.top, performance.now());
    };
    const onLeave = () => { lastX = lastY = -1000; };
    hero.addEventListener("pointermove", onPointer, { passive: true });
    hero.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);
    resize();
    const draw = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      particles = particles.filter(p => p.life > 0);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.985; p.vy *= 0.985;
        p.vy += 0.008;
        p.life -= 1;
        const alpha = Math.max(0, p.life / p.maxLife) * 0.72;
        ctx.font = `${p.size}px "IBM Plex Mono", monospace`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillStyle = p.lime ? `rgba(215,255,100,${alpha})` : `rgba(226,232,228,${alpha})`;
        ctx.fillText(p.glyph, p.x, p.y);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("pointermove", onPointer);
      hero.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={canvasRef} className="ascii-trail-canvas" aria-hidden="true" />;
}
