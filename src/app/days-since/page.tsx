"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

export default function DaysSince() {
  const [date, setDate] = useState<string>("");
  const result = useMemo(() => {
    if (!date) return null;
    const start = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    if (isNaN(diffMs)) return null;
    const days = Math.floor(diffMs / 86400000);
    const hours = Math.floor((diffMs % 86400000) / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    return { days, hours, minutes };
  }, [date]);

  return (
    <main className="min-h-screen max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Days Since…</h1>
      <input
        type="date" value={date} onChange={e => setDate(e.target.value)}
        className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white"
      />
      <div className="mt-8 text-5xl font-bold">
        {result ? (
          <div className="space-y-2">
            <div>{result.days.toLocaleString()} days</div>
            <div className="text-zinc-400 text-2xl">{result.hours} hours • {result.minutes} minutes</div>
          </div>
        ) : <div className="text-zinc-500 text-xl">Pick a date to begin</div>}
      </div>
      <Link
  href="/"
  className="fixed top-5 left-5 bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-full text-sm text-zinc-300 hover:bg-zinc-800"
>
  ← Home
</Link>

    </main>
  );
}
