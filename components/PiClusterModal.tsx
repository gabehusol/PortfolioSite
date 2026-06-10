"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const G  = "#7ab87a";
const G1 = `${G}18`;
const G2 = `${G}30`;
const G3 = `${G}50`;
const mono = "var(--font-mono), monospace";
const body = "var(--font-body), sans-serif";

const SERVICES = [
  { name: "WEB SERVER",    detail: "nginx · reverse proxy · ports 80 / 443",      node: "NODE 1", delay: 0   },
  { name: "WIREGUARD VPN", detail: "Encrypted tunnel · UDP 51820 · remote access", node: "NODE 1", delay: 1.1 },
];

type NodeCardProps = {
  num: string;
  role: string;
  chips?: string[];
  footer: string;
  dim?: boolean;
};

function NodeCard({ num, role, chips = [], footer, dim }: NodeCardProps) {
  return (
    <div style={{
      border: `1px solid ${dim ? G + "28" : G + "50"}`,
      borderRadius: 6,
      background: dim ? `${G}04` : `${G}08`,
      padding: "20px 18px",
      display: "flex",
      flexDirection: "column",
      gap: 10,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: mono, fontSize: 9, color: G, opacity: 0.5, marginBottom: 4, letterSpacing: "0.08em" }}>
            NODE {num}
          </div>
          <div style={{ fontFamily: mono, fontSize: 13, color: G, fontWeight: "bold", letterSpacing: "0.04em" }}>
            {role}
          </div>
        </div>
        <motion.div
          style={{ width: 6, height: 6, borderRadius: "50%", background: G, marginTop: 4 }}
          animate={{ opacity: [1, 0.25, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: Number(num) * 0.7 }}
        />
      </div>

      <div style={{ fontFamily: body, fontSize: 12, color: "#666" }}>
        {num === "1" ? "Raspberry Pi 5" : "Raspberry Pi 4"}
      </div>

      {chips.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {chips.map(c => (
            <span key={c} style={{
              fontFamily: mono, fontSize: 9,
              color: G, background: G1,
              border: `1px solid ${G2}`,
              borderRadius: 3, padding: "3px 8px",
              letterSpacing: "0.04em",
            }}>{c}</span>
          ))}
        </div>
      )}

      <div style={{ fontFamily: mono, fontSize: 9, color: `${G}40`, marginTop: "auto", paddingTop: 6, borderTop: `1px solid ${G}14` }}>
        {footer}
      </div>
    </div>
  );
}

type Props = { isOpen: boolean; onClose: () => void };

