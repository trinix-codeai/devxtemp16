"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="page-shell pb-24">
      <section className="hero-shell text-center">
        <p className="text-4xl">😕</p>
        <h1 className="mt-3 text-3xl font-extrabold">Something interrupted the journey</h1>
        <p className="mt-2 text-muted">Please try again. If this keeps happening, contact support with this timestamp.</p>
        <button onClick={reset} className="mt-5 min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white">
          Try again
        </button>
      </section>
    </main>
  );
}
