"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please use a valid email"),
  businessName: z.string().min(2, "Business name is required"),
  monthlyBookings: z.string().min(1, "Add an estimate"),
});

type DemoFormValues = z.infer<typeof schema>;

export function DemoRequestForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<DemoFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_values: DemoFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    reset();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <FloatingInput label="Your name" error={errors.name?.message} {...register("name")} />
      <FloatingInput label="Work email" type="email" error={errors.email?.message} {...register("email")} />
      <FloatingInput label="Business name" error={errors.businessName?.message} {...register("businessName")} />
      <FloatingInput label="Monthly bookings" error={errors.monthlyBookings?.message} {...register("monthlyBookings")} />

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? "Scheduling your demo..." : "Request personalized demo"}
      </Button>

      {isSubmitSuccessful ? (
        <p className="animate-fade-up rounded-[var(--radius-sm)] border border-success/25 bg-success/10 px-3 py-2 text-sm font-medium text-success">
          Demo request sent. A specialist will contact you shortly.
        </p>
      ) : null}
    </form>
  );
}
