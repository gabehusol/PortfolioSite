"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import ParticleField from "./ParticleField";

const HERO_IMAGE: string | null = null;

const NAV_LINKS = [
  { label: "Work",    href: "#work" },
  { label: "About",  href: "#about" },
  { label: "Contact",href: "#contact" },
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Opacity-only — safe for elements with mix-blend-mode children
const fadeIn = (delay: number, duration: number): Variants => ({
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration, delay, ease } },
});

// Opacity + upward slide — for elements that can have y transforms
const riseIn = (delay: number, duration: number, y = 14): Variants => ({
  hidden: { opacity: 0, y },
  show:   { opacity: 1, y: 0, transition: { duration, delay, ease } },
});

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  // ── Scroll parallax (proper Framer Motion pattern) ───────────────
  // useScroll with a target ref gives scrollYProgress 0→1 relative to
  // the hero element, so it adapts to any viewport height automatically.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Spring smoothing — makes motion feel physical, not mechanical
  const smoothY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.0005,
  });

  // Background drifts down at ~27% of hero height as it scrolls off
  const bgScrollY  = useTransform(smoothY, [0, 1], [0, 240]);
  const bgScale    = useTransform(smoothY, [0, 1], [1, 1.12]);
  // Particles at a different rate — creates real depth between layers
  const midScrollY = useTransform(smoothY, [0, 1], [0, 120]);
  // Title content: opacity only (no y-transform — preserves mix-blend-mode)
  const titleOpacity = useTransform(smoothY, [0, 0.65], [1, 0]);

  // ── Pointer parallax ─────────────────────────────────────────────
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 70, damping: 18, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 70, damping: 18, mass: 0.5 });
  const bgX  = useTransform(sx, v => v * 30);
  const bgY  = useTransform(sy, v => v * 22);
  const midX = useTransform(sx, v => v * 16);
  const midY = useTransform(sy, v => v * 12);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width  - 0.5);
    py.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const handleLeave = () => { px.set(0); py.set(0); };

  return (
    <div
      className="hero ha"
      ref={heroRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* ── deepest layer: gradient blooms in from dark ── */}
      <motion.div
        className="ha-layer"
        style={{ y: bgScrollY, scale: bgScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        <motion.div
          className={`ha-fill ${HERO_IMAGE ? "ha-image" : "ha-gradient"}`}
          style={HERO_IMAGE
            ? { x: bgX, y: bgY, backgroundImage: `url(${HERO_IMAGE})` }
            : { x: bgX, y: bgY }}
        />
      </motion.div>

      {/* ── mid layer: particles drift in slightly after background ── */}
      <motion.div
        className="ha-layer"
        style={{ y: midScrollY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: "easeOut" }}
      >
        <motion.div className="ha-fill" style={{ x: midX, y: midY }}>
          <ParticleField
            count={70}
            color="#b8956a"
            linkDistance={130}
            speed={0.3}
            linkAlpha={0.09}
            dotAlpha={0.16}
          />
        </motion.div>
      </motion.div>

      <div className="ha-vignette" />

      {/* ── nav slides down from top ── */}
      <div className="ha-nav">
        <motion.span
          className="ha-navname"
          variants={riseIn(0.6, 0.7, -10)}
          initial="hidden"
          animate="show"
        >
          GHS
        </motion.span>
        <motion.div
          className="ha-navlinks"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.7 } } }}
        >
          {NAV_LINKS.map(l => (
            <motion.a key={l.label} href={l.href} variants={riseIn(0, 0.6, -8)}>
              {l.label}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* ── title block: opacity only on parent (preserves mix-blend-mode on .ha-title) ── */}
      <motion.div className="ha-text" style={{ opacity: titleOpacity }}>
        {/* eyebrow can slide — no blend mode */}
        <motion.div className="ha-eyebrow" variants={riseIn(0.5, 0.8)} initial="hidden" animate="show">
          PORTFOLIO · {new Date().getFullYear()}
        </motion.div>
        {/* title: opacity only — y transform would break mix-blend-mode */}
        <motion.div className="ha-title" variants={fadeIn(0.65, 1.3)} initial="hidden" animate="show">
          GABRIEL
          <br />
          HUREZ-SOLER
        </motion.div>
        {/* sub can slide */}
        <motion.div className="ha-sub" variants={riseIn(1.0, 0.9)} initial="hidden" animate="show">
          SOFTWARE ENGINEER · AI · FULL STACK
        </motion.div>
      </motion.div>

      {/* ── CTAs rise from bottom ── */}
      <motion.div
        className="ha-bottom"
        variants={riseIn(1.2, 0.8, 12)}
        initial="hidden"
        animate="show"
      >
        <a href="#work" className="ha-cta">
          <span className="ha-cta-label">WORK</span>
          <span className="ha-cta-arrow ha-cta-arrow--down">↓</span>
        </a>
        <a href="#contact" className="ha-cta">
          <span className="ha-cta-label">CONTACT</span>
          <span className="ha-cta-arrow ha-cta-arrow--right">→</span>
        </a>
      </motion.div>

      {/* ── scroll hint ── */}
      <motion.a
        href="#work"
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          translateX: "-50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: titleOpacity,
          textDecoration: "none",
          cursor: "pointer",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", color: "rgba(184,149,106,0.5)" }}>
          SCROLL
        </span>
        <motion.div
          style={{ color: "rgba(184,149,106,0.55)", fontSize: 18, lineHeight: 1 }}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.div>
      </motion.a>
    </div>
  );
}