export default function PiClusterModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>

          <motion.div
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            style={{
              position: "relative", zIndex: 1,
              width: "100%", maxWidth: "720px",
              maxHeight: "92vh", overflowY: "auto",
              background: "#0b0b0b",
              border: `1px solid ${G}28`,
              borderRadius: "8px",
              padding: "clamp(20px, 4vw, 40px)",
              scrollbarWidth: "thin",
              scrollbarColor: `${G}25 transparent`,
            }}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >

            {/* close */}
            <button
              onClick={onClose}
              style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", fontFamily: mono, fontSize: 16, color: "#555", padding: "6px 8px", lineHeight: 1, transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#ccc")}
              onMouseLeave={e => (e.currentTarget.style.color = "#555")}
            >✕</button>

            {/* header */}
            <div style={{ fontFamily: mono, fontSize: 10, color: "#555", letterSpacing: "0.1em", marginBottom: 8 }}>03 / SELECTED WORK</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "clamp(20px, 3vw, 28px)", color: "#f0ede6", letterSpacing: "-0.02em" }}>
                RASPBERRY PI CLUSTER
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: mono, fontSize: 11, color: G }}>
                <motion.div
                  style={{ width: 6, height: 6, borderRadius: "50%", background: G }}
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                ONLINE
              </div>
            </div>

            {/* ── cluster diagram ── */}
            <div style={{ background: "#080808", border: `1px solid ${G}15`, borderRadius: 6, padding: "28px 24px", marginBottom: 28 }}>

              {/* WireGuard external label */}
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 0, paddingLeft: "calc(25% - 40px)" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                  <div style={{
                    border: `1px dashed ${G3}`,
                    borderRadius: 20,
                    padding: "5px 16px",
                    fontFamily: mono, fontSize: 10,
                    color: G, opacity: 0.75,
                    whiteSpace: "nowrap",
                  }}>
                    ↑ WireGuard VPN
                  </div>
                  <div style={{ width: 1, height: 16, background: `${G}30`, marginTop: 0 }} />
                </div>
              </div>

              {/* nodes */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 0 }}>
                <NodeCard
                  num="1"
                  role="MASTER"
                  chips={["Web Server", "VPN Gateway"]}
                  footer="K3s control-plane · Docker"
                />
                <NodeCard
                  num="2"
                  role="WORKER"
                  footer="K3s agent · Docker"
                  dim
                />
              </div>

              {/* connector lines down to switch */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, height: 20 }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ width: 1, height: "100%", background: `${G}25` }} />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ width: 1, height: "100%", background: `${G}20` }} />
                </div>
              </div>

              {/* horizontal line joining both drops */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 0 }}>
                <div style={{ width: "50%", height: 1, background: `linear-gradient(90deg, transparent, ${G}25 20%, ${G}25 80%, transparent)` }} />
              </div>

              {/* switch */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 1, height: 12, background: `${G}22` }} />
                  <div style={{
                    border: `1px solid ${G}30`,
                    borderRadius: 4,
                    padding: "8px 36px",
                    fontFamily: mono, fontSize: 10,
                    color: `${G}60`,
                    background: "#0a0a0a",
                    letterSpacing: "0.08em",
                  }}>
                    GIGABIT SWITCH
                    <span style={{ color: `${G}35`, fontSize: 8, marginLeft: 10 }}>modular</span>
                  </div>
                </div>
              </div>
            </div>

            {/* two-col details */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 40px", marginBottom: 28 }}>
              {[
                { heading: "HARDWARE",       items: ["Raspberry Pi 5 (master)", "Raspberry Pi 4 (worker)", "Gigabit network switch", "Modular"] },
                { heading: "ORCHESTRATION",  items: ["K3s container orchestration", "Docker workload management", "Load balanced across nodes"] },
              ].map(col => (
                <div key={col.heading}>
                  <div style={{ fontFamily: mono, fontSize: 10, color: G, letterSpacing: "0.12em", marginBottom: 14, opacity: 0.75 }}>
                    {col.heading}
                  </div>
                  {col.items.map(t => (
                    <div key={t} style={{ fontFamily: body, fontSize: 13, color: "#777", marginBottom: 9, paddingLeft: 12, borderLeft: `1px solid ${G}28` }}>
                      {t}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div style={{ height: 1, background: `${G}14`, marginBottom: 24 }} />

            {/* services */}
            <div style={{ fontFamily: mono, fontSize: 10, color: G, letterSpacing: "0.12em", marginBottom: 14, opacity: 0.75 }}>
              SERVICES
            </div>
            {SERVICES.map(s => (
              <div key={s.name} style={{
                display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
                padding: "12px 16px", marginBottom: 8,
                background: `${G}05`, borderRadius: 4,
                border: `1px solid ${G}14`,
              }}>
                <motion.div
                  style={{ width: 6, height: 6, borderRadius: "50%", background: G, flexShrink: 0 }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
                />
                <span style={{ fontFamily: mono, fontSize: 11, color: G, minWidth: 132 }}>{s.name}</span>
                <span style={{ fontFamily: body, fontSize: 13, color: "#6a6a6a", flex: 1 }}>{s.detail}</span>
                <span style={{ fontFamily: mono, fontSize: 10, color: `${G}45`, whiteSpace: "nowrap" }}>{s.node}</span>
              </div>
            ))}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
