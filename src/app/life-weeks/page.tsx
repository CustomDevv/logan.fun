"use client";
import { useMemo, useState } from "react";

const YEARS = 90, WEEKS = 52;

export default function LifeWeeks() {
  const [birth, setBirth] = useState<string>("");
  const ageWeeks = useMemo(() => {
    if (!birth) return 0;
    const b = new Date(birth).getTime();
    const now = Date.now();
    const weeks = Math.floor((now - b) / (1000 * 60 * 60 * 24 * 7));
    return Math.max(0, weeks);
  }, [birth]);

  return (
    <main className="min-h-screen max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Life in Weeks</h1>
      <input
        type="date" value={birth} onChange={e => setBirth(e.target.value)}
        className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white"
      />
      <p className="text-zinc-400 mt-3">Assuming a 90-year lifespan (~{YEARS*WEEKS} weeks)</p>

      <div className="mt-6 grid grid-cols-26 gap-1">
        {Array.from({ length: YEARS * WEEKS }).map((_, i) => {
          const filled = i < ageWeeks;
          return (
            <div key={i}
              title={`Week ${i + 1}`}
              className={`h-3 w-3 rounded-sm ${filled ? "bg-white" : "bg-zinc-800"}`}
            />
          );
        })}
      </div>

      <style>{`
        .grid-cols-26 { display: grid; grid-template-columns: repeat(26, minmax(0, 1fr)); }
        @media(min-width: 768px){ .grid-cols-26{ grid-template-columns: repeat(52, minmax(0, 1fr)); } }
      `}</style>
    </main>
  );
}
