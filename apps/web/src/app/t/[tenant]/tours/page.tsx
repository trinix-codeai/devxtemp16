import { Card, CardContent } from "@/components/ui/card";

export default async function ToursPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  return (
    <main className="page-shell space-y-8 pb-24">
      <section className="hero-shell">
        <h1 className="text-4xl font-extrabold">All tours for {tenant}</h1>
        <p className="mt-2 text-muted">Filter by mood, duration, price, and difficulty.</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <aside className="premium-card p-4">
          <h2 className="text-sm font-bold">Filters</h2>
          <div className="mt-4 space-y-3 text-sm text-muted">
            <label className="flex items-center justify-between rounded-xl border border-border bg-bg px-3 py-2">
              Family friendly
              <input type="checkbox" className="size-4" />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-border bg-bg px-3 py-2">
              Free cancellation
              <input type="checkbox" className="size-4" />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-border bg-bg px-3 py-2">
              Duration under 4h
              <input type="checkbox" className="size-4" />
            </label>
          </div>
        </aside>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            "Lagoon Snorkel + Reef Picnic",
            "Village Culture & Craft Walk",
            "Waterfall Picnic Escape",
            "Sunset Sailing & Live Music",
            "Night Market Tasting Tour",
            "Family Beach Adventure",
          ].map((item) => (
            <Card key={item} className="interactive-lift">
              <div className="h-32 rounded-t-[var(--radius-md)] bg-gradient-to-br from-primary/25 to-secondary/25" />
              <CardContent className="pt-4">
                <p className="text-sm font-bold">{item}</p>
                <p className="mt-1 text-sm text-muted">From $59 per traveler</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
