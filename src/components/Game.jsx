"use client";

import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiRefreshCw, FiType } from "react-icons/fi";

const DIFFICULTIES = {
  easy: {
    label: "Easy",
    duration: 30,
    minWords: 6,
    maxWords: 10,
  },
  medium: {
    label: "Medium",
    duration: 25,
    minWords: 10,
    maxWords: 14,
  },
  hard: {
    label: "Hard",
    duration: 20,
    minWords: 14,
    maxWords: 22,
  },
};

const TEXTS = [
  // easy (6-10 words)
  "build clean scalable ui with reusable components",
  "react next js tailwind gsap for modern frontends",
  "performance accessibility and pixel perfect design",
  "ship fast test often and keep code readable",
  "frontend developer crafting smooth user experiences",
  "optimize rendering and reduce unnecessary re-renders",
  "design systems tokens spacing and consistent typography",
  "animations should feel smooth not heavy and not distracting",
  "focus on user experience speed clarity and accessibility",
  "write maintainable code with clear naming and structure",
  // medium (10-14 words)
  "small focused components are easier to test reuse and reason about over time",
  "lazy load heavy sections so the first paint stays fast on slow networks",
  "a good layout adapts to every screen without hiding important content from users",
  "measure before you optimize because the slowest part is rarely where you expect",
  // hard (14-22 words)
  "keep state as close as possible to where it is used and lift it up only when two components need it",
  "smooth scroll driven animations should run on transforms and opacity so the browser can keep them on the compositor",
  "accessible interfaces use semantic html clear focus states and enough color contrast so everyone can use the product",
  "ship small pull requests with clear descriptions so reviewers can understand the change and merge it with confidence",
];

const TICK_MS = 200;

// ---------------- BEST SCORE STORAGE ----------------
const BEST_EVENT = "typing-best-change";
const bestKey = (difficulty) => `typing_best_wpm_${difficulty}`;

const readBest = (difficulty) => {
  try {
    return Number(localStorage.getItem(bestKey(difficulty))) || 0;
  } catch {
    return 0;
  }
};

const saveBest = (difficulty, wpm) => {
  if (wpm <= readBest(difficulty)) return;
  try {
    localStorage.setItem(bestKey(difficulty), String(wpm));
    window.dispatchEvent(new Event(BEST_EVENT));
  } catch {
    // storage unavailable — keep playing without persistence
  }
};

const subscribeBest = (onChange) => {
  window.addEventListener("storage", onChange);
  window.addEventListener(BEST_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(BEST_EVENT, onChange);
  };
};

// ---------------- SCORING ----------------
const calcStats = (typed, quote, elapsedSec) => {
  let correctChars = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === quote[i]) correctChars++;
  }

  // floor at 1s so the first keystroke doesn't show an absurd WPM
  const minutes = Math.max(elapsedSec, 1) / 60;

  return {
    wpm: typed.length ? Math.round(correctChars / 5 / minutes) : 0,
    accuracy: typed.length
      ? Math.round((correctChars / typed.length) * 100)
      : 100,
  };
};

const pickQuote = (difficulty) => {
  const { minWords, maxWords } = DIFFICULTIES[difficulty];
  const pool = TEXTS.filter((t) => {
    const wc = t.split(" ").length;
    return wc >= minWords && wc <= maxWords;
  });
  return pool[Math.floor(Math.random() * pool.length)];
};

const formatTime = (s) => `00:${s < 10 ? `0${s}` : s}`;

