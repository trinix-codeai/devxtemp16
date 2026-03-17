import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  {
    title: "Immersive customer website",
    points: ["Hero layouts with video or cinematic imagery", "Local storytelling sections", "SEO-ready structure with schema"],
  },
  {
    title: "Booking and inventory UX",
    points: ["Availability-first date selection", "Concierge-style checkout", "Live price and capacity updates"],
  },
  {
    title: "Operations command center",
    points: ["Revenue + booking analytics", "Customer timeline and segmentation", "Automated reminders and campaigns"],
  },
  {
    title: "White-label theme engine",
    points: ["Brand colors and font packs", "Logo + media templates", "Tenant-level layout modes"],
  },
];

export default function FeaturesPage() {
  return (
    <main className="page-shell space-y-8 pb-28 md:pb-12">
      <Header />
      <section className="hero-shell">
        <p className="badge-soft">Feature showcase</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">A full travel commerce experience, not just a booking form</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Every screen is crafted for trust, speed, and delight so local brands can compete with global platforms.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {sections.map((section, index) => (
          <Card key={section.title} className="interactive-lift animate-fade-up" style={{ animationDelay: `${index * 70}ms` }}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted">
                {section.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
