"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const PERSON_NAME = "Elon Musk";
const BUDGET = 230_000_000_000; // $230B

const CATALOG = [
  { id: "coffee", emoji: "☕️", name: "Coffee", price: 5 },
  { id: "tesla", emoji: "🚗", name: "Tesla Model S", price: 95_000 },
  { id: "cybertruck", emoji: "🚙", name: "Tesla Cybertruck", price: 110_000 },
  { id: "spacex", emoji: "🚀", name: "SpaceX Rocket Launch", price: 62_000_000 },
  { id: "mars", emoji: "🪐", name: "Ticket to Mars (1-way)", price: 500_000_000 },
  { id: "flamethrower", emoji: "🔥", name: "Boring Co. Flamethrower", price: 500 },
  { id: "neuralink", emoji: "🧠", name: "Neuralink Implant", price: 20_000 },
  { id: "twitter", emoji: "🐦", name: "Twitter (X) Purchase", price: 44_000_000_000 },
  { id: "solar", emoji: "☀️", name: "Solar Roof for Mansion", price: 80_000 },
  { id: "dogecoin", emoji: "🐕", name: "1,000,000 Dogecoin", price: 85_000 },
  { id: "robot", emoji: "🤖", name: "Tesla Bot", price: 25_000 },
  { id: "tunnel", emoji: "🚇", name: "Boring Company Tunnel", price: 50_000_000 },
  { id: "jet", emoji: "✈️", name: "Gulfstream Private Jet", price: 70_000_000 },
  { id: "factory", emoji: "🏭", name: "New Gigafactory", price: 1_100_000_000 },
  { id: "mansion", emoji: "🏠", name: "Luxury Mansion", price: 45_000_000 },
  { id: "rocketengine", emoji: "⚙️", name: "Raptor Rocket Engine", price: 2_000_000 },
  { id: "stock", emoji: "📈", name: "1% of Tesla Stock", price: 9_000_000_000 },
  { id: "yacht", emoji: "🛥️", name: "Mega Yacht", price: 500_000_000 },
  { id: "satellite", emoji: "🛰️", name: "Starlink Satellite", price: 250_000 },
  { id: "teslabotarmy", emoji: "🤖", name: "Army of 1,000 Tesla Bots", price: 25_000_000 },
];

function fmt(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function SpendElonMoney() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const subtotal = useMemo(
    () => CATALOG.reduce((sum, i) => sum + (quantities[i.id] || 0) * i.price, 0),
    [quantities]
  );
  const remaining = Math.max(0, BUDGET - subtotal);
  const spentPct = Math.min(100, (subtotal / BUDGET) * 100);

  function setQty(id: string, q: number) {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, Math.floor(q || 0)) }));
  }

  function add(id: string) {
    setQty(id, (quantities[id] || 0) + 1);
  }

  function sub(id: string) {
    setQty(id, (quantities[id] || 0) - 1);
  }

  function reset() {
    setQuantities({});
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Link
  href="/"
  className="fixed top-5 left-5 bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-full text-sm text-zinc-300 hover:bg-zinc-800"
>
  ← Home
</Link>

      <section className="max-w-6xl mx-auto px-4 pt-14 pb-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold">Spend {PERSON_NAME}’s Money</h1>
        <p className="text-zinc-400 mt-2 text-lg">
          Total Budget: <span className="text-white font-semibold">{fmt(BUDGET)}</span>
        </p>

        {/* Progress Bar */}
        <div className="mt-5">
          <div className="flex justify-between text-sm text-zinc-400">
            <span>Spent: {fmt(subtotal)}</span>
            <span>Remaining: <span className="text-white">{fmt(remaining)}</span></span>
          </div>
          <div className="h-3 bg-zinc-800 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-white transition-all" style={{ width: `${spentPct}%` }}></div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={reset}
            className="border border-zinc-700 px-4 py-2 rounded-lg hover:bg-zinc-900 text-sm text-zinc-300"
          >
            Reset All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {CATALOG.map((item) => {
            const qty = quantities[item.id] || 0;
            return (
              <div key={item.id} className="border border-zinc-800 bg-zinc-950 rounded-2xl p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{item.emoji}</div>
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-zinc-400 text-sm">{fmt(item.price)}</div>
                    </div>
                  </div>
                  {qty > 0 && (
                    <div className="text-right">
                      <div className="text-sm text-zinc-400">You own</div>
                      <div className="font-bold text-lg">{qty}</div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => sub(item.id)}
                    disabled={qty === 0}
                    className={`px-3 py-2 rounded-lg border ${qty === 0 ? "border-zinc-800 text-zinc-700" : "border-zinc-700 hover:bg-zinc-900"}`}
                  >
                    −
                  </button>

                  <input
                    inputMode="numeric"
                    value={qty}
                    onChange={(e) => setQty(item.id, Number(e.target.value))}
                    className="w-20 text-center bg-zinc-900 border border-zinc-800 rounded-lg py-2"
                  />

                  <button
                    onClick={() => add(item.id)}
                    disabled={subtotal + item.price > BUDGET}
                    className={`px-3 py-2 rounded-lg border ${subtotal + item.price > BUDGET ? "border-zinc-800 text-zinc-700" : "border-zinc-700 hover:bg-zinc-900"}`}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
