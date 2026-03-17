import { Compass, Headphones, Search, ShoppingBag, User } from "lucide-react";

const nav = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/demo", label: "Request Demo" },
];

export function Header() {
  return (
    <>
      <header className="glass sticky top-3 z-50 mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 rounded-[var(--radius-lg)] px-4 py-3 sm:px-5">
        <a href="/" className="inline-flex items-center gap-2 text-lg font-extrabold text-ink sm:text-xl">
          <span className="grid size-8 place-items-center rounded-xl bg-primary text-white">
            <Compass className="size-4" />
          </span>
          LocalXplore
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-muted transition-colors hover:bg-white hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <button className="grid size-10 place-items-center rounded-full border border-border bg-white/80 text-muted transition hover:text-ink">
            <Search className="size-4" />
          </button>
          <button className="grid size-10 place-items-center rounded-full border border-border bg-white/80 text-muted transition hover:text-ink">
            <ShoppingBag className="size-4" />
          </button>
          <button className="grid size-10 place-items-center rounded-full border border-border bg-white/80 text-muted transition hover:text-ink">
            <User className="size-4" />
          </button>
        </div>
      </header>

      <nav className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-border bg-surface/95 p-2 shadow-soft backdrop-blur md:hidden">
        <ul className="grid grid-cols-4 gap-1">
          <li>
            <a className="grid min-h-11 place-items-center rounded-xl text-xs font-semibold text-ink" href="/">
              <Compass className="mb-1 size-4" />
              Explore
            </a>
          </li>
          <li>
            <a className="grid min-h-11 place-items-center rounded-xl text-xs font-semibold text-muted" href="/features">
              <Search className="mb-1 size-4" />
              Search
            </a>
          </li>
          <li>
            <a className="grid min-h-11 place-items-center rounded-xl text-xs font-semibold text-muted" href="/pricing">
              <ShoppingBag className="mb-1 size-4" />
              Booking
            </a>
          </li>
          <li>
            <a className="grid min-h-11 place-items-center rounded-xl text-xs font-semibold text-muted" href="/demo">
              <Headphones className="mb-1 size-4" />
              Support
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
