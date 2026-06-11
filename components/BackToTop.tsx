"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 200,
            background: "none",
            border: "1px solid rgba(184,149,106,0.3)",
            borderRadius: "50%",
            width: 44,
            height: 44,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(184,149,106,0.6)",
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(10,10,10,0.6)",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "rgba(184,149,106,0.7)";
            e.currentTarget.style.color = "rgba(184,149,106,1)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(184,149,106,0.3)";
            e.currentTarget.style.color = "rgba(184,149,106,0.6)";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 12V2M2 7l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
