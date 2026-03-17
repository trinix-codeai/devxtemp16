import { Header } from "@/components/header";
import { AdminDashboardShell } from "@/components/dashboard-shell";

export default function AdminPage() {
  return (
    <main className="page-shell space-y-8 pb-28 md:pb-12">
      <Header />
      <section>
        <p className="badge-soft">Super admin portal</p>
        <h1 className="mt-2 text-4xl font-extrabold">Platform command center</h1>
        <p className="mt-2 text-muted">Monitor growth, revenue, and tenant health from one premium control surface.</p>
      </section>
      <AdminDashboardShell />
    </main>
  );
}
