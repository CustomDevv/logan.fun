import Link from "next/link";

const tiles = [
  { href: "/days-since", title: "Days Since…", blurb: "How long since a moment?" },
  { href: "/life-weeks", title: "Life in Weeks", blurb: "Your life as a grid." },
  { href: "/spend-elon-money", title: "Spend Elon's Money", blurb: "Can you burn through $230 billion?" },
  { href: "/guess-the-flag", title: "Guess the Flag", blurb: "Can you name the country?" },
];

export default function Home() {
  return (
    <main className="min-h-screen max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">logan.fun</h1>
      <p className="text-zinc-400 mb-8">Tiny, playful web experiments. New ones appear over time.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {tiles.map(t => (
          <Link key={t.href} href={t.href}
            className="rounded-2xl border border-zinc-800 p-5 hover:bg-zinc-900 transition">
            <h2 className="text-xl font-semibold">{t.title} →</h2>
            <p className="text-zinc-400 mt-1">{t.blurb}</p>
          </Link>
        ))}
      </div>
      <footer className="text-xs text-zinc-500 mt-12">Made with Next.js • new toys appear over time</footer>
    </main>
  );
}
