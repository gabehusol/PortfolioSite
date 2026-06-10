"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LineType = "input" | "output" | "error" | "accent" | "dim";
type Line = { type: LineType; text: string; id: string };
type TemplateLine = { type: LineType; text: string };

// ── SL train ──────────────────────────────────────────────────────
const SL_ART = [
  "     ====        ________                    ",
  " ___/    \\_____/        \\___                ",
  "|   ( o )  ( o )  ( o )   |====>            ",
  "|___________________________|                ",
  "   (O)    (O)    (O)    (O)                 ",
];
const SL_W = Math.max(...SL_ART.map(l => l.length));
const TW   = 70; // approx terminal char width

// ── Snake ─────────────────────────────────────────────────────────
const GW = 26;
const GH = 11;

type SnakeState = {
  snake: [number, number][];
  dir:   [number, number];
  food:  [number, number];
  score: number;
  alive: boolean;
};

function rndFood(snake: [number, number][]): [number, number] {
  let p: [number, number];
  do { p = [Math.floor(Math.random() * GH), Math.floor(Math.random() * GW)]; }
  while (snake.some(([r, c]) => r === p[0] && c === p[1]));
  return p;
}

function initSnake(): SnakeState {
  const snake: [number, number][] = [[5, 15], [5, 14], [5, 13]];
  return { snake, dir: [0, 1], food: rndFood(snake), score: 0, alive: true };
}

function drawSnake(s: SnakeState): string[] {
  const g = Array.from({ length: GH }, () => Array<string>(GW).fill("."));
  s.snake.forEach(([r, c], i) => {
    if (r >= 0 && r < GH && c >= 0 && c < GW) g[r][c] = i === 0 ? "@" : "o";
  });
  const [fr, fc] = s.food;
  if (fr >= 0 && fr < GH && fc >= 0 && fc < GW) g[fr][fc] = "*";
  const bar  = "+" + "-".repeat(GW) + "+";
  const hint = s.alive
    ? `  score: ${s.score}   arrows to move   q to quit`
    : `  GAME OVER   score: ${s.score}   press any key`;
  return [bar, ...g.map(r => "|" + r.join("") + "|"), bar, hint];
}

// ── Commands ──────────────────────────────────────────────────────
const COMMANDS: Record<string, () => TemplateLine[]> = {
  help: () => [
    { type: "dim",    text: "────────────────────────────────────────" },
    { type: "accent", text: "  about      who I am" },
    { type: "accent", text: "  projects   what I've built" },
    { type: "accent", text: "  skills     what I work with" },
    { type: "accent", text: "  contact    how to reach me" },
    { type: "dim",    text: "────────────────────────────────────────" },
    { type: "output", text: "  clear      clear the terminal" },
    { type: "output", text: "  whoami     alias for about" },
    { type: "output", text: "  ls         alias for projects" },
    { type: "dim",    text: "────────────────────────────────────────" },
    { type: "output", text: "  morehelp" },
    { type: "dim",    text: "────────────────────────────────────────" },
  ],
  about: () => [
    { type: "accent", text: "Gabriel Hurez-Soler" },
    { type: "dim",    text: "────────────────────────────────────────" },
    { type: "output", text: "  Role       Software Engineer / CS Student" },
    { type: "output", text: "  School     Worcester Polytechnic Institute" },
    { type: "output", text: "  Focus      AI tools · Full-stack · Cybersecurity" },
    { type: "output", text: "  Languages  Python · TypeScript · C/C++ · SQL" },
    { type: "output", text: "  Spoken     Spanish (proficient) · French (proficient) · German (beginner)" },
    { type: "dim",    text: "────────────────────────────────────────" },
  ],
  projects: () => [
    { type: "dim",    text: "────────────────────────────────────────" },
    { type: "accent", text: "  01  SKAPTA" },
    { type: "output", text: "      Open source AI stack recommender. RAG pipeline," },
    { type: "output", text: "      Pinecone, FastAPI, Llama 3.3 70B → github.com/gabehusol/skapta" },
    { type: "accent", text: "  02  HANOVER CMS" },
    { type: "output", text: "      Full-stack CMS for Hanover Insurance, 10-person" },
    { type: "output", text: "      Agile team. PERN · TypeScript · Auth0 · AWS" },
    { type: "accent", text: "  03  PI CLUSTER" },
    { type: "output", text: "      Multi-node home lab. K3s · Docker · WireGuard VPN" },
    { type: "accent", text: "  04  VULN SCANNER" },
    { type: "output", text: "      CLI web misconfiguration scanner. Python · HTTP" },
    { type: "dim",    text: "────────────────────────────────────────" },
  ],
  skills: () => [
    { type: "dim",    text: "────────────────────────────────────────" },
    { type: "accent", text: "  LANGUAGES     Python · TypeScript · JavaScript · C/C++ · SQL" },
    { type: "accent", text: "  FRAMEWORKS    React · Node.js · Express · Tailwind · Prisma · Auth0" },
    { type: "accent", text: "  AI & TOOLS    Claude Code · RAG Pipelines · Pinecone · ChatGPT · Groq" },
    { type: "accent", text: "  INFRA         Docker · K3s · Linux · AWS · Vercel · Git · CI/CD · Testing" },
    { type: "dim",    text: "────────────────────────────────────────" },
  ],
  contact: () => [
    { type: "dim",    text: "────────────────────────────────────────" },
    { type: "accent", text: "  Email     gsoler@wpi.edu" },
    { type: "accent", text: "  LinkedIn  linkedin.com/in/gabrielhurez" },
    { type: "accent", text: "  GitHub    github.com/gabehusol" },
    { type: "dim",    text: "────────────────────────────────────────" },
  ],
  neofetch: () => [
    { type: "dim",    text: "" },
    { type: "accent", text: "  ██████╗ ██╗  ██╗███████╗" },
    { type: "accent", text: "  ██╔════╝ ██║  ██║██╔════╝" },
    { type: "accent", text: "  ██║  ███╗███████║███████╗" },
    { type: "accent", text: "  ██║   ██║██╔══██║╚════██║" },
    { type: "accent", text: "  ╚██████╔╝██║  ██║███████║" },
    { type: "accent", text: "   ╚═════╝ ╚═╝  ╚═╝╚══════╝" },
    { type: "dim",    text: "" },
    { type: "output", text: "  gabriel@portfolio" },
    { type: "output", text: "  Shell    Next.js 15 + TypeScript" },
    { type: "output", text: "  Editor   VS Code" },
    { type: "output", text: "  Uptime   June 2026" },
    { type: "dim",    text: "" },
  ],
  morehelp: () => [
    { type: "dim",    text: "────────────────────────────────────────" },
    { type: "accent", text: "  sl" },
    { type: "accent", text: "  snake" },
    { type: "dim",    text: "────────────────────────────────────────" },
  ],
  skapta: () => [
    { type: "output", text: "Launching Skapta..." },
    { type: "accent", text: "→  github.com/gabehusol/skapta" },
  ],
};

