export default async function BlogPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  return (
    <main className="page-shell pb-24">
      <section className="hero-shell">
        <h1 className="text-4xl font-extrabold">{tenant} journal</h1>
        <p className="mt-2 text-muted">Travel tips, local culture guides, and seasonal inspiration.</p>
      </section>
    </main>
  );
}
