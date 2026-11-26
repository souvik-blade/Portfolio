"use client";
import { useEffect, useRef } from "react";

/** Ambient scroll-reactive glyph field. It lives behind page content and subtly
 * changes density, drift, and accent intensity as the visitor moves through sections. */
export default function ScrollScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 760px)").matches;
    if (reduced || small) return;
    let raf = 0, w = 0, h = 0, scroll = 0, last = 0;
    const glyphs = "·.:+*░▒▓╱╲╳⌁";
    const particles = Array.from({ length: 90 }, (_, i) => ({
      x: Math.random(), y: Math.random(), speed: .08 + Math.random() * .22,
      glyph: glyphs[Math.floor(Math.random() * glyphs.length)], phase: Math.random() * Math.PI * 2,
      accent: i % 13 === 0, size: 9 + Math.random() * 5,
    }));
    const resize = () => { w = canvas.width = window.innerWidth * devicePixelRatio; h = canvas.height = window.innerHeight * devicePixelRatio; canvas.style.width = "100vw"; canvas.style.height = "100vh"; ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); };
    const onScroll = () => { scroll = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight); };
    const draw = (t: number) => {
      if (t - last < 30) { raf = requestAnimationFrame(draw); return; }
      last = t; const vw = window.innerWidth, vh = window.innerHeight;
      ctx.clearRect(0, 0, vw, vh);
      const sectionWave = Math.sin(scroll * Math.PI * 4);
      const intensity = .35 + Math.abs(sectionWave) * .45;
      ctx.font = "12px monospace"; ctx.textAlign = "center";
      particles.forEach(p => {
        const drift = Math.sin(t * .00025 * p.speed + p.phase) * 22;
        const x = p.x * vw + drift + Math.sin(scroll * 18 + p.phase) * 12;
        const y = ((p.y * vh + t * .012 * p.speed + scroll * vh * .5) % vh);
        ctx.globalAlpha = (p.accent ? .5 : .16) * intensity;
        ctx.fillStyle = p.accent ? "#d7ff64" : "#a5aaa8";
        ctx.font = `${p.size}px monospace`;
        ctx.fillText(p.glyph, x, y);
      });
      ctx.globalAlpha = 1; raf = requestAnimationFrame(draw);
    };
    resize(); onScroll(); window.addEventListener("resize", resize); window.addEventListener("scroll", onScroll, { passive: true }); raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("scroll", onScroll); };
  }, []);
  return <canvas ref={canvasRef} className="ascii-scroll-scene" aria-hidden="true" />;
}
