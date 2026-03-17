export default async function FaqPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  return (
    <main className="page-shell pb-24">
      <section className="hero-shell">
        <h1 className="text-4xl font-extrabold">FAQ · {tenant}</h1>
        <p className="mt-2 text-muted">Clear policies and practical answers in an easy-to-scan layout.</p>
      </section>
    </main>
  );
}
