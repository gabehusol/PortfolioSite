"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Reveal from "./Reveal";
import PiClusterModal from "./PiClusterModal";

type Project = {
  num: string;
  name: string;
  stack: string[];
  revealTitle: string;
  revealDesc: string;
  link: { href: string; label: string };
  accent: string;
  art: ReactNode;
};

const projects: Project[] = [
  {
    num: "01",
    name: "SKAPTA",
    stack: ["RAG", "Pinecone", "FastAPI", "React", "Groq"],
    revealTitle: "Skapta",
    revealDesc:
      "Open source AI tool that recommends tech stacks from a plain English description. Full RAG pipeline: scraping real docs, embedding with sentence-transformers, storing in Pinecone, reranking, and generating grounded output via Llama 3.3 70B.",
    link: { href: "https://github.com/gabehusol/skapta", label: "GitHub ↗" },
    accent: "#b8956a",
    art: (
      <div className="pcard-bg" style={{ background: "linear-gradient(135deg,#0e0c08 0%,#0d1117 60%,#08090e 100%)" }}>
        <svg width="100%" height="100%" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute",inset:0 }}>
          {/* grid */}
          <defs>
            <pattern id="pg" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 L40 20 M20 0 L20 40" stroke="#b8956a" strokeWidth="0.3" fill="none" opacity="0.35"/>
            </pattern>
            <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#b8956a" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#b8956a" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="640" height="360" fill="url(#pg)"/>
          <ellipse cx="320" cy="180" rx="200" ry="120" fill="url(#glow1)"/>
          {/* ring system */}
          <circle cx="320" cy="180" r="60"  fill="none" stroke="#b8956a" strokeWidth="0.8" opacity="0.6"/>
          <circle cx="320" cy="180" r="100" fill="none" stroke="#b8956a" strokeWidth="0.5" opacity="0.35"/>
          <circle cx="320" cy="180" r="145" fill="none" stroke="#b8956a" strokeWidth="0.3" opacity="0.2"/>
          {/* nodes */}
          <circle cx="320" cy="120" r="6" fill="#b8956a" opacity="0.9"/>
          <circle cx="380" cy="200" r="5" fill="#b8956a" opacity="0.7"/>
          <circle cx="260" cy="210" r="5" fill="#b8956a" opacity="0.7"/>
          <circle cx="320" cy="245" r="4" fill="#b8956a" opacity="0.5"/>
          {/* spokes */}
          <line x1="320" y1="180" x2="320" y2="120" stroke="#b8956a" strokeWidth="0.8" opacity="0.6"/>
          <line x1="320" y1="180" x2="380" y2="200" stroke="#b8956a" strokeWidth="0.8" opacity="0.6"/>
          <line x1="320" y1="180" x2="260" y2="210" stroke="#b8956a" strokeWidth="0.8" opacity="0.6"/>
          <line x1="320" y1="180" x2="320" y2="245" stroke="#b8956a" strokeWidth="0.5" opacity="0.4"/>
          {/* outer nodes */}
          <circle cx="320" cy="35"  r="5" fill="#b8956a" opacity="0.5"/>
          <circle cx="465" cy="180" r="5" fill="#b8956a" opacity="0.5"/>
          <circle cx="175" cy="180" r="5" fill="#b8956a" opacity="0.5"/>
          <line x1="320" y1="120" x2="320" y2="35"  stroke="#b8956a" strokeWidth="0.4" opacity="0.3" strokeDasharray="4 4"/>
          <line x1="380" y1="200" x2="465" y2="180" stroke="#b8956a" strokeWidth="0.4" opacity="0.3" strokeDasharray="4 4"/>
          <line x1="260" y1="210" x2="175" y2="180" stroke="#b8956a" strokeWidth="0.4" opacity="0.3" strokeDasharray="4 4"/>
          {/* label */}
          <text x="320" y="186" textAnchor="middle" fontFamily="var(--font-mono),monospace" fontSize="10" fill="#b8956a" opacity="0.9">RAG → PINECONE → LLM</text>
        </svg>
      </div>
    ),
  },
  {
    num: "02",
    name: "HANOVER CMS",
    stack: ["PERN", "TypeScript", "Auth0", "AWS"],
    revealTitle: "CS 3733: Hanover Insurance",
    revealDesc:
      "Full-stack web app for Hanover Insurance on a 10-person Agile team. AI content search, RBAC, inline file viewer, bulk CMS, Supabase storage. Deployed on AWS.",
    link: { href: "https://github.com/cs3733-amethysAngels/teamA-prototype", label: "GitHub ↗" },
    accent: "#6a8fb8",
    art: (
      <div className="pcard-bg" style={{ background: "linear-gradient(135deg,#070d14 0%,#0a0f1a 60%,#06090f 100%)" }}>
        <svg width="100%" height="100%" viewBox="0 0 340 280" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute",inset:0 }}>
          <defs>
            <radialGradient id="bglow" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#6a8fb8" stopOpacity="0.18"/>
              <stop offset="100%" stopColor="#6a8fb8" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="340" height="280" fill="url(#bglow)"/>
          {/* browser window */}
          <rect x="30" y="30" width="280" height="185" rx="5" fill="none" stroke="#6a8fb8" strokeWidth="0.8" opacity="0.6"/>
          <rect x="30" y="30" width="280" height="28" fill="rgba(106,143,184,0.08)"/>
          <circle cx="48"  cy="44" r="5" fill="#6a8fb8" opacity="0.7"/>
          <circle cx="63"  cy="44" r="5" fill="#6a8fb8" opacity="0.4"/>
          <circle cx="78"  cy="44" r="5" fill="#6a8fb8" opacity="0.25"/>
          <rect x="95" y="38" width="140" height="12" rx="3" fill="rgba(106,143,184,0.15)"/>
          {/* content rows */}
          <rect x="45" y="75"  width="80" height="8" rx="2" fill="rgba(106,143,184,0.5)"/>
          <rect x="45" y="90"  width="200" height="5" rx="1" fill="rgba(106,143,184,0.15)"/>
          <rect x="45" y="100" width="170" height="5" rx="1" fill="rgba(106,143,184,0.12)"/>
          <rect x="45" y="115" width="80" height="8" rx="2" fill="rgba(106,143,184,0.4)"/>
          <rect x="45" y="130" width="220" height="5" rx="1" fill="rgba(106,143,184,0.15)"/>
          <rect x="45" y="140" width="190" height="5" rx="1" fill="rgba(106,143,184,0.12)"/>
          {/* badge */}
          <rect x="45" y="158" width="70" height="18" rx="3" fill="rgba(106,143,184,0.2)" stroke="#6a8fb8" strokeWidth="0.5" opacity="0.8"/>
          <text x="80" y="171" textAnchor="middle" fontFamily="var(--font-mono),monospace" fontSize="7" fill="#6a8fb8" opacity="0.9">ROLE: admin</text>
          {/* auth tag */}
          <text x="30" y="240" fontFamily="var(--font-mono),monospace" fontSize="8" fill="#6a8fb8" opacity="0.5">POST /auth/login · 200 OK</text>
        </svg>
      </div>
    ),
  },
  {
    num: "03",
    name: "PI CLUSTER",
    stack: ["Linux", "K3s", "Docker", "WireGuard"],
    revealTitle: "Raspberry Pi Cluster",
    revealDesc:
      "Two-node Raspberry Pi cluster connected via a switch, built modular for expansion. Runs a web server, Minecraft server, and WireGuard VPN for encrypted remote access. K3s handles container orchestration across nodes; Docker manages load-balanced workloads.",
    link: { href: "https://github.com/gabehusol", label: "GitHub ↗" },
    accent: "#7ab87a",
    art: (
      <div className="pcard-bg" style={{ background: "linear-gradient(135deg,#070d07 0%,#090f09 60%,#050a05 100%)" }}>
        <svg width="100%" height="100%" viewBox="0 0 340 280" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute",inset:0 }}>
          <defs>
            <radialGradient id="gglow" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#7ab87a" stopOpacity="0.18"/>
              <stop offset="100%" stopColor="#7ab87a" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="340" height="280" fill="url(#gglow)"/>
          {/* master node - centre */}
          <rect x="130" y="90" width="80" height="45" rx="4" fill="rgba(122,184,122,0.12)" stroke="#7ab87a" strokeWidth="1" opacity="0.9"/>
          <text x="170" y="108" textAnchor="middle" fontFamily="var(--font-mono),monospace" fontSize="8" fill="#7ab87a" opacity="0.9">MASTER</text>
          <text x="170" y="121" textAnchor="middle" fontFamily="var(--font-mono),monospace" fontSize="7" fill="#7ab87a" opacity="0.6">K3s v1.29</text>
          {/* left node */}
          <rect x="30"  y="155" width="75" height="40" rx="3" fill="rgba(122,184,122,0.06)" stroke="#7ab87a" strokeWidth="0.7" opacity="0.7"/>
          <text x="67"  y="173" textAnchor="middle" fontFamily="var(--font-mono),monospace" fontSize="7.5" fill="#7ab87a" opacity="0.8">NODE 1</text>
          <text x="67"  y="185" textAnchor="middle" fontFamily="var(--font-mono),monospace" fontSize="6.5" fill="#7ab87a" opacity="0.5">Pi 5</text>
          {/* mid node */}
          <rect x="132" y="175" width="76" height="40" rx="3" fill="rgba(122,184,122,0.06)" stroke="#7ab87a" strokeWidth="0.7" opacity="0.7"/>
          <text x="170" y="193" textAnchor="middle" fontFamily="var(--font-mono),monospace" fontSize="7.5" fill="#7ab87a" opacity="0.8">NODE 2</text>
          <text x="170" y="205" textAnchor="middle" fontFamily="var(--font-mono),monospace" fontSize="6.5" fill="#7ab87a" opacity="0.5">Pi 4</text>
          {/* right node */}
          <rect x="235" y="155" width="75" height="40" rx="3" fill="rgba(122,184,122,0.06)" stroke="#7ab87a" strokeWidth="0.7" opacity="0.7"/>
          <text x="272" y="173" textAnchor="middle" fontFamily="var(--font-mono),monospace" fontSize="7.5" fill="#7ab87a" opacity="0.8">NODE 3</text>
          <text x="272" y="185" textAnchor="middle" fontFamily="var(--font-mono),monospace" fontSize="6.5" fill="#7ab87a" opacity="0.5">Pi 4 · 4GB</text>
          {/* connectors */}
          <line x1="130" y1="122" x2="67"  y2="155" stroke="#7ab87a" strokeWidth="0.8" opacity="0.5"/>
          <line x1="170" y1="135" x2="170" y2="175" stroke="#7ab87a" strokeWidth="0.8" opacity="0.5"/>
          <line x1="210" y1="122" x2="272" y2="155" stroke="#7ab87a" strokeWidth="0.8" opacity="0.5"/>
          <text x="170" y="248" textAnchor="middle" fontFamily="var(--font-mono),monospace" fontSize="8" fill="#7ab87a" opacity="0.5">WireGuard VPN · Docker · K3s</text>
        </svg>
      </div>
    ),
  },
  {
    num: "04",
    name: "VULN SCANNER",
    stack: ["Python", "HTTP", "CLI"],
    revealTitle: "VulnScanner",
    revealDesc:
      "Multi-command CLI for web reconnaissance. Fingerprints targets, checks for missing security headers, probes endpoints via wordlists and robots.txt, and flags exposed secrets, debug pages, and archive files. Outputs JSON, Markdown, and CSV reports with scan history and run diffing built in.",
    link: { href: "https://github.com/gabehusol/vuln-scanner", label: "GitHub ↗" },
    accent: "#c46a6a",
    art: (
      <div className="pcard-bg" style={{ background: "linear-gradient(135deg,#110707 0%,#150a0a 60%,#0a0505 100%)" }}>
        <svg width="100%" height="100%" viewBox="0 0 340 280" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute",inset:0 }}>
          <defs>
            <radialGradient id="rglow" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#c46a6a" stopOpacity="0.18"/>
              <stop offset="100%" stopColor="#c46a6a" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="340" height="280" fill="url(#rglow)"/>
          {/* terminal lines */}
          <text x="24" y="55"  fontFamily="var(--font-mono),monospace" fontSize="9.5" fill="#c46a6a" opacity="0.9">$ scanner.py --target example.com</text>
          <text x="24" y="75"  fontFamily="var(--font-mono),monospace" fontSize="9"   fill="#f0ede6" opacity="0.4">  scanning endpoints...</text>
          <text x="24" y="92"  fontFamily="var(--font-mono),monospace" fontSize="9"   fill="#f0ede6" opacity="0.3">  checking headers...</text>
          <text x="24" y="112" fontFamily="var(--font-mono),monospace" fontSize="9"   fill="#f0ede6" opacity="0.3">  analyzing config...</text>
          {/* divider */}
          <line x1="24" y1="122" x2="316" y2="122" stroke="#c46a6a" strokeWidth="0.4" opacity="0.3"/>
          {/* findings */}
          <circle cx="32" cy="137" r="4" fill="#c46a6a" opacity="0.9"/>
          <text x="44" y="141" fontFamily="var(--font-mono),monospace" fontSize="9" fill="#c46a6a" opacity="0.9">EXPOSED: /.env [200]</text>
          <circle cx="32" cy="157" r="4" fill="#c46a6a" opacity="0.9"/>
          <text x="44" y="161" fontFamily="var(--font-mono),monospace" fontSize="9" fill="#c46a6a" opacity="0.9">MISSING: X-Frame-Options</text>
          <circle cx="32" cy="177" r="4" fill="#c46a6a" opacity="0.9"/>
          <text x="44" y="181" fontFamily="var(--font-mono),monospace" fontSize="9" fill="#c46a6a" opacity="0.9">MISSING: Content-Security-Policy</text>
          <circle cx="32" cy="197" r="4" fill="rgba(196,106,106,0.5)" opacity="0.7"/>
          <text x="44" y="201" fontFamily="var(--font-mono),monospace" fontSize="9" fill="#c46a6a" opacity="0.6">WEAK: TLS 1.1 negotiated</text>
          {/* summary */}
          <line x1="24" y1="216" x2="316" y2="216" stroke="#c46a6a" strokeWidth="0.4" opacity="0.3"/>
          <text x="24" y="234" fontFamily="var(--font-mono),monospace" fontSize="9" fill="#c46a6a" opacity="0.7">4 vulnerabilities · 2 critical · report.json</text>
        </svg>
      </div>
    ),
  },
  {
    num: "05",
    name: "PORTFOLIO",
    stack: ["Next.js 15", "Framer Motion", "Tailwind v4", "Vercel"],
    revealTitle: "This Site",
    revealDesc:
      "Personal portfolio site. Scroll-parallax hero with Framer Motion useScroll, per-project SVG art, Lenis smooth scroll, and a fully interactive CLI terminal. Next.js 15 App Router, Tailwind v4.",
    link: { href: "https://github.com/gabehusol/PortfolioSite", label: "GitHub ↗" },
    accent: "#9480c8",
    art: (
      <div className="pcard-bg" style={{ background: "linear-gradient(135deg,#0c0a12 0%,#0f0c18 60%,#080610 100%)" }}>
        <svg width="100%" height="100%" viewBox="0 0 340 280" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute",inset:0 }}>
          <defs>
            <radialGradient id="portglow" cx="35%" cy="45%" r="60%">
              <stop offset="0%"   stopColor="#b8956a" stopOpacity="0.22"/>
              <stop offset="50%"  stopColor="#9480c8" stopOpacity="0.12"/>
              <stop offset="100%" stopColor="#9480c8" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="340" height="280" fill="url(#portglow)"/>
          {/* browser chrome */}
          <rect x="22" y="22" width="296" height="218" rx="6" fill="none" stroke="#9480c8" strokeWidth="0.8" opacity="0.5"/>
          <rect x="22" y="22" width="296" height="26" fill="rgba(148,128,200,0.06)"/>
          <circle cx="40"  cy="35" r="4" fill="#9480c8" opacity="0.6"/>
          <circle cx="53"  cy="35" r="4" fill="#9480c8" opacity="0.35"/>
          <circle cx="66"  cy="35" r="4" fill="#9480c8" opacity="0.2"/>
          <rect x="82" y="29" width="108" height="12" rx="3" fill="rgba(148,128,200,0.12)"/>
          <text x="136" y="39" textAnchor="middle" fontFamily="var(--font-mono),monospace" fontSize="6" fill="#9480c8" opacity="0.6">gabehusol.com</text>
          {/* mini nav */}
          <text x="34"  y="64" fontFamily="var(--font-mono),monospace" fontSize="6.5" fill="#9480c8" opacity="0.45">GHS</text>
          <text x="224" y="64" fontFamily="var(--font-mono),monospace" fontSize="6"   fill="#9480c8" opacity="0.3">Work · About · Contact</text>
          <line x1="22" y1="69" x2="318" y2="69" stroke="#9480c8" strokeWidth="0.3" opacity="0.2"/>
          {/* hero title */}
          <text x="170" y="118" textAnchor="middle" fontFamily="var(--font-display),sans-serif" fontWeight="700" fontSize="36" fill="#f0ede6" opacity="0.6" letterSpacing="-1">GABRIEL</text>
          <text x="170" y="152" textAnchor="middle" fontFamily="var(--font-display),sans-serif" fontWeight="700" fontSize="27" fill="#f0ede6" opacity="0.4" letterSpacing="-1">HUREZ-SOLER</text>
          <text x="170" y="172" textAnchor="middle" fontFamily="var(--font-mono),monospace" fontSize="6.5" fill="#9480c8" opacity="0.55">SOFTWARE ENGINEER · AI · FULL STACK</text>
          {/* section blocks */}
          <rect x="34"  y="198" width="58" height="20" rx="3" fill="rgba(148,128,200,0.07)" stroke="#9480c8" strokeWidth="0.4" opacity="0.5"/>
          <rect x="102" y="198" width="58" height="20" rx="3" fill="rgba(148,128,200,0.07)" stroke="#9480c8" strokeWidth="0.4" opacity="0.5"/>
          <rect x="170" y="198" width="58" height="20" rx="3" fill="rgba(148,128,200,0.07)" stroke="#9480c8" strokeWidth="0.4" opacity="0.5"/>
          <rect x="238" y="198" width="58" height="20" rx="3" fill="rgba(148,128,200,0.07)" stroke="#9480c8" strokeWidth="0.4" opacity="0.5"/>
          <text x="63"  y="212" textAnchor="middle" fontFamily="var(--font-mono),monospace" fontSize="5.5" fill="#9480c8" opacity="0.5">WORK</text>
          <text x="131" y="212" textAnchor="middle" fontFamily="var(--font-mono),monospace" fontSize="5.5" fill="#9480c8" opacity="0.5">SKILLS</text>
          <text x="199" y="212" textAnchor="middle" fontFamily="var(--font-mono),monospace" fontSize="5.5" fill="#9480c8" opacity="0.5">ABOUT</text>
          <text x="267" y="212" textAnchor="middle" fontFamily="var(--font-mono),monospace" fontSize="5.5" fill="#9480c8" opacity="0.5">TERM</text>
        </svg>
      </div>
    ),
  },
];

