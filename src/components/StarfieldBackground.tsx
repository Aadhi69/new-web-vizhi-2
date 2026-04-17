"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  driftX: number;
  driftY: number;
  size: number;
  alpha: number;
};

const REPULSION_RADIUS = 130;
const REPULSION_STRENGTH = 0.12;
const FRICTION = 0.99;

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mouse = { x: -9999, y: -9999, active: false };
    let stars: Star[] = [];
    let animationFrameId = 0;

    const createStars = (width: number, height: number) => {
      const area = width * height;
      const count = Math.max(110, Math.min(260, Math.floor(area / 7000)));

      stars = Array.from({ length: count }, () => {
        const direction = Math.random() * Math.PI * 2;
        const speed = 0.015 + Math.random() * 0.045;

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(direction) * speed,
          vy: Math.sin(direction) * speed,
          driftX: (Math.random() - 0.5) * 0.004,
          driftY: (Math.random() - 0.5) * 0.004,
          size: 0.9 + Math.random() * 0.9,
          alpha: 0.45 + Math.random() * 0.5,
        };
      });
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createStars(width, height);
    };

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
    };

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        if (mouse.active) {
          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < REPULSION_RADIUS && distance > 0.001) {
            const force = (REPULSION_RADIUS - distance) / REPULSION_RADIUS;
            const nx = dx / distance;
            const ny = dy / distance;

            star.vx += nx * force * REPULSION_STRENGTH;
            star.vy += ny * force * REPULSION_STRENGTH;
          }
        }

        star.vx += star.driftX;
        star.vy += star.driftY;

        star.vx *= FRICTION;
        star.vy *= FRICTION;

        star.x += star.vx;
        star.y += star.vy;

        if (star.x < -8) star.x = width + 8;
        if (star.x > width + 8) star.x = -8;
        if (star.y < -8) star.y = height + 8;
        if (star.y > height + 8) star.y = -8;

        const dotSize = star.size < 1.2 ? 1 : 2;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fillRect(star.x, star.y, dotSize, dotSize);
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      <canvas ref={canvasRef} className="h-full w-full opacity-95" />
    </div>
  );
}
