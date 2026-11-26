"use client";

import { useEffect, useRef } from "react";

const SHAPE = [
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

const GLYPHS = " .,:;+=*#%@";

export default function Whale() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let pointerX = 0;
    let pointerY = 0;
    let smoothX = 0;
    let smoothY = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onPointer = (e: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width - .5) * 2;
      pointerY = ((e.clientY - rect.top) / rect.height - .5) * 2;
    };
    wrapper.addEventListener("pointermove", onPointer);
    wrapper.addEventListener("pointerleave", () => { pointerX = 0; pointerY = 0; });

    const render = (time: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = wrapper.clientWidth;
      const h = wrapper.clientHeight;
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      smoothX += (pointerX - smoothX) * .035;
      smoothY += (pointerY - smoothY) * .035;
      const scale = Math.min(w / 68, h / 20) * .86;
      const charW = scale * .58;
      const charH = scale;
      const totalW = Math.max(...SHAPE.map(row => row.length)) * charW;
      const totalH = SHAPE.length * charH;
      const startX = (w - totalW) / 2 + smoothX * 14;
      const startY = (h - totalH) / 2 + smoothY * 10 + (reduced ? 0 : Math.sin(time * .0007) * 5);
      ctx.font = `${Math.max(7, charH * .92)}px \"IBM Plex Mono\", monospace`;
      ctx.textBaseline = "top";
      SHAPE.forEach((row, y) => {
        [...row].forEach((char, x) => {
          if (char === " ") return;
          const wave = reduced ? 0 : Math.sin(time * .0016 + x * .14 + y * .24) * .35;
          const depth = Math.max(0, Math.min(1, (x + y * .6) / 48));
          const index = Math.floor((depth * 8 + wave + (char === "/" || char === "\\" ? 2 : 0)) % GLYPHS.length);
          const ink = GLYPHS[Math.max(0, index)];
          const isHighlight = (x * 7 + y * 13) % 31 === 0;
          ctx.fillStyle = isHighlight ? "#d7ff64" : `rgba(225,230,224,${.45 + depth * .5})`;
          const wobble = reduced ? 0 : Math.sin(time * .001 + y * .45) * 1.4;
          ctx.fillText(ink, startX + x * charW, startY + y * charH + wobble);
        });
      });
      if (!reduced) raf = requestAnimationFrame(render);
    };
    render(0);
    if (!reduced) raf = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(raf); wrapper.removeEventListener("pointermove", onPointer); };
  }, []);

  return <div className="whale-stage" ref={wrapperRef} aria-label="Animated ASCII whale illustration">
    <canvas ref={canvasRef} className="whale-canvas" />
    <div className="orbit orbit-one" />
    <div className="orbit orbit-two" />
    <div className="float-object moon">◌</div>
    <div className="float-object satellite">╱╲<br />╲╱</div>
    <div className="float-object planet">◉</div>
    <span className="star star-a">+</span><span className="star star-b">✳</span><span className="star star-c">+</span>
    <span className="whale-label label-top">OBJ_01 / CETACEAN</span>
    <span className="whale-label label-bottom">FIELD NOTE — 001</span>
  </div>;
}
