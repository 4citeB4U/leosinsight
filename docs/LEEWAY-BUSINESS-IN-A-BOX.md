# Leo's Insight — LeeWay Business-in-a-Box

## Authority

Leo's Insight is a LeeWay product. This repository is the application build surface. Canonical LeeWay Runtime Fabric, Harness, Formula, Veritas, model-worker, receipt, Learning Ledger, Sensory, Security and Automation implementations remain authoritative in the LeeWay Forgejo estate and are connected only after their live contracts are verified.

The application must never call an LLM directly. It requests capabilities through the canonical LeeWay ingress adapter.

## Product hierarchy

User/Creator -> Leo the Helper -> Pocket Agent Lee -> LeeWay Runtime Fabric -> Veritas pre-gate -> Harness -> Capability/Worker -> Execution -> Veritas post-gate -> Receipt -> Learning Ledger.

## External platforms

- Authentik: identity, SSO, groups and role claims.
- Nextcloud: persistent files, collaboration, project storage, messaging/history.
- Jitsi: live gamer-style voice/video rooms and screen sharing.
- Roblox: actual game runtime, Studio/Open Cloud targets and distribution.
- LeeWay: intelligence, safety, automation, sensory processing, governed execution, verification and operational recovery.

## Departments

1. Creator Engineering: Roblox worlds, Luau, cards, assets, UI, testing.
2. Education: guided learning, explanations, challenges and mentoring.
3. Community: onboarding, rooms, collaboration and member support.
4. Safety/Security: role policy, youth safety, moderation and escalation.
5. Business: marketplace, listings, analytics and approvals.
6. Marketing/Growth: campaigns, SEO, content, growth experiments and recommendations.
7. Support: help desk, navigation and AI receptionist functions.
8. Operations/SRE: health, backups, rollback, bounded self-repair and incident escalation.

## Creator Rooms

A Creator Room is a persistent LeeWay object that binds Authentik identity, Jitsi live RTC, Nextcloud persistent content, a Roblox project context, shared artifacts and optional Leo participation. Room types: party, project, trade, learning, community and private.

## Autonomy law

The target is automated operation within explicitly delegated authority. Routine reversible runbook actions may execute automatically. Governance changes, destructive data operations, ownership changes, financial commitments, youth-safety policy changes and other consequential actions require the configured human/guardian approval boundary.

## LeeWay connection law

LEEWAY_INGRESS_URL and LEEWAY_RUNTIME_AUTH_TOKEN remain unset until the canonical Forgejo-hosted runtime endpoint and authority are proven. When unset, intelligent execution must fail closed with BLOCKED. When receipts are required, a PASS without a receipt is treated as FAIL.

## Build phases

- L0 legacy discovery: complete.
- L1 Business-in-a-Box authority: in progress.
- L2 identity and RBAC.
- L3 Nextcloud collaboration/storage.
- L4 Jitsi communications and Creator Rooms.
- L5 real Forgejo LeeWay Harness attachment.
- L6 Pocket Agent Lee / Leo the Helper UI.
- L7 departments and workers.
- L8 Creator + Universe Builder.
- L9 Roblox bridge.
- L10 marketplace/marketing/business operations.
- L11 autonomous recovery.
- L12 production proof and migration to Forgejo deployment authority.
