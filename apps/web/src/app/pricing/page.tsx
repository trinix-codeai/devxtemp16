import { Header } from "@/components/header";
import { PricingTable } from "@/components/pricing-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PricingPage() {
  return (
    <main className="page-shell space-y-8 pb-28 md:pb-12">
      <Header />
      <section className="hero-shell">
        <p className="badge-soft">Transparent pricing</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Choose your growth lane</h1>
        <p className="mt-3 max-w-2xl text-muted">Monthly subscription plus platform commission. Upgrade anytime as your business expands.</p>
      </section>

      <PricingTable />

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["No setup surprises", "Onboarding support included in every plan."],
          ["14-day trial", "Launch your branded portal before commitment."],
          ["Cancel anytime", "Export-friendly architecture and transparent billing."],
        ].map(([title, description]) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted">{description}</CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
