"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, MapPin, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const rotating = ["wander", "taste", "sail", "hike", "celebrate"];

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const activeWord = useMemo(() => rotating[index], [index]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % rotating.length);
    }, 1800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero-shell">
      <div className="absolute right-[-12px] top-[-12px] size-24 rounded-full bg-secondary/20 blur-xl sm:size-32" />
      <div className="absolute bottom-[-16px] left-[-8px] size-20 rounded-full bg-primary/20 blur-xl sm:size-28" />

      <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div className="space-y-5">
          <span className="badge-soft">
            <Sparkles className="size-3.5" />
            Crafted for local travel brands
          </span>

          <h1 className="text-4xl font-extrabold text-ink sm:text-5xl lg:text-6xl">
            Where guests come to <span className="text-primary">{activeWord}</span>
          </h1>

          <p className="max-w-xl text-base text-muted sm:text-lg">
            Build a premium booking experience under your own brand. LocalXplore gives tour operators and agencies a
            world-class storefront, CRM, and booking engine in minutes.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="animate-pulse-soft">
              Request Live Demo
            </Button>
            <Button variant="secondary" size="lg">
              Explore Interactive Tour
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 text-xs font-semibold text-muted">
            {["Launch in < 5 minutes", "WCAG-ready UI", "White-label + custom domain"].map((item) => (
              <span key={item} className="rounded-full border border-border bg-surface px-3 py-1">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="premium-card p-4 sm:p-5">
          <p className="mb-3 text-sm font-semibold text-muted">Where will you wander?</p>
          <div className="grid gap-3">
            <label className="group relative">
              <MapPin className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted" />
              <input className="min-h-11 w-full rounded-xl border border-border bg-surface pl-9 pr-3 text-sm" placeholder="Location or destination" />
            </label>
            <label className="group relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted" />
              <input className="min-h-11 w-full rounded-xl border border-border bg-surface pl-9 pr-3 text-sm" placeholder="Travel dates" />
            </label>
            <label className="group relative">
              <Users className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted" />
              <input className="min-h-11 w-full rounded-xl border border-border bg-surface pl-9 pr-3 text-sm" placeholder="Guests" />
            </label>
            <button className="min-h-11 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-sm font-bold text-white transition hover:opacity-95">
              Search experiences
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Snorkeling adventures", "Family day trips", "Romantic evenings", "Food walks"].map((item) => (
              <span key={item} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
