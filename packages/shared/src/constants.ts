export const SUBSCRIPTION_TIERS = ["starter", "growth", "enterprise"] as const;

export const ROLE_PERMISSIONS = {
  super_admin: ["manage_all_tenants", "view_all_data", "configure_system", "manage_plans", "view_revenue"],
  support: ["view_tenants", "respond_to_tickets", "view_system_health"],
  finance: ["view_subscriptions", "process_payments", "view_revenue_reports"],
  owner: ["full_tenant_access", "manage_staff", "configure_branding", "view_financials"],
  manager: ["manage_listings", "view_bookings", "manage_inventory", "view_reports"],
  agent: ["create_bookings", "view_assigned_bookings", "manage_clients"],
  guide: ["view_assigned_tours", "update_tour_status", "upload_photos"],
  accountant: ["view_financial_reports", "process_refunds", "export_data"],
} as const;

export const SUPPORTED_CURRENCIES = ["USD", "EUR", "GBP", "INR", "THB", "AUD", "CAD"] as const;
