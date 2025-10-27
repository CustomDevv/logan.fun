import Link from "next/link";

type Tile = { href?: string; title: string; blurb: string; new?: boolean; comingSoon?: boolean };

const tiles: Tile[] = [
  { href: "/days-since", title: "Days Since…", blurb: "How long since a moment?" },
  { href: "/life-weeks", title: "Life in Weeks", blurb: "Your life as a grid." },
  { href: "/spend-elon-money", title: "Spend Elon's Money", blurb: "Can you burn through $230 billion?" },
  { href: "/guess-the-flag", title: "Guess the Flag", blurb: "Can you name the country?", new: true },
  { title: "???", blurb: "New experiment in progress 👀", comingSoon: true },
  { title: "???", blurb: "New experiment in progress 👀", comingSoon: true },
];

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-purple-600/15 via-blue-500/10 to-transparent bg-[length:200%_200%] animate-gradient-blur" />

      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-1">logan.fun</h1>

        <p className="text-zinc-400 mb-8">
          
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
                <h2 className="text-xl font-semibold">
                  {t.title} →
                  {t.comingSoon && (
                    <span className="ml-2 text-xs align-middle bg-yellow-700/30 text-yellow-300 px-2 py-0.5 rounded-full">
                      COMING SOON
                    </span>
                  )}
                </h2>
                <p className="text-zinc-400 mt-1">{t.blurb}</p>
              </div>
            )
          )}
        </div>

        <footer className="text-xs text-zinc-600 mt-12 text-center space-y-1">
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

  <p>
    <a
      href="https://youtube.com/customdevv"
      className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition hover:brightness-110 hover:-translate-y-[1px]"
      target="_blank"
      rel="noreferrer"
    >
      <span className="text-[10px] bg-red-700/30 text-red-300 px-2 py-0.5 rounded-full font-semibold transition hover:brightness-110 hover:-translate-y-[1px]">
        CustomDev
      </span>
      <span>on YouTube</span>
    </a>
  </p>

  <p>
    <a
      href="https://github.com/CustomDevv/logan.fun"
      className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition hover:brightness-110 hover:-translate-y-[1px]"
      target="_blank"
      rel="noreferrer"
      aria-label="logan.fun repository on GitHub"
    >
      <span className="relative group">
        <span
          className="text-[10px] bg-green-700/30 text-green-300 px-2 py-0.5 rounded-full font-semibold cursor-help transition hover:brightness-110 hover:-translate-y-[1px]"
          title="MIT License — free to use, remix, or learn from."
        >
          OPEN SOURCE
        </span>
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden opacity-0 group-hover:block group-hover:opacity-100 whitespace-nowrap text-[10px] bg-zinc-800 text-zinc-200 px-2 py-1 rounded-md border border-zinc-700 shadow-lg transition-opacity duration-200"
        >
          MIT License — free to use, remix, or learn from.
        </span>
      </span>
      <span>on GitHub</span>
    </a>
  </p>
</footer>


      </main>
    </div>
  );
}
