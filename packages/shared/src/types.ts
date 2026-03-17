import type { z } from "zod";
import type { bookingSchema, createTenantSchema, listingSchema } from "./validation.js";

export type SubscriptionTier = "starter" | "growth" | "enterprise";
export type PlatformRole = "super_admin" | "support" | "finance";
export type TenantRole = "owner" | "manager" | "agent" | "guide" | "accountant";

export type CreateTenantInput = z.infer<typeof createTenantSchema>;
export type ListingInput = z.infer<typeof listingSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
