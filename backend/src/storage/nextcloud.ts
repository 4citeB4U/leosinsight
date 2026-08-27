import { config } from '../config.js';

function authHeader(): string {
  if (!config.NEXTCLOUD_SERVICE_USER || !config.NEXTCLOUD_SERVICE_TOKEN) {
    throw new Error('nextcloud_service_credentials_not_configured');
  }
  return `Basic ${Buffer.from(`${config.NEXTCLOUD_SERVICE_USER}:${config.NEXTCLOUD_SERVICE_TOKEN}`).toString('base64')}`;
}

export async function putProjectFile(path: string, data: Uint8Array | string): Promise<void> {
  const url = `${config.NEXTCLOUD_BASE_URL.replace(/\/$/, '')}/remote.php/dav/files/${encodeURIComponent(config.NEXTCLOUD_SERVICE_USER ?? '')}/${path.split('/').map(encodeURIComponent).join('/')}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: { authorization: authHeader() },
    body: data
  });
  if (!response.ok) throw new Error(`nextcloud_put_failed:${response.status}`);
}
