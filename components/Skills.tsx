"use client";

import { motion, type Variants } from "framer-motion";
import Reveal from "./Reveal";

const quadrants = [
  { cls: "q0", label: "LANGUAGES",      nodes: ["Python", "TypeScript", "JavaScript", "C/C++", "SQL", "HTML/CSS"] },
  { cls: "q1", label: "FRAMEWORKS",     nodes: ["React", "Node.js", "Express", "Tailwind CSS", "Prisma ORM", "Auth0"] },
  { cls: "q2", label: "AI & TOOLS",     nodes: ["Claude Code", "RAG Pipelines", "Pinecone", "ChatGPT", "Groq / Llama"] },
  { cls: "q3", label: "INFRASTRUCTURE", nodes: ["Docker", "K3s", "Linux", "AWS", "Vercel", "Git", "CI/CD", "Testing", "WireGuard"] },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal className="sec-label">TECHNICAL SKILLS</Reveal>
        <motion.div
          className="quad"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {quadrants.map((q) => (
            <motion.div key={q.cls} className={`quadrant ${q.cls}`} variants={item}>
              <div className="q-label">{q.label}</div>
              <div className="q-nodes">
                {q.nodes.map((n) => (
                  <span className="q-node" key={n}>{n}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
