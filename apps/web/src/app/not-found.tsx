export default function NotFound() {
  return (
    <main className="page-shell pb-24">
      <section className="hero-shell text-center">
        <p className="text-4xl">🧭</p>
        <h1 className="mt-3 text-3xl font-extrabold">This path is not on the map</h1>
        <p className="mt-2 text-muted">The page moved or never existed. Let us guide you back.</p>
        <a href="/" className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-white">
          Back to home
        </a>
      </section>
    </main>
  );
}
