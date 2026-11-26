"use client";

import { useEffect, useRef } from "react";

const GLYPH_RAMP = " .·:+*░▒▓#@█";
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export default function KineticHeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    if (!canvas || !hero) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let isHovered = false;

    const onPointerMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
      isHovered = true;
    };

    const onPointerLeave = () => {
      isHovered = false;
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerleave", onPointerLeave);

    const render = (time: number) => {
      const w = hero.clientWidth;
      const h = hero.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Smooth mouse coordinate interpolation
      if (isHovered) {
        mouseX += (targetMouseX - mouseX) * 0.1;
        mouseY += (targetMouseY - mouseY) * 0.1;
      } else {
        mouseX += (-1000 - mouseX) * 0.05;
        mouseY += (-1000 - mouseY) * 0.05;
      }

      const t = reduced ? 0 : time * 0.0016;

      // Planar X/Y screen grid facing directly at the user
      const cellW = Math.max(18, Math.min(26, w / 48));
      const cellH = Math.max(18, Math.min(26, h / 30));
      const cols = Math.ceil(w / cellW) + 2;
      const rows = Math.ceil(h / cellH) + 2;

      const fontSize = Math.max(9, Math.min(13, cellW * 0.62));
      ctx.font = `${fontSize}px "IBM Plex Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const centerX = w * 0.5;
      const centerY = h * 0.5;

      for (let r = 0; r < rows; r++) {
        const baseY = (r - 1) * cellH;

        for (let c = 0; c < cols; c++) {
          const baseX = (c - 1) * cellW;

          // Harmonic waves propagating across the X and Y screen axes
          // 1. Horizontal wave propagating left-to-right across X
          const waveX = Math.sin(baseX * 0.0075 - t * 2.2);
          // 2. Vertical wave propagating across Y
          const waveY = Math.cos(baseY * 0.009 + t * 1.6);
          // 3. Diagonal harmonic interference wave across X and Y
          const waveDiag = Math.sin((baseX * 0.005 + baseY * 0.006) - t * 2.8) * 0.6;
          // 4. Ambient radial breathing pulse from the center of the screen
          const distFromCenter = Math.hypot(baseX - centerX, baseY - centerY);
          const waveRadial = Math.sin(distFromCenter * 0.008 - t * 1.8) * 0.4;

          // Total wave amplitude at (X, Y)
          let amp = waveX * 0.45 + waveY * 0.35 + waveDiag + waveRadial;

          // Kinetic displacement on the X and Y screen plane (rippling in-place)
          let dx = Math.cos(waveY * Math.PI + t) * 4.5;
          let dy = Math.sin(waveX * Math.PI + t) * 4.5;

          // Interactive concentric ripples emanating outward across X and Y from cursor
          let mouseInfluence = 0;
          if (isHovered && mouseX > -500) {
            const mDist = Math.hypot(baseX - mouseX, baseY - mouseY);
            if (mDist < 280) {
              const normMDist = 1 - mDist / 280;
              // Concentric ripple rings facing user
              const ripple = Math.sin(mDist * 0.055 - t * 6.0) * normMDist;
              mouseInfluence = Math.pow(normMDist, 1.4);

              // Displace grid points away from cursor in X and Y
              const angle = Math.atan2(baseY - mouseY, baseX - mouseX);
              dx += Math.cos(angle) * ripple * 12.0;
              dy += Math.sin(angle) * ripple * 12.0;
              amp += ripple * 0.8;
            }
          }

          const renderX = baseX + dx;
          const renderY = baseY + dy;

          if (renderX < -15 || renderX > w + 15 || renderY < -15 || renderY > h + 15) continue;

          // Normalize amplitude to choose ASCII glyph from ramp
          const normAmp = clamp((amp + 1.2) / 2.4, 0, 1);
          const shadeIndex = Math.floor(
            clamp((normAmp + mouseInfluence * 0.45) * (GLYPH_RAMP.length - 1), 0, GLYPH_RAMP.length - 1)
          );
          const glyph = GLYPH_RAMP[shadeIndex];
          if (glyph === " ") continue;

          // Fade smoothly at hero edges so it blends cleanly into the page
          const edgeFadeX = clamp(renderX / 80, 0, 1) * clamp((w - renderX) / 80, 0, 1);
          const edgeFadeY = clamp(renderY / 70, 0, 1) * clamp((h - renderY) / 70, 0, 1);
          const edgeFactor = edgeFadeX * edgeFadeY;

          // Alpha calculation: subtle ambient base with high-energy peaks and cursor flare
          const alpha = clamp(
            (0.12 + normAmp * 0.55 + mouseInfluence * 0.65) * edgeFactor,
            0.04,
            0.92
          );

          // Electric lime accents on wave crests and active cursor ripples
          const isLime = mouseInfluence > 0.22 || (normAmp > 0.76 && (c + r) % 4 === 0);

          ctx.fillStyle = isLime
            ? `rgba(215, 255, 100, ${alpha})`
            : `rgba(224, 232, 226, ${alpha * 0.72})`;

          ctx.fillText(glyph, renderX, renderY);
        }
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="kinetic-hero-canvas" aria-hidden="true" />;
}
