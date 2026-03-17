# API Overview

Base URL (local): `http://localhost:4000`

## Health
- `GET /api/health`

## Auth
- `POST /api/auth/login`

## Platform APIs
- `GET /api/platform/plans`
- `POST /api/platform/tenants`
- `GET /api/platform/tenants`
- `GET /api/platform/tenants/:id`
- `PUT /api/platform/tenants/:id`
- `DELETE /api/platform/tenants/:id`
- `GET /api/platform/stats`

## Tenant APIs
Requires tenant context (`x-tenant-subdomain` header or host-based resolution) and access token.
- `GET /api/tenant/listings`
- `POST /api/tenant/listings`
- `GET /api/tenant/listings/:id`
- `PUT /api/tenant/listings/:id`
- `DELETE /api/tenant/listings/:id`
- `GET /api/tenant/bookings`
- `POST /api/tenant/bookings`
- `GET /api/tenant/bookings/:id`
- `PUT /api/tenant/bookings/:id/status`
- `GET /api/tenant/customers`
- `GET /api/tenant/analytics`
- `GET /api/tenant/branding`
- `PUT /api/tenant/branding`

## Public APIs
Requires tenant resolution from host/header.
- `GET /api/public/listings`
- `GET /api/public/listings/:slug`
- `GET /api/public/availability/:listingId`
- `POST /api/public/bookings/calculate`
- `POST /api/public/bookings`
- `GET /api/public/reviews/:listingId`
