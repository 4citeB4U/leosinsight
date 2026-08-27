import { SignJWT } from 'jose';
import { config } from '../config.js';

export type JitsiRoomTokenInput = {
  room: string;
  user: { id: string; name?: string; email?: string };
  moderator?: boolean;
};

export async function createJitsiRoomToken(input: JitsiRoomTokenInput): Promise<string> {
  if (!config.JITSI_APP_SECRET) throw new Error('jitsi_secret_not_configured');
  const secret = new TextEncoder().encode(config.JITSI_APP_SECRET);
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({
    aud: 'jitsi',
    iss: config.JITSI_APP_ID,
    sub: config.JITSI_DOMAIN,
    room: input.room,
    context: {
      user: {
        id: input.user.id,
        name: input.user.name,
        email: input.user.email,
        moderator: input.moderator === true
      }
    }
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt(now)
    .setExpirationTime(now + 60 * 60)
    .sign(secret);
}
