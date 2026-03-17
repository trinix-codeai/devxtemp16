import { Camera, Compass, MapPinned, ShieldCheck, Sparkles, Star, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const highlights = [
  { title: "Authentic local experiences", icon: MapPinned, text: "Curate unique moments that feel local, not generic." },
  { title: "Premium booking flow", icon: Sparkles, text: "From search to checkout with elegant motion and clear trust cues." },
  { title: "White-label by default", icon: ShieldCheck, text: "Tenant colors, logos, typography, and layouts with no design debt." },
];

const discovery = [
  { name: "Island Snorkeling Escape", rating: 4.9, price: "$89", badge: "Best Seller" },
  { name: "Sunset Street Food Walk", rating: 4.8, price: "$45", badge: "Limited Spots" },
  { name: "Rainforest Waterfall Trek", rating: 4.7, price: "$72", badge: "Free Cancellation" },
];

const stats = [
  { label: "Bookings this month", value: "12.4k", icon: Compass },
  { label: "Average conversion", value: "18.7%", icon: Star },
  { label: "Guest satisfaction", value: "4.9/5", icon: UsersRound },
  { label: "Media-rich listings", value: "3.1k", icon: Camera },
];

export function HomeHighlights() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {highlights.map((item, index) => (
        <Card key={item.title} className="animate-fade-up interactive-lift" style={{ animationDelay: `${index * 70}ms` }}>
          <CardHeader>
            <item.icon className="mb-3 size-6 text-primary" />
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted">{item.text}</CardContent>
        </Card>
      ))}
    </section>
  );
}

export function DiscoveryGrid() {
  return (
    <section className="mt-12">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="badge-soft">Search & discovery</p>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Desire-inducing listing cards</h2>
        </div>
        <a href="/features" className="text-sm font-semibold text-primary">
          View all features
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {discovery.map((item, index) => (
          <article
            key={item.name}
            className="interactive-lift premium-card group overflow-hidden"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="relative h-44 bg-gradient-to-br from-primary/35 via-primary/10 to-secondary/30 p-4">
              <Badge className="absolute left-4 top-4">{item.badge}</Badge>
              <button className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/80 text-danger transition group-hover:scale-110">
                ❤
              </button>
              <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/85 px-3 py-2 text-xs font-semibold text-muted backdrop-blur">
                Swipe-ready mini gallery preview
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-muted">★ {item.rating}</span>
                <span className="text-xl font-extrabold text-primary">{item.price}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SocialProofRail() {
  return (
    <section className="mt-12 rounded-[var(--radius-lg)] border border-border bg-surface p-4 shadow-soft sm:p-6">
      <div className="flex gap-6 overflow-hidden whitespace-nowrap">
        <div className="flex min-w-max animate-marquee gap-6">
          {["Rated 4.9 by 4,200 travelers", "PCI-DSS secure payments", "Trusted by 500+ local operators", "99.9% uptime SLA"].map((item) => (
            <span key={item} className="text-sm font-semibold text-muted">
              {item}
            </span>
          ))}
          {["Rated 4.9 by 4,200 travelers", "PCI-DSS secure payments", "Trusted by 500+ local operators", "99.9% uptime SLA"].map((item) => (
            <span key={`dup-${item}`} className="text-sm font-semibold text-muted">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsOverview() {
  return (
    <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <Card key={item.label} className="interactive-lift">
          <CardContent className="pt-5">
            <item.icon className="mb-3 size-5 text-primary" />
            <p className="text-sm text-muted">{item.label}</p>
            <p className="mt-1 text-2xl font-extrabold text-ink">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
