import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const items = [
  {
    name: "Coastal Trails Co.",
    outcome: "2.4x bookings in 90 days after moving from manual chat-based bookings.",
    metric: "+141% conversion",
  },
  {
    name: "PeakLine Adventures",
    outcome: "Saved 18 operations hours per week using automated reminders and CRM workflows.",
    metric: "18 hrs/week saved",
  },
  {
    name: "Heritage City Walks",
    outcome: "Expanded to 3 locations using one enterprise control center and branded microsites.",
    metric: "3 city launches",
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="page-shell space-y-8 pb-28 md:pb-12">
      <Header />
      <section className="hero-shell">
        <p className="badge-soft">Proof of impact</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Local businesses winning with premium digital experiences</h1>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {items.map((item, index) => (
          <Card key={item.name} className="interactive-lift animate-fade-up" style={{ animationDelay: `${index * 70}ms` }}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">{item.outcome}</p>
              <p className="mt-4 text-sm font-bold text-primary">{item.metric}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
