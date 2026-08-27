# Leo's Insight — LeeWay Business-in-a-Box

## Authority

Leo's Insight is a LeeWay product surface, not an independent AI platform. This GitHub repository is the temporary application build surface. Canonical LeeWay Runtime Fabric, Harnesses, Formula, Veritas, model-worker routing, receipts, Learning Ledger, Sensory, Security, Automation, Memory/Context and related adapters remain authoritative in the LeeWay Forgejo estate.

GitHub code must never recreate a LeeWay subsystem merely because the canonical Forgejo implementation is not visible from this repository. Missing canonical bindings are BLOCKED dependencies, not permission to invent substitutes.

The application must never call an LLM directly. It requests governed capabilities through the LeeWay product adapter and lets LeeWay decide whether execution belongs to deterministic code, ML, a 1B-class worker, a specialist model, a larger Qwen-family model, automation, or another authorized capability.

## Product hierarchy

User / Creator
-> Leo-facing persona (working name: Leo the Helper / Leo the Guide)
-> Pocket Agent Lee
-> LeeWay ingress
-> context/memory authority
-> canonical LeeWay Formula
-> Veritas pre-gate
-> Intelligence/Harness routing
-> Security / Sensory / Automation / Capability / Learning paths as required
-> authorized worker/tool/model/execution
-> Veritas post-gate
-> receipt
-> Learning Ledger.

The Leo-facing name is a product persona. It does not create a second sovereign agent identity. Pocket Agent Lee and Agent Lee remain the underlying LeeWay intelligence/orchestration identity.

## Formula law

Raw user intent is not sent directly to a model. The canonical LeeWay Formula must participate where the governed path requires it before model/tool routing. Leo's Insight may carry product context and intent into that path, but must not implement a substitute Formula or fabricate Formula outputs.

The remembered LeeWay design includes pre-aiding an intake into multiple related/similar-meaning states before capability selection. The exact Formula implementation, constants, transformations and result schema remain UNVERIFIED in this repository until bound to the canonical Forgejo artifact. No mock Formula result may be promoted to PASS.

## Existing LeeWay responsibilities — do not duplicate

Leo's Insight consumes these as upstream platform capabilities:

- Intelligence / Harness routing: reasoning, capability selection and worker/model escalation.
- Sensory Harness: voice input/output, VAD, barge-in, hearing, speaking and future visual/sensory context.
- Security Harness: authorization, trust, policy, youth-safety decisions and security escalation after identity is established.
- Automation Harness / governed automation: workflows, schedules, notifications, campaigns, maintenance and recovery.
- Memory / Context authority: conversational/project continuity and contextual state used by LeeWay reasoning.
- Learning Harness / Learning Ledger: verified operational learning and reusable capability improvement.
- Model gateway/worker layer: deterministic capabilities, 1B-class workers, specialist models and larger reasoning models.
- Veritas: pre/post validation.
- Receipt system: evidence for actions that actually executed.
- Runtime Fabric: execution/orchestration substrate.

Do not add a second cache, queue, scheduler, security engine, memory system, model router, event bus, agent registry or governance layer unless an exact uncovered requirement is proven and the canonical LeeWay estate cannot satisfy it.

## Product-owned responsibilities

Leo's Insight may own only product/domain state and adapters necessary to represent the business:

- creator/customer profile projection data needed by the product;
- Roblox universe/project metadata and external IDs;
- card/artifact catalog metadata and product-specific versions;
- Creator Room membership/project relationships;
- marketplace/listing state;
- owner/guardian approval requests;
- product configuration and UI state;
- references to canonical LeeWay receipts/provenance;
- adapters to external platforms.

## External platforms

- Authentik: authentication, SSO and identity claims. Authentik establishes identity; LeeWay Security Harness remains the authority for governed capability authorization.
- Nextcloud: persistent files, collaboration, project storage and long-lived shared content.
- Jitsi: real-time voice/video rooms, audio-only party chat and screen sharing. Room admission and AI participation remain governed by LeeWay security/policy.
- Roblox: actual game runtime, Studio/Open Cloud targets and distribution.
- PostgreSQL: product-specific durable relational state only where that state is not already owned by a canonical LeeWay authority or external platform.
- LeeWay: intelligence, security, memory/context, automation, sensory processing, governed execution, verification, learning and operational recovery.

## Business-in-a-Box departments

Departments are logical capability groupings routed by LeeWay; they are not independent sovereign agents or one-heavy-LLM-per-department processes.

1. Creator Engineering — Roblox universes, Luau, cards, assets, UI, testing and publishing preparation.
2. Education — guided learning, explanations, challenges, mentoring and code pedagogy.
3. Community — onboarding, Creator Rooms, collaboration, events and member support.
4. Safety / Security — youth policy, authorization, moderation, abuse response and escalation.
5. Business / Marketplace — catalog, listings, analytics, approvals, licensing and transactions.
6. Marketing / Growth — research, SEO, campaigns, creator promotion, conversion improvement and recommendations.
7. Support — help desk, navigation, knowledge support and receptionist functions.
8. Operations / SRE — health, backups, rollback, bounded self-repair and incident escalation.

Routine bounded work should prefer deterministic capabilities or small/1B-class workers. Larger models are escalation resources, not defaults.

## Creator Rooms and communications

A Creator Room is a product-domain projection that binds an authenticated identity/group, Jitsi live RTC, persistent Nextcloud content, Roblox project context, shared governed artifacts and optional Leo participation.

