import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "default" | "success" | "warning" | "danger" | "info";

const toneMap: Record<BadgeTone, string> = {
  default: "bg-primary/10 text-primary border-primary/25",
  success: "bg-success/10 text-success border-success/25",
  warning: "bg-warning/12 text-warning border-warning/25",
  danger: "bg-danger/10 text-danger border-danger/25",
  info: "bg-info/10 text-info border-info/25",
};

export function Badge({ className, tone = "default", ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold", toneMap[tone], className)}
      {...props}
    />
  );
}
