"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

/**
 * Data source:
 * Using flagcdn.com for images (fast & free).
 * Code = ISO 3166-1 alpha-2 (lowercase).
 */
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
  const [imgKey, setImgKey] = useState(0); // force image rerender to avoid cache flash

  // load best from localStorage
  useEffect(() => {
    const b = localStorage.getItem("flag_best_score");
    if (b) setBest(Number(b));
  }, []);

  // prepare a new question
  function newQuestion() {
    const pool = shuffle(COUNTRIES);
    const answer = pool[0];
    const distractors = shuffle(pool.slice(1, 30)).slice(0, 3);
    const opts = shuffle([answer, ...distractors]);
    setCorrect(answer);
    setChoices(opts);
    setAnswered(null);
    setImgKey((k) => k + 1);
  }

  // first load
  useEffect(() => {
    newQuestion();
  }, []);

  const canNext = useMemo(() => answered !== null, [answered]);

  function pick(option: Country) {
    if (answered) return;
    setAnswered(option.code);
    const isRight = option.code === correct?.code;
    if (isRight) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > best) {
        setBest(newScore);
        localStorage.setItem("flag_best_score", String(newScore));
      }
    }
  }

  function nextRound() {
    if (!canNext) return;
    setRound((r) => r + 1);
    newQuestion();
  }

  function resetGame() {
    setScore(0);
    setRound(1);
    setAnswered(null);
    newQuestion();
  }

  const imgSrc = correct ? `https://flagcdn.com/w640/${correct.code}.png` : "";

  return (
    <main className="min-h-screen bg-black text-white">
      {/* REQUIRED HOME LINK (as you asked) */}
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
              alt={`Flag to guess`}
              className="w-full h-auto"
              loading="eager"
            />
          )}
        </div>

        {/* Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          {choices.map((c) => {
            const isCorrect = answered && c.code === correct?.code;
            const isWrongPick = answered === c.code && !isCorrect;
            return (
              <button
                key={c.code}
                onClick={() => pick(c)}
                disabled={!!answered}
                className={[
                  "text-left px-4 py-3 rounded-xl border transition select-none",
                  !answered
                    ? "border-zinc-700 hover:bg-zinc-900"
                    : isCorrect
                    ? "border-green-500 bg-green-900/30"
                    : isWrongPick
                    ? "border-red-500 bg-red-900/30"
                    : "border-zinc-800 bg-zinc-900/30 text-zinc-400",
                ].join(" ")}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        {/* Feedback + Controls */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {answered && correct && (
            <div className="text-sm">
              {answered === correct.code ? (
                <span className="text-green-400 font-semibold">Correct! </span>
              ) : (
                <span className="text-red-400 font-semibold">Wrong. </span>
              )}
              The flag was <span className="font-semibold">{correct.name}</span>.
            </div>
          )}

          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={resetGame}
              className="border border-zinc-700 px-4 py-2 rounded-lg hover:bg-zinc-900 text-sm text-zinc-300"
            >
              Reset
            </button>
            <button
              onClick={nextRound}
              disabled={!canNext}
              className={[
                "px-4 py-2 rounded-lg text-sm font-semibold",
                canNext
                  ? "bg-white text-black hover:opacity-90"
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed",
              ].join(" ")}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