COMMANDS.whoami = COMMANDS.about;
COMMANDS.ls     = COMMANDS.projects;

const BOOT_LINES: Line[] = [
  { type: "dim", text: "gabriel@portfolio ~ % initialized", id: "boot-0" },
  { type: "dim", text: "Type 'help' to explore.", id: "boot-1" },
  { type: "dim", text: "", id: "boot-2" },
];

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

// ── Component ─────────────────────────────────────────────────────
export default function InteractiveTerminal() {
  const [lines,   setLines]   = useState<Line[]>(BOOT_LINES);
  const [input,   setInput]   = useState("");
  const [history, setHist]    = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [slPos,   setSlPos]   = useState<number | null>(null);
  const [snake,   setSnake]   = useState<SnakeState | null>(null);

  const inputRef         = useRef<HTMLInputElement>(null);
  const bodyRef          = useRef<HTMLDivElement>(null);
  const slIntervalRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const snakeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const snakeDirRef      = useRef<[number, number]>([0, 1]);
  const snakeRef         = useRef<SnakeState | null>(null);

  // cleanup on unmount
  useEffect(() => () => {
    if (slIntervalRef.current)    clearInterval(slIntervalRef.current);
    if (snakeIntervalRef.current) clearInterval(snakeIntervalRef.current);
  }, []);

  // auto-scroll
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, snake, slPos]);

  // ── SL ──────────────────────────────────────────────────────────
  const startSl = useCallback(() => {
    if (slIntervalRef.current) return;
    let pos = TW;
    setSlPos(pos);
    slIntervalRef.current = setInterval(() => {
      pos--;
      if (pos < -SL_W - 5) {
        clearInterval(slIntervalRef.current!);
        slIntervalRef.current = null;
        setSlPos(null);
        setLines(prev => [...prev, { type: "dim", text: "", id: uid() }]);
      } else {
        setSlPos(pos);
      }
    }, 45);
  }, []);

  // ── Snake ────────────────────────────────────────────────────────
  const tickSnake = useCallback(() => {
    const s = snakeRef.current;
    if (!s || !s.alive) return;

    const [dr, dc] = snakeDirRef.current;
    const [hr, hc] = s.snake[0];
    const nh: [number, number] = [hr + dr, hc + dc];

    const dead = nh[0] < 0 || nh[0] >= GH || nh[1] < 0 || nh[1] >= GW
              || s.snake.some(([r, c]) => r === nh[0] && c === nh[1]);

    if (dead) {
      const next = { ...s, alive: false };
      snakeRef.current = next;
      setSnake({ ...next });
      clearInterval(snakeIntervalRef.current!);
      snakeIntervalRef.current = null;
      return;
    }

    const ate  = nh[0] === s.food[0] && nh[1] === s.food[1];
    const body = [nh, ...s.snake];
    if (!ate) body.pop();

    const next: SnakeState = {
      snake: body,
      dir:   snakeDirRef.current,
      food:  ate ? rndFood(body) : s.food,
      score: s.score + (ate ? 1 : 0),
      alive: true,
    };
    snakeRef.current = next;
    setSnake({ ...next });
  }, []);

  const startSnake = useCallback(() => {
    if (snakeIntervalRef.current) return;
    const init = initSnake();
    snakeRef.current   = init;
    snakeDirRef.current = [0, 1];
    setSnake({ ...init });
    snakeIntervalRef.current = setInterval(tickSnake, 150);
  }, [tickSnake]);

  const endSnake = useCallback(() => {
    if (snakeIntervalRef.current) {
      clearInterval(snakeIntervalRef.current);
      snakeIntervalRef.current = null;
    }
    const score = snakeRef.current?.score ?? 0;
    snakeRef.current = null;
    setSnake(null);
    setLines(prev => [...prev,
      { type: "dim", text: `  score: ${score}.${score > 5 ? " not bad." : ""}`, id: uid() },
      { type: "dim", text: "", id: uid() },
    ]);
  }, []);

  // ── run ──────────────────────────────────────────────────────────
  const run = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const inputLine: Line = { type: "input", text: raw.trim(), id: uid() };
    if (!cmd) return;

    if (cmd === "clear") {
      setLines([]);
      setHist(h => [cmd, ...h]);
      setHistIdx(-1);
      return;
    }
    if (cmd === "sl") {
      setLines(prev => [...prev, inputLine]);
      startSl();
      setHist(h => [cmd, ...h.slice(0, 49)]);
      setHistIdx(-1);
      return;
    }
    if (cmd === "snake") {
      setLines(prev => [...prev, inputLine,
        { type: "dim", text: "  arrows to move · q to quit · eat * to grow", id: uid() },
        { type: "dim", text: "", id: uid() },
      ]);
      startSnake();
      setHist(h => [cmd, ...h.slice(0, 49)]);
      setHistIdx(-1);
      return;
    }

    const handler = COMMANDS[cmd];
    const outputLines: Line[] = handler
      ? handler().map(l => ({ ...l, id: uid() }))
      : [{ type: "error", text: `command not found: ${cmd}. try 'help'`, id: uid() }];

    setLines(prev => [...prev, inputLine, ...outputLines, { type: "dim", text: "", id: uid() }]);
    setHist(h => [cmd, ...h.slice(0, 49)]);
    setHistIdx(-1);
  }, [startSl, startSnake]);

  // ── keyboard ──────────────────────────────────────────────────────
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (snake) {
      e.preventDefault();
      if (!snake.alive) { endSnake(); return; }
      const dirs: Record<string, [number, number]> = {
        ArrowUp: [-1, 0], ArrowDown: [1, 0],
        ArrowLeft: [0, -1], ArrowRight: [0, 1],
      };
      if (dirs[e.key]) {
        const nd = dirs[e.key];
        const cd = snakeDirRef.current;
        // no 180° reversal
        if (nd[0] !== -cd[0] || nd[1] !== -cd[1]) snakeDirRef.current = nd;
      } else if (e.key === "q" || e.key === "Q" || e.key === "Escape") {
        endSnake();
      }
      return;
    }

    if (e.key === "Enter") {
      run(input); setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next); setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next); setInput(next === -1 ? "" : history[next]);
    }
  };

  // ── render ────────────────────────────────────────────────────────
  return (
    <motion.div
      className="iterm"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="iterm-bar">
        <div className="td" style={{ background: "#ff5f57" }} />
        <div className="td" style={{ background: "#febc2e" }} />
        <div className="td" style={{ background: "#28c840" }} />
        <span className="iterm-title">gabriel@portfolio ~ %</span>
      </div>

      <div className="iterm-body" ref={bodyRef}>
        <AnimatePresence initial={false}>
          {lines.map(l => (
            <motion.div
              key={l.id}
              className={`iterm-line iterm-line--${l.type}`}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
            >
              {l.type === "input"
                ? <><span className="iterm-prompt">~ $ </span>{l.text}</>
                : l.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* SL locomotive */}
        {slPos !== null && (
          <div style={{ overflow: "hidden", whiteSpace: "pre", lineHeight: "1.45em", color: "#c8a070", userSelect: "none", pointerEvents: "none" }}>
            {SL_ART.map((line, i) => {
              const pad     = slPos > 0 ? " ".repeat(slPos) : "";
              const clip    = Math.max(0, -slPos);
              const visible = (pad + line).slice(clip, clip + TW);
              return <div key={i}>{visible}</div>;
            })}
          </div>
        )}

        {/* Snake */}
        {snake && (
          <div style={{ whiteSpace: "pre", lineHeight: "1.45em", color: snake.alive ? "#f0ede6" : "#c46a6a", userSelect: "none", pointerEvents: "none" }}>
            {drawSnake(snake).map((row, i) => <div key={i}>{row}</div>)}
          </div>
        )}

        <div className="iterm-input-row">
          <span className="iterm-prompt">~ $ </span>
          <input
            ref={inputRef}
            className="iterm-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder={snake ? "arrows to move..." : "type a command…"}
          />
        </div>
      </div>
    </motion.div>
  );
}
