import { Header } from "@/components/header";
import { HomeHero } from "@/components/home-hero";
import { DiscoveryGrid, HomeHighlights, SocialProofRail, StatsOverview } from "@/components/home-sections";
import { PricingTable } from "@/components/pricing-table";

export default function HomePage() {
  return (
    <main className="page-shell space-y-10 pb-28 md:pb-12">
      <Header />
      <HomeHero />
      <HomeHighlights />
      <SocialProofRail />
      <DiscoveryGrid />
      <StatsOverview />

      <section className="mt-12">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="badge-soft">Plans for every stage</p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Premium pricing built for growth</h2>
          </div>
        </div>
        <PricingTable />
      </section>
    </main>
  );
}
