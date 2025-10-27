import Link from "next/link";

type Tile = { href?: string; title: string; blurb: string; new?: boolean };

const tiles: Tile[] = [
  { href: "/days-since", title: "Days Since…", blurb: "How long since a moment?" },
  { href: "/life-weeks", title: "Life in Weeks", blurb: "Your life as a grid." },
  { href: "/spend-elon-money", title: "Spend Elon's Money", blurb: "Can you burn through $230 billion?" },
  { href: "/guess-the-flag", title: "Guess the Flag", blurb: "Can you name the country?", new: true },
  { title: "???", blurb: "New experiment in progress 👀" },
  { title: "???", blurb: "New experiment in progress 👀" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-purple-600/15 via-blue-500/10 to-transparent bg-[length:200%_200%] animate-gradient-blur" />

      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-2">logan.fun</h1>

        <p className="text-zinc-400">
          <a
            href="https://github.com/CustomDevv/logan.fun"
            className="underline hover:text-blue-500"
            target="_blank"
            rel="noreferrer"
          >
            Go to Github
          </a>
          <br />
          Tiny, playful web experiments. New ones appear over time.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {tiles.map((t, i) =>
            t.href ? (
              <Link
                key={`${t.href}-${i}`}
                href={t.href}
                className="rounded-2xl border border-zinc-800 p-5 hover:bg-zinc-900/60 transition-all hover:-translate-y-1"
              >
                <h2 className="text-xl font-semibold">
                  {t.title} →
                  {t.new && (
                    <span className="ml-2 text-xs align-middle bg-emerald-700/30 text-emerald-300 px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                </h2>
                <p className="text-zinc-400 mt-1">{t.blurb}</p>
              </Link>
            ) : (
              <div
                key={`pending-${i}`}
                className="rounded-2xl border border-zinc-800 p-5 opacity-60"
                aria-disabled="true"
              >
                <h2 className="text-xl font-semibold">{t.title} →</h2>
                <p className="text-zinc-400 mt-1">{t.blurb}</p>
              </div>
            )
          )}
        </div>

        <footer className="text-xs text-zinc-600 mt-12 text-center">
          <p>
            Made by{" "}
            <a
              href="https://github.com/CustomDevv"
              className="underline hover:text-zinc-400"
              target="_blank"
              rel="noreferrer"
            >
              Logan Whitcomb
            </a>{" "}
            — new toys appear over time 🚀
          </p>
        </footer>
      </main>
    </div>
  );
}
