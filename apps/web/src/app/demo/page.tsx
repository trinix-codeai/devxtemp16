import { Header } from "@/components/header";
import { DemoRequestForm } from "@/components/demo-request-form";

export default function DemoPage() {
  return (
    <main className="page-shell space-y-8 pb-28 md:pb-12">
      <Header />
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="hero-shell">
          <p className="badge-soft">Live walkthrough</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">See your own brand in minutes</h1>
          <p className="mt-3 text-muted">
            We tailor your demo with your destination, listing style, and booking workflow so your team sees exactly how it fits.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            <li>• Personalized sandbox tenant</li>
            <li>• Journey from homepage to confirmation</li>
            <li>• Dashboard and analytics walkthrough</li>
          </ul>
        </article>

        <article className="premium-card p-5 sm:p-6">
          <h2 className="text-2xl font-bold">Book your session</h2>
          <p className="mt-1 text-sm text-muted">30-minute personalized walkthrough with product specialist.</p>
          <div className="mt-5">
            <DemoRequestForm />
          </div>
        </article>
      </section>
    </main>
  );
}
