import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(8787),
  PUBLIC_APP_ORIGIN: z.string().url(),
  AUTHENTIK_ISSUER: z.string().url(),
  AUTHENTIK_AUDIENCE: z.string().min(1),
  AUTHENTIK_JWKS_URI: z.string().url(),
  NEXTCLOUD_BASE_URL: z.string().url(),
  NEXTCLOUD_SERVICE_USER: z.string().optional(),
  NEXTCLOUD_SERVICE_TOKEN: z.string().optional(),
  JITSI_DOMAIN: z.string().min(1),
  JITSI_APP_ID: z.string().min(1),
  JITSI_APP_SECRET: z.string().optional(),
  LEEWAY_INGRESS_URL: z.string().url().optional(),
  LEEWAY_PRODUCT_ID: z.string().default('leos-insight'),
  LEEWAY_RUNTIME_AUTH_TOKEN: z.string().optional(),
  LEEWAY_VERITAS_REQUIRED: z.coerce.boolean().default(true),
  LEEWAY_RECEIPTS_REQUIRED: z.coerce.boolean().default(true),
  LEEWAY_ROOM_JOIN_CAPABILITY: z.string().min(1).optional(),
  ROBLOX_OPEN_CLOUD_API_KEY: z.string().optional(),
  ROBLOX_UNIVERSE_ID: z.string().optional(),
  ROBLOX_PLACE_ID: z.string().optional()
});

export const config = schema.parse(process.env);
