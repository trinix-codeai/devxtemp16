export default async function ContactPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  return (
    <main className="page-shell pb-24">
      <section className="hero-shell">
        <h1 className="text-4xl font-extrabold">Contact {tenant}</h1>
        <p className="mt-2 text-muted">Friendly support form, destination map, and local office details.</p>
      </section>
    </main>
  );
}
