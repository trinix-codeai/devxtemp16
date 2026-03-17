declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        tenantId?: string;
        role: string;
        permissions: string[];
      };
      tenant?: {
        id: string;
        subdomain: string;
        schemaName: string;
        planCode: string;
      };
    }
  }
}

export {};
