import Link from "next/link";

export default function Test() {
  return (
  <main className="min-h-screen max-w-5xl mx-auto p-6">
    <h1 className="text-2xl font-bold text-center mb-6">This is a test for pages to come</h1>
    <p className="text-center mb-8">Hello</p>
    
    {/* Back button to go home */}
    <Link
        href="/"
        className="fixed top-5 left-5 bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-full text-sm text-zinc-300 hover:bg-zinc-800"
      >
        ← Home
      </Link>
  </main>
  );
}
