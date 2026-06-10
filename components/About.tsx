"use client";

import { motion, type Variants } from "framer-motion";
import Reveal from "./Reveal";
import InteractiveTerminal from "./InteractiveTerminal";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const contacts = [
  { href: "mailto:gsoler@wpi.edu",                label: "EMAIL" },
  { href: "https://linkedin.com/in/gabrielhurez", label: "LINKEDIN" },
  { href: "https://github.com/gabehusol",         label: "GITHUB" },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <Reveal className="sec-label">ABOUT</Reveal>

        <div className="about-grid">
          {/* ── left: bio ── */}
          <div className="about-left">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="about-big">
                WPI CS.<br />
                <span className="dim">AI + Security.</span><br />
                Software.
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.12 }}
            >
              <p className="about-body">
                Studying Computer Science at WPI, cybersecurity concentration. Most of
                my time outside class goes into building things: AI tools, full-stack
                apps, home lab infrastructure.
                <br /><br />
                Currently building{" "}
                <a href="https://github.com/gabehusol/skapta" target="_blank" rel="noopener noreferrer">Skapta</a>
                {", "}an open source AI tool that recommends tech stacks using a RAG
                pipeline I built myself. I use AI tools daily and think seriously
                about how to build with them, not just around them.
                <br /><br />
                Proficient in Spanish and French, beginner German.
              </p>

              <div className="contact-row" id="contact">
                {contacts.map(c => (
                  <a
                    key={c.label}
                    className="contact-link"
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {c.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── right: interactive terminal ── */}
          <div className="about-right">
            <Reveal delay={0.08}>
              <p className="iterm-hint">
                A real terminal. Try <code>help</code>, <code>about</code>, <code>neofetch</code>.
              </p>
            </Reveal>
            <InteractiveTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
