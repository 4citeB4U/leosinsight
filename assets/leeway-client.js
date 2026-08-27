(function () {
  const API_BASE = window.LEO_API_BASE || 'http://localhost:8787';

  async function api(path, options = {}) {
    const token = sessionStorage.getItem('leo_access_token');
    const headers = new Headers(options.headers || {});
    if (token) headers.set('authorization', `Bearer ${token}`);
    if (options.body && !headers.has('content-type')) headers.set('content-type', 'application/json');
    const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(body.reason || `request_failed_${response.status}`);
      error.status = response.status;
      error.body = body;
      throw error;
    }
    return body;
  }

  window.LeoInsight = {
    setAccessToken(token) {
      if (!token) sessionStorage.removeItem('leo_access_token');
      else sessionStorage.setItem('leo_access_token', token);
    },

    health() {
      return api('/health');
    },

    execute(capability, input, context = {}) {
      return api('/api/leeway/execute', {
        method: 'POST',
        body: JSON.stringify({ capability, input, context })
      });
    },

    async joinRoom(room) {
      return api(`/api/comms/rooms/${encodeURIComponent(room)}/token`, { method: 'POST' });
    }
  };
})();
