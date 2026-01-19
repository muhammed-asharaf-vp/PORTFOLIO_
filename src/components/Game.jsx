"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
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

export default function TypingSpeedGame() {
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const texts = useMemo(
    () => [
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
    ],
    [],
  );

  // ---------------- STATE ----------------
  const [difficulty, setDifficulty] = useState("easy");
  const duration = DIFFICULTIES[difficulty].duration;

  const [quote, setQuote] = useState("");
  const [typed, setTyped] = useState("");

  const [isPlaying, setIsPlaying] = useState(false); // timer running
  const [isOver, setIsOver] = useState(false);

  // 👇 NEW: game ready but timer not started until first key press
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const [timeLeft, setTimeLeft] = useState(duration);

  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const [bestWpm, setBestWpm] = useState(0);

  // ---------------- BEST SCORE PER DIFFICULTY ----------------
  useEffect(() => {
    const saved = Number(
      localStorage.getItem(`typing_best_wpm_${difficulty}`) || 0,
    );
    setBestWpm(saved);
  }, [difficulty]);

  // ---------------- HELPERS ----------------
  const pickQuote = () => {
    const { minWords, maxWords } = DIFFICULTIES[difficulty];

    const filtered = texts.filter((t) => {
      const wc = t.split(" ").length;
      return wc >= minWords && wc <= maxWords;
    });

    const pool = filtered.length ? filtered : texts;
    const random = pool[Math.floor(Math.random() * pool.length)];
    setQuote(random);
  };

  // ---------------- GAME ----------------
  const startGame = () => {
    pickQuote();
    setTyped("");
    setWpm(0);
    setAccuracy(100);

    setTimeLeft(duration);

    // 👇 important changes
    setHasStartedTyping(false); // timer not started yet
    setIsPlaying(false); // timer OFF until first key press
    setIsOver(false);

    gsap.fromTo(
      containerRef.current,
      { scale: 0.98, opacity: 0.7 },
      { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" },
    );

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const endGame = () => {
    setIsPlaying(false);
    setIsOver(true);

    setBestWpm((prev) => {
      const newBest = Math.max(prev, wpm);
      localStorage.setItem(`typing_best_wpm_${difficulty}`, String(newBest));
      return newBest;
    });

    gsap.fromTo(
      ".result-pop",
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: "power3.out", stagger: 0.08 },
    );
  };

  // ---------------- TIMER ----------------
  useEffect(() => {
    let interval;

    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }

    if (isPlaying && timeLeft === 0) {
      endGame();
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  // reset when difficulty changes (only if not playing)
  useEffect(() => {
    if (!isPlaying) {
      setTimeLeft(duration);
      setTyped("");
      setQuote("");
      setWpm(0);
      setAccuracy(100);
      setIsOver(false);
      setHasStartedTyping(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  // ---------------- CALCULATE WPM + ACC ----------------
  useEffect(() => {
    if (!isPlaying) return;

    const elapsed = duration - timeLeft;
    const minutes = elapsed / 60;

    const correctChars = typed
      .split("")
      .filter((ch, i) => ch === quote[i]).length;

    const words = correctChars / 5;
    const calcWpm = minutes > 0 ? Math.round(words / minutes) : 0;
    setWpm(calcWpm);

    const totalTyped = typed.length;
    const acc =
      totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;
    setAccuracy(acc);

    if (typed.length >= quote.length && quote.length > 0) {
      endGame();
    }
  }, [typed, timeLeft, isPlaying, quote, duration]);

  // ---------------- INPUT HANDLER ----------------
  const handleTyping = (value) => {
    // do nothing if game is over
    if (isOver) return;

    // first key press => start timer
    if (!hasStartedTyping && quote.length > 0) {
      setHasStartedTyping(true);
      setIsPlaying(true);
    }

    setTyped(value);
  };

  // ---------------- RENDER QUOTE ----------------
  const renderQuote = () =>
    quote.split("").map((ch, i) => {
      const typedChar = typed[i];

      let className = "opacity-50";
      if (typedChar == null) className = "opacity-40";
      else if (typedChar === ch) className = "text-[var(--accent)]";
      else className = "text-red-500";

      return (
        <span key={i} className={className}>
          {ch}
        </span>
      );
    });

  return (
    <section className="relative w-full py-24 px-4 bg-[var(--background)] text-[var(--foreground)] overflow-hidden select-none">
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
                  disabled={isPlaying}
                  onClick={() => setDifficulty(key)}
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
                <FiType /> Session HUD
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <Stat label="WPM" value={wpm} accent />
                <Stat label="Accuracy" value={`${accuracy}%`} />
                <Stat
                  label="Time"
                  value={`00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}
                  danger={timeLeft <= 5 && isPlaying}
                />
                <Stat label="Best" value={bestWpm} />
              </div>

              <div className="mt-6 flex gap-3">
                {!quote ? (
                  <button
                    onClick={startGame}
                    className="cursor-dot-zone w-full px-6 py-3 bg-[var(--accent)] text-black font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition"
                  >
                    Start
                  </button>
                ) : (
                  <button
                    onClick={startGame}
                    className="cursor-dot-zone w-full px-6 py-3 border border-[var(--border-color)] font-bold uppercase tracking-widest hover:bg-[var(--foreground)] hover:text-[var(--background)] transition"
                  >
                    <span className="flex items-center justify-center gap-2 pointer-events-none">
                      <FiRefreshCw /> Restart
                    </span>
                  </button>
                )}
              </div>

              {/* 👇 show this when quote is ready but timer not started */}
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
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)]/40 p-6 font-mono text-lg leading-relaxed">
                {quote ? (
                  renderQuote()
                ) : (
                  <span className="opacity-40">Click Start to begin...</span>
                )}
              </div>

              {/* Input */}
              <div className="mt-6">
                <input
                  ref={inputRef}
                  value={typed}
                  onChange={(e) => handleTyping(e.target.value)}
                  disabled={!quote || isOver}
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
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <MiniStat label="WPM" value={wpm} accent />
              <MiniStat label="ACC" value={`${accuracy}%`} />
              <MiniStat label="BEST" value={bestWpm} />
            </div>

            {!quote ? (
              <button
                onClick={startGame}
                className="cursor-dot-zone w-full px-6 py-3 bg-[var(--accent)] text-black font-bold uppercase tracking-widest active:scale-95 transition"
              >
                Start
              </button>
            ) : (
              <button
                onClick={startGame}
                className="cursor-dot-zone w-full px-6 py-3 border border-[var(--border-color)] font-bold uppercase tracking-widest hover:bg-[var(--foreground)] hover:text-[var(--background)] transition"
              >
                <span className="flex items-center justify-center gap-2 pointer-events-none">
                  <FiRefreshCw /> Restart
                </span>
              </button>
            )}

            {quote && !hasStartedTyping && !isOver && (
              <p className="mt-3 text-[11px] font-mono uppercase tracking-widest opacity-60 text-center">
                Press any key to start...
              </p>
            )}
          </div>

          <div className="mt-5 rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-md p-5">
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)]/40 p-5 font-mono text-base leading-relaxed">
              {quote ? (
                renderQuote()
              ) : (
                <span className="opacity-40">Tap Start to begin...</span>
              )}
            </div>

            <input
              ref={inputRef}
              value={typed}
              onChange={(e) => handleTyping(e.target.value)}
              disabled={!quote || isOver}
              placeholder={
                !quote
                  ? "Press Start"
                  : hasStartedTyping
                    ? "Type here..."
                    : "Press any key to start..."
              }
              className="cursor-dot-zone mt-4 w-full px-4 py-4 rounded-2xl bg-[var(--background)] border border-[var(--border-color)] focus:outline-none focus:border-[var(--accent)] font-mono text-sm"
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
