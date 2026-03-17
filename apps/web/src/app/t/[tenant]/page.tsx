import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

async function getPublicListings(tenant: string) {
  const host = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
  const response = await fetch(`${host}/api/public/listings`, {
    headers: {
      "x-tenant-subdomain": tenant,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  return (await response.json()) as Array<{ id: string; name: string; short_description: string; base_price: number; currency: string }>;
}

export default async function TenantHome({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  const list = await getPublicListings(tenant);

  return (
    <main className="page-shell space-y-8 pb-24">
      <section className="hero-shell">
        <Badge>Tenant website</Badge>
        <h1 className="mt-3 text-4xl font-extrabold">{tenant} adventures</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Curated local experiences with real guides, secure booking, and transparent availability.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {(list.length ? list : [
          { id: "a", name: "Cliffside Sunrise Trek", short_description: "Guided hike with local breakfast.", base_price: 85, currency: "USD" },
          { id: "b", name: "Old Town Food Stories", short_description: "Chef-led tasting journey through hidden spots.", base_price: 49, currency: "USD" },
          { id: "c", name: "Mangrove Kayak Sunset", short_description: "Small-group paddle with wildlife spotting.", base_price: 64, currency: "USD" },
        ]).map((item, index) => (
          <Card key={item.id} className="interactive-lift animate-fade-up" style={{ animationDelay: `${index * 60}ms` }}>
            <div className="h-40 rounded-t-[var(--radius-md)] bg-gradient-to-br from-primary/25 to-secondary/20" />
            <CardContent className="pt-5">
              <h2 className="text-lg font-bold">{item.name}</h2>
              <p className="mt-2 text-sm text-muted">{item.short_description}</p>
              <p className="mt-4 text-xl font-extrabold text-primary">
                {item.currency} {item.base_price}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
