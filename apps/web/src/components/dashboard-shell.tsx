import { Activity, ArrowUpRight, CalendarDays, CircleAlert, CircleDollarSign, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const metricCards = [
  { title: "Today's bookings", value: "48", hint: "+12% vs yesterday", icon: CalendarDays, tone: "info" as const },
  { title: "Monthly revenue", value: "$38,900", hint: "+18% growth", icon: CircleDollarSign, tone: "success" as const },
  { title: "Pending inquiries", value: "17", hint: "needs follow-up", icon: CircleAlert, tone: "warning" as const },
  { title: "Occupancy rate", value: "82%", hint: "high demand", icon: Activity, tone: "default" as const },
];

export function TenantDashboardShell() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((card) => (
          <Card key={card.title} className="interactive-lift">
            <CardContent className="pt-5">
              <div className="mb-3 flex items-center justify-between">
                <card.icon className="size-5 text-primary" />
                <Badge tone={card.tone}>{card.hint}</Badge>
              </div>
              <p className="text-sm text-muted">{card.title}</p>
              <p className="mt-1 text-3xl font-extrabold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <CardHeader>
            <CardTitle>Revenue trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56 rounded-[var(--radius-sm)] border border-border bg-gradient-to-b from-primary/15 to-transparent p-4">
              <div className="flex h-full items-end gap-2">
                {[26, 33, 29, 38, 45, 43, 51, 57].map((h, i) => (
                  <div key={h + i} className="flex-1 rounded-t-xl bg-primary/80" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              "New booking for Island Snorkeling",
              "Review pending response",
              "Agent payout request received",
              "Listing updated: Waterfall Trek",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-border bg-bg px-3 py-2">
                <span className="mt-2 size-1.5 rounded-full bg-primary" />
                <p className="text-sm text-muted">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export function AdminDashboardShell() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total tenants", "512"],
          ["Active subscriptions", "476"],
          ["MRR", "$57,420"],
          ["Platform revenue", "$143,119"],
        ].map(([label, value]) => (
          <Card key={label} className="interactive-lift">
            <CardContent className="pt-5">
              <p className="text-sm text-muted">{label}</p>
              <p className="mt-1 text-3xl font-extrabold text-primary">{value}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tenant growth funnel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {["Visits", "Signups", "Trials", "Activated"].map((stage, index) => (
              <div key={stage} className="rounded-xl bg-bg p-3">
                <div className="mb-2 flex items-center justify-between text-sm font-semibold text-muted">
                  <span>{stage}</span>
                  <span>{[3200, 940, 540, 380][index]}</span>
                </div>
                <div className="h-2 rounded-full bg-border">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${[100, 64, 41, 28][index]}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Billing issue - Stripe retry", "Domain verification pending", "Plan upgrade requested", "Custom integration scoping"].map((ticket) => (
              <button
                key={ticket}
                className="flex w-full items-center justify-between rounded-xl border border-border bg-surface px-3 py-3 text-left text-sm text-muted transition hover:border-primary/40 hover:text-ink"
              >
                {ticket}
                <ArrowUpRight className="size-4" />
              </button>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Customer acquisition insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-[var(--radius-sm)] bg-bg p-4">
            <div className="flex items-center gap-3">
              <Users className="size-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-ink">Top channel: Partner referrals</p>
                <p className="text-xs text-muted">Contributes 34% of activated tenants this month</p>
              </div>
            </div>
            <Badge tone="success">+6.2%</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
