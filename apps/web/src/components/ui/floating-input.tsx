"use client";

import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type FloatingInputProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function FloatingInput({ label, error, className, id, ...props }: FloatingInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="group relative">
      <input
        id={inputId}
        className={cn(
          "peer min-h-12 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 pb-2 pt-6 text-sm text-ink shadow-sm transition-all duration-200 placeholder-transparent focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/35",
          error && "border-danger/50 focus:border-danger focus:ring-danger/30",
          className,
        )}
        placeholder={label}
        {...props}
      />
      <label
        htmlFor={inputId}
        className="pointer-events-none absolute left-3 top-3.5 origin-left text-sm text-muted transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:scale-90 peer-focus:text-primary"
      >
        {label}
      </label>
      {error ? <p className="mt-1 text-xs text-danger">{error}</p> : null}
    </div>
  );
}
