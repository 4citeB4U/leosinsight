import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { z } from 'zod';
import { config } from './config.js';
import { verifyAuthentikBearer } from './auth/authentik.js';
import { executeLeeWay } from './leeway/ingress.js';
import { createJitsiRoomToken } from './comms/jitsi.js';

const app = Fastify({ logger: true });
await app.register(cors, { origin: config.PUBLIC_APP_ORIGIN, credentials: true });
await app.register(helmet);

app.get('/health', async () => ({
  service: 'leos-insight-backend',
  status: 'OBSERVED_RUNNING',
  leewayBound: Boolean(config.LEEWAY_INGRESS_URL && config.LEEWAY_RUNTIME_AUTH_TOKEN),
  leewayRoomAuthorizationBound: Boolean(config.LEEWAY_ROOM_JOIN_CAPABILITY),
  nextcloudConfigured: Boolean(config.NEXTCLOUD_SERVICE_USER && config.NEXTCLOUD_SERVICE_TOKEN),
  jitsiConfigured: Boolean(config.JITSI_APP_SECRET),
  robloxConfigured: Boolean(config.ROBLOX_OPEN_CLOUD_API_KEY)
}));

app.post('/api/leeway/execute', async (request, reply) => {
  let actor;
  try {
    actor = await verifyAuthentikBearer(request.headers.authorization);
  } catch {
    return reply.code(401).send({ status: 'BLOCKED', reason: 'identity_not_verified' });
  }

  const body = z.object({
    capability: z.string().min(1),
    input: z.unknown(),
    context: z.record(z.unknown()).optional()
  }).parse(request.body);

  const result = await executeLeeWay({
    capability: body.capability,
    actor: { sub: actor.sub, roles: actor.roles, groups: actor.groups },
    input: body.input,
    context: body.context
  });

  const code = result.status === 'PASS' ? 200 : result.status === 'BLOCKED' ? 503 : 502;
  return reply.code(code).send(result);
});

app.post('/api/comms/rooms/:room/token', async (request, reply) => {
  let actor;
  try {
    actor = await verifyAuthentikBearer(request.headers.authorization);
  } catch {
    return reply.code(401).send({ status: 'BLOCKED', reason: 'identity_not_verified' });
  }

  if (!config.LEEWAY_ROOM_JOIN_CAPABILITY) {
    return reply.code(503).send({
      status: 'BLOCKED',
      reason: 'canonical_leeway_room_authorization_not_bound'
    });
  }

  const params = z.object({ room: z.string().regex(/^[A-Za-z0-9_-]{3,80}$/) }).parse(request.params);
  const requestedModerator = actor.roles.includes('room-moderator') || actor.roles.includes('owner');

  const authorization = await executeLeeWay({
    capability: config.LEEWAY_ROOM_JOIN_CAPABILITY,
    actor: { sub: actor.sub, roles: actor.roles, groups: actor.groups },
    input: {
      action: 'creator_room_join',
      room: params.room,
      requestedModerator
    },
    context: {
      product: 'leos-insight',
      transport: 'jitsi'
    }
  });

  if (authorization.status !== 'PASS') {
    const code = authorization.status === 'BLOCKED' ? 403 : 502;
    return reply.code(code).send({
      status: authorization.status,
      reason: 'leeway_room_authorization_not_passed',
      evidence: authorization
    });
  }

  const token = await createJitsiRoomToken({
    room: params.room,
    user: { id: actor.sub, name: actor.name, email: actor.email },
    moderator: requestedModerator
  });

  return {
    status: 'PASS',
    room: params.room,
    domain: config.JITSI_DOMAIN,
    token,
    leewayReceiptId: authorization.receiptId
  };
});

await app.listen({ port: config.PORT, host: '0.0.0.0' });
