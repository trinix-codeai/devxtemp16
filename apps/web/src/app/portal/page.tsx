import { Header } from "@/components/header";
import { TenantDashboardShell } from "@/components/dashboard-shell";

export default function PortalPage() {
  return (
    <main className="page-shell space-y-8 pb-28 md:pb-12">
      <Header />
      <section>
        <p className="badge-soft">Tenant portal</p>
        <h1 className="mt-2 text-4xl font-extrabold">Operations dashboard</h1>
        <p className="mt-2 text-muted">Bookings, customers, listings, and insights designed for quick confident action.</p>
      </section>
      <TenantDashboardShell />
    </main>
  );
}
