"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type Country = { code: string; name: string };

const COUNTRIES: Country[] = [
  { code: "us", name: "United States" },
  { code: "ca", name: "Canada" },
  { code: "mx", name: "Mexico" },
  { code: "br", name: "Brazil" },
  { code: "ar", name: "Argentina" },
  { code: "gb", name: "United Kingdom" },
  { code: "fr", name: "France" },
  { code: "de", name: "Germany" },
  { code: "it", name: "Italy" },
  { code: "es", name: "Spain" },
  { code: "pt", name: "Portugal" },
  { code: "nl", name: "Netherlands" },
  { code: "se", name: "Sweden" },
  { code: "no", name: "Norway" },
  { code: "dk", name: "Denmark" },
  { code: "fi", name: "Finland" },
  { code: "pl", name: "Poland" },
  { code: "ua", name: "Ukraine" },
  { code: "ru", name: "Russia" },
  { code: "tr", name: "Türkiye" },
  { code: "sa", name: "Saudi Arabia" },
  { code: "ae", name: "United Arab Emirates" },
  { code: "il", name: "Israel" },
  { code: "jp", name: "Japan" },
  { code: "kr", name: "South Korea" },
  { code: "cn", name: "China" },
  { code: "in", name: "India" },
  { code: "pk", name: "Pakistan" },
  { code: "id", name: "Indonesia" },
  { code: "au", name: "Australia" },
  { code: "nz", name: "New Zealand" },
  { code: "za", name: "South Africa" },
  { code: "eg", name: "Egypt" },
  { code: "ng", name: "Nigeria" },
  { code: "ke", name: "Kenya" },
  { code: "ma", name: "Morocco" },
  { code: "gr", name: "Greece" },
  { code: "ie", name: "Ireland" },
  { code: "ch", name: "Switzerland" },
  { code: "at", name: "Austria" },
  { code: "th", name: "Thailand" },
  { code: "sg", name: "Singapore" },
  { code: "ph", name: "Philippines" },
  { code: "vn", name: "Vietnam" },
  { code: "bd", name: "Bangladesh" },
  { code: "cl", name: "Chile" },
  { code: "co", name: "Colombia" },
  { code: "pe", name: "Peru" },
  { code: "cz", name: "Czech Republic" },
  { code: "hu", name: "Hungary" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function GuessTheFlag() {
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [round, setRound] = useState(1);

  const [answered, setAnswered] = useState<null | string>(null);
  const [correct, setCorrect] = useState<Country | null>(null);
  const [choices, setChoices] = useState<Country[]>([]);
  const [imgKey, setImgKey] = useState(0);

  const [recent, setRecent] = useState<string[]>([]); // avoid immediate repeats
  const recentRef = useRef<string[]>([]);
  useEffect(() => {
    recentRef.current = recent;
  }, [recent]);

  const [isPicking, setIsPicking] = useState(false); // prevent rapid double clicks
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);

  // load best from localStorage
  useEffect(() => {
    const b = localStorage.getItem("flag_best_score");
    if (b) setBest(Number(b));
  }, []);

  // Stable question generator (no deps) — reads recent via ref to avoid loops
  const pickNewAnswer = useCallback(() => {
    const pool = shuffle(COUNTRIES);
    const avoid = recentRef.current;
    const answer = pool.find((c) => !avoid.includes(c.code)) ?? pool[0];

    const distractors = shuffle(pool.filter((c) => c.code !== answer.code)).slice(0, 3);
    const opts = shuffle([answer, ...distractors]);

    setCorrect(answer);
    setChoices(opts);
    setAnswered(null);
    setImgKey((k) => k + 1);
    setRecent((r) => [answer.code, ...r].slice(0, 5));
  }, []);

  // first load — run once
  useEffect(() => {
    pickNewAnswer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canNext = useMemo(() => answered !== null, [answered]);

  // Keyboard controls
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!correct) return;

      // 1–4 to pick
      if (!answered && ["1", "2", "3", "4"].includes(e.key)) {
        const idx = Number(e.key) - 1;
        const opt = choices[idx];
        if (opt) handlePick(opt);
      }

      // Enter/Space to Next
      if (canNext && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        nextRound();
      }

      // R to reset
      if (e.key.toLowerCase() === "r") {
        resetGame();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answered, choices, correct, canNext]);

  function handlePick(option: Country) {
    if (answered || isPicking) return;
    setIsPicking(true);
    setAnswered(option.code);

    const isRight = option.code === correct?.code;
    if (isRight) {
      setScore((s) => {
        const newScore = s + 1;
        setBest((b) => {
          if (newScore > b) {
            localStorage.setItem("flag_best_score", String(newScore));
            return newScore;
          }
          return b;
        });
        return newScore;
      });
    }

    // Re-enable shortly (prevents accidental double answers)
    setTimeout(() => setIsPicking(false), 100);
  }

  function nextRound() {
    if (!canNext) return;
    setRound((r) => r + 1);
    pickNewAnswer();
    // focus for keyboard users
    requestAnimationFrame(() => {
      nextBtnRef.current?.focus();
    });
  }

  function resetGame() {
    setScore(0);
    setRound(1);
    setAnswered(null);
    setRecent([]);
    pickNewAnswer();
  }

  const imgSrc = correct ? `https://flagcdn.com/w640/${correct.code}.png` : "";

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Home link */}
      <Link
        href="/"
        className="fixed top-5 left-5 bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-full text-sm text-zinc-300 hover:bg-zinc-800"
      >
        ← Home
      </Link>

      <section className="max-w-3xl mx-auto px-4 pt-20 pb-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold">Guess the Flag</h1>
        <p className="text-zinc-400 mt-2">
          Round <span className="text-white font-semibold">{round}</span> • Score{" "}
          <span className="text-white font-semibold">{score}</span> • Best{" "}
          <span className="text-white font-semibold">{best}</span>
        </p>

        {/* Flag image */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
          {correct && (
            <img
              key={imgKey}
              src={imgSrc}
              alt={`Flag of ${correct.name}`}
              className="w-full h-auto"
              // Let the browser manage loading; removing eager reduces flicker
              onError={(e) => {
                // fallback to SVG if PNG fails
                (e.currentTarget as HTMLImageElement).src = `https://flagcdn.com/${correct.code}.svg`;
              }}
            />
          )}
        </div>

        {/* Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          {choices.map((c, i) => {
            const isCorrect = answered && c.code === correct?.code;
            const isWrongPick = answered === c.code && !isCorrect;
            const showIdle = !answered;

            return (
              <button
                key={c.code}
                onClick={() => handlePick(c)}
                disabled={!!answered || isPicking}
                className={[
                  "text-left px-4 py-3 rounded-xl border transition select-none outline-none focus:ring-2 focus:ring-white/30",
                  showIdle
                    ? "border-zinc-700 hover:bg-zinc-900"
                    : isCorrect
                    ? "border-green-500 bg-green-900/30"
                    : isWrongPick
                    ? "border-red-500 bg-red-900/30"
                    : "border-zinc-800 bg-zinc-900/30 text-zinc-400",
                ].join(" ")}
                aria-label={`Option ${i + 1}: ${c.name}`}
              >
                <span className="mr-2 text-xs opacity-60">{i + 1}.</span>
                {c.name}
              </button>
            );
          })}
        </div>

        {/* Feedback + Controls */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="text-sm" aria-live="polite">
            {answered && correct ? (
              answered === correct.code ? (
                <span className="text-green-400 font-semibold">Correct! </span>
              ) : (
                <span className="text-red-400 font-semibold">Wrong. </span>
              )
            ) : null}
            {answered && correct && (
              <span>
                The flag was <span className="font-semibold">{correct.name}</span>.
              </span>
            )}
            {!answered && (
              <span className="text-zinc-400">
                Pick an answer (1–4). Press{" "}
                <kbd className="px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700">R</kbd> to reset.
              </span>
            )}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={resetGame}
              className="border border-zinc-700 px-4 py-2 rounded-lg hover:bg-zinc-900 text-sm text-zinc-300"
              aria-label="Reset game"
            >
              Reset
            </button>
            <button
              ref={nextBtnRef}
              onClick={nextRound}
              disabled={!canNext}
              className={[
                "px-4 py-2 rounded-lg text-sm font-semibold outline-none focus:ring-2 focus:ring-white/30",
                canNext
                  ? "bg-white text-black hover:opacity-90"
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed",
              ].join(" ")}
              aria-disabled={!canNext}
              aria-label="Next round"
            >
              Next
            </button>
          </div>
        </div>

        <p className="mt-3 text-xs text-zinc-500">
          Images via flagcdn.com • {COUNTRIES.length} countries in pool
        </p>
      </section>
    </main>
  );
}
