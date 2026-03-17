import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="page-shell space-y-6">
      <Skeleton className="h-14 w-full rounded-[var(--radius-lg)]" />
      <Skeleton className="h-72 w-full rounded-[var(--radius-xl)]" />
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </main>
  );
}