export default function Projects() {
  const [piOpen, setPiOpen] = useState(false);

  return (
    <section className="section" id="work">
      <div className="container">
        <Reveal className="sec-label">SELECTED WORK</Reveal>
        <div className="pgrid">
          {projects.map((p, i) => (
            <motion.article
              key={p.num}
              className="pcard"
              style={{ "--card-accent": p.accent } as React.CSSProperties}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="pcard-inner">
                {p.art}
                <div className="pcard-overlay">
                  <div className="pcard-num">{p.num}</div>
                  <div className="pcard-name">{p.name}</div>
                  <div className="pcard-stack">
                    {p.stack.map(s => <span key={s}>{s}</span>)}
                  </div>
                </div>
                <div className="pcard-reveal">
                  <div className="pcard-reveal-num">{p.num} / SELECTED WORK</div>
                  <div className="pcard-reveal-title">{p.revealTitle}</div>
                  <div className="pcard-reveal-desc">{p.revealDesc}</div>
                  {p.num === "03" ? (
                    <button
                      className="pcard-link"
                      onClick={() => setPiOpen(true)}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                    >
                      DETAILS →
                    </button>
                  ) : (
                    <a className="pcard-link" href={p.link.href} target="_blank" rel="noopener noreferrer">
                      {p.link.label}
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <PiClusterModal isOpen={piOpen} onClose={() => setPiOpen(false)} />
    </section>
  );
}
