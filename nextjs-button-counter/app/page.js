import Counter from "../components/Counter";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 p-8">
      <h1 className="text-3xl font-semibold">Nico's Button Counter</h1>
      <p className="text-zinc-500 dark:text-zinc-400">
        Reusable, accessible counter component with adjustable step.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 w-full max-w-3xl">
        <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl p-6">
          <h2 className="mb-4 font-medium">Default Counter</h2>
          <Counter />
        </div>

        <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl p-6">
          <h2 className="mb-4 font-medium">Custom Counter (start 5, step 2)</h2>
          <Counter initialCount={5} initialStep={2} />
        </div>
      </div>
    </main>
  );
}
