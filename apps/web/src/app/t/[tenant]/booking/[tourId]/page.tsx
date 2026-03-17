import { Card } from "@/components/ui/card";

const steps = ["Date selection", "Participants", "Extras", "Customer details", "Payment", "Confirmation"];

export default async function BookingFlowPage({ params }: { params: Promise<{ tenant: string; tourId: string }> }) {
  const { tenant, tourId } = await params;

  return (
    <main className="page-shell space-y-8 pb-24">
      <section className="hero-shell">
        <h1 className="text-4xl font-extrabold">Concierge booking flow</h1>
        <p className="mt-2 text-muted">Tenant: {tenant} · Tour ID: {tourId}</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card className="p-5">
          <div className="mb-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {steps.map((step, index) => (
              <div key={step} className={`rounded-xl px-3 py-2 text-center text-xs font-semibold ${index === 0 ? "bg-primary text-white" : "bg-bg text-muted"}`}>
                {step}
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-border bg-bg p-4 text-sm text-muted">
            Elegant step transitions, inline validation, and real-time price updates are rendered here.
          </div>
        </Card>

        <aside className="premium-card p-5">
          <h2 className="text-lg font-bold">Booking summary</h2>
          <div className="mt-3 space-y-2 text-sm text-muted">
            <p>Base package: $89</p>
            <p>Add-ons: $14</p>
            <p>Taxes: $9</p>
          </div>
          <p className="mt-4 text-2xl font-extrabold text-primary">$112 total</p>
        </aside>
      </section>
    </main>
  );
}
