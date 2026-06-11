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
        <div />
        <motion.div
          style={{ display: "flex", alignItems: "center", gap: 36 }}
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.7 } } }}
        >
          {NAV_LINKS.map(l => (
            <motion.a key={l.label} href={l.href} className="ha-navlinks" style={{ fontSize: 12, letterSpacing: "0.14em", color: "rgba(240,237,230,0.55)", textDecoration: "none", fontFamily: "var(--font-mono), monospace", transition: "color 0.25s" }} variants={riseIn(0, 0.6, -8)}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(240,237,230,1)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,237,230,0.55)")}
            >
              {l.label}
            </motion.a>
          ))}

          {/* divider */}
          <motion.div variants={riseIn(0, 0.6, -8)} style={{ width: 1, height: 14, background: "rgba(240,237,230,0.15)" }} />

          {/* GitHub */}
          <motion.a variants={riseIn(0, 0.6, -8)} href="https://github.com/gabehusol" target="_blank" rel="noopener noreferrer"
            style={{ color: "rgba(240,237,230,0.45)", transition: "color 0.2s", display: "flex" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(240,237,230,0.9)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,237,230,0.45)")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </motion.a>

          {/* LinkedIn */}
          <motion.a variants={riseIn(0, 0.6, -8)} href="https://linkedin.com/in/gabrielhurez" target="_blank" rel="noopener noreferrer"
            style={{ color: "rgba(240,237,230,0.45)", transition: "color 0.2s", display: "flex" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(240,237,230,0.9)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,237,230,0.45)")}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </motion.a>
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


      {/* ── scroll hint ── */}
      <motion.a
        href="#work"
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          translateX: "-50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          opacity: titleOpacity,
          textDecoration: "none",
          cursor: "pointer",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
      >
        {[0, 1, 2].map(i => (
          <motion.svg
            key={i}
            width="32" height="18" viewBox="0 0 32 18" fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.22 }}
          >
            <path d="M1 1l15 15L31 1" stroke="rgba(184,149,106,1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
        ))}
      </motion.a>
    </div>
  );
}
