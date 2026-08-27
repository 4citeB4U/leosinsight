import { createRemoteJWKSet, jwtVerify } from 'jose';
import { config } from '../config.js';

const jwks = createRemoteJWKSet(new URL(config.AUTHENTIK_JWKS_URI));

export type LeoIdentity = {
  sub: string;
  email?: string;
  name?: string;
  groups: string[];
  roles: string[];
};

export async function verifyAuthentikBearer(authorization?: string): Promise<LeoIdentity> {
  if (!authorization?.startsWith('Bearer ')) throw new Error('missing_bearer_token');
  const token = authorization.slice('Bearer '.length);
  const { payload } = await jwtVerify(token, jwks, {
    issuer: config.AUTHENTIK_ISSUER,
    audience: config.AUTHENTIK_AUDIENCE
  });
  if (!payload.sub) throw new Error('missing_subject');
  const rawGroups = Array.isArray(payload.groups) ? payload.groups : [];
  const rawRoles = Array.isArray(payload.roles) ? payload.roles : [];
  return {
    sub: payload.sub,
    email: typeof payload.email === 'string' ? payload.email : undefined,
    name: typeof payload.name === 'string' ? payload.name : undefined,
    groups: rawGroups.filter((v): v is string => typeof v === 'string'),
    roles: rawRoles.filter((v): v is string => typeof v === 'string')
  };
}
