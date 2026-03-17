export default async function BookingConfirmationPage({ params }: { params: Promise<{ tenant: string; id: string }> }) {
  const { tenant, id } = await params;
  return (
    <main className="page-shell pb-24">
      <section className="hero-shell text-center">
        <p className="mx-auto inline-flex size-16 animate-float items-center justify-center rounded-full bg-success/20 text-2xl">✓</p>
        <h1 className="mt-4 text-4xl font-extrabold">Your adventure is confirmed</h1>
        <p className="mt-2 text-muted">Tenant: {tenant} · Confirmation: {id}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white">Download voucher</button>
          <button className="min-h-11 rounded-xl border border-border bg-surface px-5 text-sm font-bold text-ink">Add to calendar</button>
        </div>
      </section>
    </main>
  );
}
