import { Card } from "@/components/ui/card";

export default async function CustomerDashboardPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  return (
    <main className="page-shell space-y-6 pb-24">
      <section className="hero-shell">
        <h1 className="text-4xl font-extrabold">Welcome back</h1>
        <p className="mt-2 text-muted">Manage your trips with {tenant}.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {["Upcoming bookings", "Past experiences", "Wishlist", "Profile preferences"].map((item) => (
          <Card key={item} className="interactive-lift p-5">
            <h2 className="text-lg font-bold">{item}</h2>
            <p className="mt-2 text-sm text-muted">Optimized cards, empty states, and quick actions appear here.</p>
          </Card>
        ))}
      </section>
    </main>
  );
}