export default function TypingSpeedGame() {
  const desktopInputRef = useRef(null);
  const mobileInputRef = useRef(null);
  const containerRef = useRef(null);

  // ---------------- STATE ----------------
  const [difficulty, setDifficulty] = useState("easy");
  const duration = DIFFICULTIES[difficulty].duration;

  const [quote, setQuote] = useState("");
  const [typed, setTyped] = useState("");
  const [round, setRound] = useState(0);

  // Timer starts on the first key press, not on "Start"
  const [startedAt, setStartedAt] = useState(null);
  const [now, setNow] = useState(0);
  const [isOver, setIsOver] = useState(false);

  const bestWpm = useSyncExternalStore(
    subscribeBest,
    () => readBest(difficulty),
    () => 0,
  );

  // ---------------- DERIVED ----------------
  const hasStartedTyping = startedAt !== null;
  const isPlaying = hasStartedTyping && !isOver;
  const elapsedSec = hasStartedTyping
    ? Math.min((now - startedAt) / 1000, duration)
    : 0;
  const timeLeft = Math.max(0, Math.ceil(duration - elapsedSec));
  const { wpm, accuracy } = calcStats(typed, quote, elapsedSec);

  // ---------------- GAME ----------------
  const resetRound = (nextQuote) => {
    setQuote(nextQuote);
    setTyped("");
    setStartedAt(null);
    setNow(0);
    setIsOver(false);
  };

  const startGame = () => {
    resetRound(pickQuote(difficulty));
    setRound((r) => r + 1);

    gsap.fromTo(
      containerRef.current,
      { scale: 0.98, opacity: 0.7 },
      { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" },
    );
  };

  const changeDifficulty = (key) => {
    if (isPlaying) return;
    setDifficulty(key);
    resetRound("");
  };

  const finish = (finalTyped, endTime) => {
    setNow(endTime);
    setIsOver(true);
    const elapsed = Math.min((endTime - startedAt) / 1000, duration);
    saveBest(difficulty, calcStats(finalTyped, quote, elapsed).wpm);
  };

  // Focus whichever input is visible (desktop and mobile layouts both render one)
  useEffect(() => {
    if (round === 0) return;
    const input = [desktopInputRef.current, mobileInputRef.current].find(
      (el) => el?.offsetParent,
    );
    input?.focus({ preventScroll: true });
  }, [round]);

  // ---------------- TIMER ----------------
  const onTick = useEffectEvent(() => {
    const t = Date.now();
    if (t - startedAt >= duration * 1000) finish(typed, t);
    else setNow(t);
  });

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(onTick, TICK_MS);
    return () => clearInterval(id);
  }, [isPlaying]);

  // Result pop-in, once the result elements are actually rendered
  useGSAP(
    () => {
      if (!isOver) return;
      gsap.fromTo(
        ".result-pop",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power3.out", stagger: 0.08 },
      );
    },
    { scope: containerRef, dependencies: [isOver] },
  );

  // ---------------- INPUT HANDLER ----------------
  const handleTyping = (value) => {
    if (isOver || !quote) return;

    const t = Date.now();
    const next = value.slice(0, quote.length);
    setTyped(next);

    // first key press => start timer
    if (!hasStartedTyping) {
      setStartedAt(t);
      setNow(t);
    } else if (next.length === quote.length) {
      finish(next, t);
    } else {
      setNow(t);
    }
  };

  // ---------------- RENDER QUOTE ----------------
  const renderQuote = () =>
    quote.split("").map((ch, i) => {
      const typedChar = typed[i];

      let className = "opacity-40";
      if (typedChar === ch) className = "text-[var(--accent)]";
      else if (typedChar != null) className = "text-red-500";

      return (
        <span key={i} className={className}>
          {ch}
        </span>
      );
    });

  const inputProps = {
    value: typed,
    onChange: (e) => handleTyping(e.target.value),
    onPaste: (e) => e.preventDefault(),
    disabled: !quote || isOver,
    maxLength: quote.length || undefined,
    "aria-label": "Type the quote",
    autoComplete: "off",
    autoCorrect: "off",
    autoCapitalize: "off",
    spellCheck: false,
  };

  const startButton = (extraClass) =>
    !quote ? (
      <button
        type="button"
        onClick={startGame}
        className={`cursor-dot-zone w-full px-6 py-3 bg-[var(--accent)] text-black font-bold uppercase tracking-widest active:scale-95 transition ${extraClass}`}
      >
        Start
      </button>
    ) : (
      <button
        type="button"
        onClick={startGame}
        className="cursor-dot-zone w-full px-6 py-3 border border-[var(--border-color)] font-bold uppercase tracking-widest hover:bg-[var(--foreground)] hover:text-[var(--background)] transition"
      >
        <span className="flex items-center justify-center gap-2 pointer-events-none">
          <FiRefreshCw aria-hidden="true" /> Restart
        </span>
      </button>
    );

  return (
    <section className="relative w-full py-24 px-4 bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(var(--accent) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div ref={containerRef} className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            Typing <span className="text-[var(--accent)]">Speed</span>
          </h2>
          <p className="mt-3 text-sm md:text-base opacity-70">
            Select difficulty and beat your best WPM.
          </p>
        </div>

        {/* Difficulty Selector */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-2 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)]">
            {Object.keys(DIFFICULTIES).map((key) => {
              const active = difficulty === key;
              return (
                <button
                  key={key}
                  type="button"
                  disabled={isPlaying}
                  aria-pressed={active}
                  onClick={() => changeDifficulty(key)}
                  className={`cursor-dot-zone px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition ${
                    active
                      ? "bg-[var(--accent)] text-black"
                      : "border border-[var(--border-color)] hover:border-[var(--accent)]"
                  } ${isPlaying ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {DIFFICULTIES[key].label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ---------------- DESKTOP UI ---------------- */}
        <div className="hidden md:grid grid-cols-12 gap-6">
          {/* Left HUD */}
          <div className="col-span-4">
            <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-md p-6">
              <h3 className="text-sm font-mono uppercase tracking-widest opacity-70 mb-5 flex items-center gap-2">
                <FiType aria-hidden="true" /> Session HUD
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <Stat label="WPM" value={wpm} accent />
                <Stat label="Accuracy" value={`${accuracy}%`} />
                <Stat
                  label="Time"
                  value={formatTime(timeLeft)}
                  danger={timeLeft <= 5 && isPlaying}
                />
                <Stat label="Best" value={bestWpm} />
              </div>

              <div className="mt-6 flex gap-3">
                {startButton("hover:scale-[1.02]")}
              </div>

              {/* shown when the quote is ready but the timer hasn't started */}
              {quote && !hasStartedTyping && !isOver && (
                <p className="mt-4 text-xs font-mono uppercase tracking-widest opacity-60">
                  Press any key to start...
                </p>
              )}

              {isOver && (
                <div className="mt-6 space-y-2">
                  <p className="result-pop text-xs font-mono uppercase tracking-widest opacity-60">
                    Session Complete
                  </p>
                  <p className="result-pop text-lg font-bold text-[var(--accent)]">
                    {wpm} WPM • {accuracy}% Accuracy
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Game */}
          <div className="col-span-8">
            <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-md p-6">
              {/* Quote */}
              <div className="select-none rounded-2xl border border-[var(--border-color)] bg-[var(--background)]/40 p-6 font-mono text-lg leading-relaxed">
                {quote ? (
                  renderQuote()
                ) : (
                  <span className="opacity-40">Click Start to begin...</span>
                )}
              </div>

              {/* Input */}
              <div className="mt-6">
                <input
                  ref={desktopInputRef}
                  {...inputProps}
                  placeholder={
                    !quote
                      ? "Press Start"
                      : hasStartedTyping
                        ? "Start typing here..."
                        : "Press any key to start..."
                  }
                  className="cursor-dot-zone w-full px-5 py-4 rounded-2xl bg-[var(--background)] border border-[var(--border-color)] focus:outline-none focus:border-[var(--accent)] font-mono text-base"
                />
              </div>

              <p className="mt-4 text-xs opacity-50">
                Tip: Accuracy first, then speed. Difficulty changes time + quote
                length.
              </p>
            </div>
          </div>
        </div>

        {/* ---------------- MOBILE UI ---------------- */}
        <div className="block md:hidden">
          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-md p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-mono uppercase tracking-widest opacity-70">
                Typing Session
              </p>

              <span
                className={`text-xs font-mono uppercase tracking-widest ${
                  timeLeft <= 5 && isPlaying
                    ? "text-red-500 animate-pulse"
                    : "opacity-70"
                }`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <MiniStat label="WPM" value={wpm} accent />
              <MiniStat label="ACC" value={`${accuracy}%`} />
              <MiniStat label="BEST" value={bestWpm} />
            </div>

            {startButton("")}

            {quote && !hasStartedTyping && !isOver && (
              <p className="mt-3 text-[11px] font-mono uppercase tracking-widest opacity-60 text-center">
                Press any key to start...
              </p>
            )}
          </div>

          <div className="mt-5 rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-md p-5">
            <div className="select-none rounded-2xl border border-[var(--border-color)] bg-[var(--background)]/40 p-5 font-mono text-base leading-relaxed">
              {quote ? (
                renderQuote()
              ) : (
                <span className="opacity-40">Tap Start to begin...</span>
              )}
            </div>

            {/* text-base (16px) stops iOS Safari from zooming in on focus */}
            <input
              ref={mobileInputRef}
              {...inputProps}
              placeholder={
                !quote
                  ? "Press Start"
                  : hasStartedTyping
                    ? "Type here..."
                    : "Press any key to start..."
              }
              className="cursor-dot-zone mt-4 w-full px-4 py-4 rounded-2xl bg-[var(--background)] border border-[var(--border-color)] focus:outline-none focus:border-[var(--accent)] font-mono text-base"
            />

            {isOver && (
              <div className="mt-4">
                <p className="result-pop text-xs font-mono uppercase tracking-widest opacity-60">
                  Session Complete
                </p>
                <p className="result-pop text-base font-bold text-[var(--accent)]">
                  {wpm} WPM • {accuracy}% Accuracy
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function Stat({ label, value, accent, danger }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-[var(--background)]/40 border border-[var(--border-color)] rounded-2xl">
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-widest opacity-50">
          {label}
        </span>
        <span
          className={`text-lg font-bold ${
            accent ? "text-[var(--accent)]" : ""
          } ${danger ? "text-red-500 animate-pulse" : ""}`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

function MiniStat({ label, value, accent }) {
  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)]/40 px-3 py-3 text-center">
      <p className="text-[10px] font-mono uppercase tracking-widest opacity-50">
        {label}
      </p>
      <p
        className={`text-lg font-bold ${accent ? "text-[var(--accent)]" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
