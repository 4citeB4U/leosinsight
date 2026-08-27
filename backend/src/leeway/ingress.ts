import { config } from '../config.js';

/**
 * Thin product adapter only.
 *
 * This file MUST NOT implement LeeWay Formula, Harness routing, Security,
 * Automation, Memory, model selection, Veritas, receipts, or Learning Ledger.
 * Those are canonical LeeWay responsibilities in the Forgejo estate.
 *
 * The exact live ingress URL and canonical capability identifiers remain
 * deployment bindings. When they are unavailable, this adapter fails closed.
 */
export type LeeWayCapabilityRequest = {
  capability: string;
  actor: { sub: string; roles: string[]; groups: string[] };
  input: unknown;
  context?: Record<string, unknown>;
};

export type LeeWayCapabilityResult = {
  status: 'PASS' | 'FAIL' | 'BLOCKED';
  output?: unknown;
  receiptId?: string;
  veritas?: unknown;
};

export async function executeLeeWay(request: LeeWayCapabilityRequest): Promise<LeeWayCapabilityResult> {
  if (!config.LEEWAY_INGRESS_URL || !config.LEEWAY_RUNTIME_AUTH_TOKEN) {
    return { status: 'BLOCKED', output: { reason: 'canonical_leeway_runtime_not_bound' } };
  }

  const response = await fetch(`${config.LEEWAY_INGRESS_URL.replace(/\/$/, '')}/execute`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${config.LEEWAY_RUNTIME_AUTH_TOKEN}`,
      'x-leeway-product': config.LEEWAY_PRODUCT_ID
    },
    body: JSON.stringify({
      ...request,
      requirements: {
        veritas: config.LEEWAY_VERITAS_REQUIRED,
        receipt: config.LEEWAY_RECEIPTS_REQUIRED
      }
    })
  });

  if (!response.ok) {
    return { status: 'FAIL', output: { reason: 'leeway_ingress_http_error', httpStatus: response.status } };
  }

  const body = await response.json() as LeeWayCapabilityResult;
  if (config.LEEWAY_RECEIPTS_REQUIRED && body.status === 'PASS' && !body.receiptId) {
    return { status: 'FAIL', output: { reason: 'missing_required_receipt' }, veritas: body.veritas };
  }
  return body;
}
