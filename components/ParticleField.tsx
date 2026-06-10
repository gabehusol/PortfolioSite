"use client";

import { useEffect, useRef } from "react";

type ParticleFieldProps = {
  /** Number of points in the field. */
  count?: number;
  /** Stroke/fill color for nodes and links. */
  color?: string;
  /** Max distance at which two points are linked. */
  linkDistance?: number;
  /** Velocity scale for drifting points. */
  speed?: number;
  /** Opacity multiplier for link lines. */
  linkAlpha?: number;
  /** Opacity for the node dots. */
  dotAlpha?: number;
};

type Point = { x: number; y: number; vx: number; vy: number };

/**
 * Animated particle network, ported from the prototype's canvas hero
 * backgrounds (initHeroA / initHeroB). Renders at 2x for crispness and
 * resizes with its container.
 */
export default function ParticleField({
  count = 70,
  color = "#b8956a",
  linkDistance = 100,
  speed = 0.4,
  linkAlpha = 0.08,
  dotAlpha = 0.15,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let points: Point[] = [];

    const setup = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * 2;
      canvas.height = height * 2;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(2, 2);
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const d = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
          if (d < linkDistance) {
            ctx.globalAlpha = (1 - d / linkDistance) * linkAlpha;
            ctx.strokeStyle = color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = dotAlpha;
      ctx.fillStyle = color;
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    setup();
    draw();

    const handleResize = () => {
      cancelAnimationFrame(raf);
      setup();
      draw();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, [count, color, linkDistance, speed, linkAlpha, dotAlpha]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
