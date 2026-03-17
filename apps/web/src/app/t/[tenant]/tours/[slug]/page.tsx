import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default async function TourDetailsPage({ params }: { params: Promise<{ tenant: string; slug: string }> }) {
  const { tenant, slug } = await params;

  return (
    <main className="page-shell grid gap-4 pb-24 lg:grid-cols-[1fr_360px]">
      <section className="space-y-4">
        <div className="hero-shell">
          <Badge>Best seller</Badge>
          <h1 className="mt-3 text-4xl font-extrabold">{slug.replaceAll("-", " ")}</h1>
          <p className="mt-2 text-muted">Hosted by {tenant} · 4.9 rating · 1.2k reviews</p>
        </div>

        <Card className="p-5">
          <h2 className="text-xl font-bold">Experience overview</h2>
          <p className="mt-2 text-sm text-muted">
            Immersive itinerary with local guides, premium transport, and curated food stops. Perfect for families and
            small groups.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {["6 hours", "Max 12 guests", "Moderate difficulty"].map((item) => (
              <div key={item} className="rounded-xl border border-border bg-bg px-3 py-2 text-sm font-semibold text-muted">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </section>

      <aside className="sticky top-6 h-fit premium-card p-5">
        <p className="text-sm text-muted">Starting from</p>
        <p className="text-3xl font-extrabold text-primary">$89</p>
        <p className="mt-3 text-sm font-semibold text-muted">Choose date</p>
        <div className="mt-2 rounded-xl border border-border bg-bg p-3 text-sm text-muted">Availability calendar preview</div>
        <button className="mt-4 min-h-11 w-full rounded-xl bg-primary text-sm font-bold text-white">Reserve now</button>
      </aside>
    </main>
  );
}
