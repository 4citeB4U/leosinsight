import { config } from '../config.js';

function requireRoblox(): string {
  if (!config.ROBLOX_OPEN_CLOUD_API_KEY) throw new Error('roblox_open_cloud_not_configured');
  return config.ROBLOX_OPEN_CLOUD_API_KEY;
}

export async function robloxRequest(path: string, init: RequestInit = {}): Promise<Response> {
  const apiKey = requireRoblox();
  const headers = new Headers(init.headers);
  headers.set('x-api-key', apiKey);
  if (!headers.has('content-type') && init.body) headers.set('content-type', 'application/json');
  return fetch(`https://apis.roblox.com${path}`, { ...init, headers });
}

export function configuredRobloxTarget() {
  return {
    universeId: config.ROBLOX_UNIVERSE_ID,
    placeId: config.ROBLOX_PLACE_ID,
    configured: Boolean(config.ROBLOX_OPEN_CLOUD_API_KEY && config.ROBLOX_UNIVERSE_ID)
  };
}
