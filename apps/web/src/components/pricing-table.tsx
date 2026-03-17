import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tiers = [
  {
    name: "Starter",
    description: "For new local operators",
    priceMonthly: "$49",
    annual: "$490",
    commission: "5%",
    features: ["Branded website", "20 listings", "Booking management", "Basic reports"],
  },
  {
    name: "Growth",
    description: "Scale with automation",
    priceMonthly: "$99",
    annual: "$990",
    commission: "3%",
    highlight: true,
    features: ["Unlimited listings", "Agent portal", "Marketing tools", "API access"],
  },
  {
    name: "Enterprise",
    description: "Multi-location operations",
    priceMonthly: "$299",
    annual: "$2990",
    commission: "1%",
    features: ["Custom integrations", "SLA guarantee", "White glove onboarding", "Account manager"],
  },
];

export function PricingTable() {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {tiers.map((tier, index) => (
        <Card
          key={tier.name}
          className={`interactive-lift relative overflow-hidden ${tier.highlight ? "border-primary/40 shadow-lift" : ""}`}
          style={{ animationDelay: `${index * 80}ms` }}
        >
          {tier.highlight ? <Badge className="absolute right-4 top-4">Most loved</Badge> : null}
          <CardHeader>
            <p className="text-sm font-semibold text-muted">{tier.description}</p>
            <CardTitle className="text-2xl">{tier.name}</CardTitle>
            <p className="text-3xl font-extrabold text-primary">{tier.priceMonthly}/mo</p>
            <p className="text-sm text-muted">{tier.annual} annually</p>
          </CardHeader>

          <CardContent>
            <p className="text-sm font-semibold text-secondary">Platform commission: {tier.commission}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="/demo"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-[var(--radius-sm)] bg-primary px-4 text-sm font-bold text-white transition hover:translate-y-[-2px] hover:bg-primary/90"
            >
              Start {tier.name}
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
