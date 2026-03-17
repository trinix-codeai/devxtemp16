export default async function AboutPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  return (
    <main className="page-shell pb-24">
      <section className="hero-shell">
        <h1 className="text-4xl font-extrabold">About {tenant}</h1>
        <p className="mt-2 max-w-2xl text-muted">Story, team, values, and certifications with authentic media and warm brand voice.</p>
      </section>
    </main>
  );
}
