import { z } from "zod";

export const createTenantSchema = z.object({
  businessName: z.string().min(2),
  subdomain: z.string().regex(/^[a-z0-9-]+$/),
  planCode: z.enum(["starter", "growth", "enterprise"]),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(5),
  address: z.string().min(5),
});

export const listingSchema = z.object({
  type: z.enum(["tour", "activity", "package", "transfer"]),
  name: z.string().min(2),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().min(20),
  shortDescription: z.string().min(10),
  location: z.string().min(2),
  maxParticipants: z.number().int().positive(),
  basePrice: z.number().positive(),
  currency: z.string().length(3).default("USD"),
});

export const bookingSchema = z.object({
  listingId: z.string().uuid(),
  bookingDate: z.string(),
  numberOfParticipants: z.number().int().positive(),
  customer: z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(5),
  }),
  specialRequests: z.string().optional(),
});