Room types include party, project, trade, learning, community and private. The user experience should resemble console party chat while adding code/card/artifact sharing, project collaboration and AI tutoring.

Jitsi transports media. The Sensory Harness gives Leo hearing/speaking intelligence. Nextcloud persists files/messages/content. Authentik identifies the participant. LeeWay Security governs what the participant or AI may do.

## Autonomy law

The target is automated operation within explicitly delegated authority — a Business-in-a-Box that can monitor itself, support users, propose and run authorized marketing/business workflows, recover from known failures and escalate unknown or consequential decisions.

Routine reversible runbook actions may execute automatically through canonical LeeWay automation/operations paths. Governance changes, destructive data operations, ownership changes, financial commitments, youth-safety policy changes and other consequential actions require the configured human/guardian authority.

## LeeWay connection law

Canonical LeeWay endpoint names, capability identifiers, Formula contracts, harness contracts and tokens are not guessed from memory. The application may define a thin product adapter and fail-closed configuration boundary, but live bindings are filled only after the Forgejo-hosted canonical artifacts/contracts are inspected and verified.

When canonical LeeWay is unbound, intelligent/governed execution returns BLOCKED. PASS is never simulated. If a path requires a receipt, PASS without an actual receipt is invalid.

## Master Completion Path

### L0 — Legacy discovery — COMPLETE
- existing GitHub Pages product inspected;
- README/product intent recovered;
- legacy static functionality preserved.

### L1 — LeeWay product authority — CURRENT
- [x] Leo's Insight classified as a LeeWay product surface;
- [x] Leo-facing persona sits above Pocket Agent Lee;
- [x] Formula restored to the governed reasoning path;
- [x] Harness-first / no-duplicate-platform law established;
- [x] Authentik, Nextcloud, Jitsi and Roblox responsibilities separated;
- [x] Business-in-a-Box departments defined;
- [x] unauthorized Redis infrastructure removed;
- [ ] audit every current backend responsibility against canonical LeeWay ownership;
- [ ] define the thin product-to-LeeWay contract without inventing canonical capability IDs;
- [ ] define owner/guardian/user role and approval boundaries.

Acceptance gate: no current code duplicates a known LeeWay platform responsibility, and every unbound LeeWay dependency fails closed.

### L2 — Thin product/domain backend
- creator/project/room/artifact/listing/approval domain state only;
- Authentik identity adapter;
- Nextcloud collaboration/storage adapter;
- Jitsi RTC adapter;
- Roblox adapter;
- receipt/provenance references to canonical LeeWay evidence;
- no custom model router, memory engine, automation engine, security engine or queue/cache layer.

Acceptance gate: backend can represent Leo's Insight domain objects without pretending to provide LeeWay intelligence.

### L3 — Canonical LeeWay binding
- inspect Forgejo canonical Runtime Fabric ingress;
- verify canonical Harness/Intelligence entry contract;
- verify Formula artifact/version/hash and real input/output contract;
- verify Security Harness contract;
- verify Sensory Harness contract;
- verify Automation Harness contract;
- verify Memory/Context path;
- verify model/1B-worker routing contract;
- verify Veritas pre/post gate and receipt/Learning Ledger path;
- bind adapters only to proven authorities.

Acceptance gate: one authenticated text request traverses the real governed artery and produces inspectable Veritas/receipt evidence.

### L4 — Formula + intelligence proof
- run a real creator-intent test through the canonical Formula;
- prove meaning/state preparation from actual Formula output rather than a mock;
- prove Harness routing chooses an authorized capability/worker;
- prove model escalation is justified and traceable.

Acceptance gate: real Formula/Harness evidence exists for a creator request.

### L5 — Security + identity proof
- Authentik establishes identity;
- Security Harness authorizes capability/room/project access;
- youth/guardian/owner policy boundaries enforced;
- consequential decisions fail upward.

### L6 — Sensory + communications proof
- Jitsi Creator Room;
- Sensory Harness voice ingress/egress;
- barge-in and addressed Leo participation;
- text/video/audio/file/project collaboration;
- room security and moderation boundaries.

### L7 — Creator + Universe Builder
- cards and governed creator artifacts;
- Luau learning/coding workflow;
- character/world/gameplay/UI/data builders;
- project graph and versions;
- collaborative creation through Creator Rooms.

### L8 — Roblox bridge
- Studio/Open Cloud authority;
- code/asset/place testing;
- publish/update workflow;
- Roblox IDs recorded in product domain state;
- Veritas/approval gate before consequential release.

### L9 — Business departments
- support;
- marketing/growth;
- marketplace/business intelligence;
- education;
- community;
- owner decision console.

### L10 — Automation + autonomous operations
- monitoring;
- deterministic/runbook recovery;
- Harness escalation when runbook repair fails;
- backup/rollback;
- support/marketing/business workflows;
- actual receipts for executed actions.

### L11 — Production proof and deployment
- end-to-end text and voice governed paths;
- self-repair proof;
- youth safety/security validation;
- load/performance testing with evidence;
- backup/disaster recovery proof;
- migrate deployment authority from GitHub build surface to Forgejo/LeeWay deployment process.

## Current blocker and next gate

Current blocker: the canonical Forgejo LeeWay v2.14 implementation cannot be inspected from this GitHub repository/session, so exact Formula/Harness endpoint names, capability identifiers and hashes remain UNVERIFIED.

Next gate: finish L1 audit/strip on the GitHub branch, then prepare the exact binding manifest that can be populated from the canonical Forgejo estate without redesigning the product again.
