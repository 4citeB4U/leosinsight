CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS creator_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  authentik_sub text UNIQUE NOT NULL,
  display_name text NOT NULL,
  role text NOT NULL DEFAULT 'creator',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS creator_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  room_type text NOT NULL CHECK (room_type IN ('party','project','trade','learning','community','private')),
  owner_sub text NOT NULL,
  jitsi_room text UNIQUE NOT NULL,
  nextcloud_path text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS room_members (
  room_id uuid NOT NULL REFERENCES creator_rooms(id) ON DELETE CASCADE,
  authentik_sub text NOT NULL,
  membership_role text NOT NULL DEFAULT 'member',
  PRIMARY KEY (room_id, authentik_sub)
);

CREATE TABLE IF NOT EXISTS universe_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_sub text NOT NULL,
  name text NOT NULL,
  description text,
  roblox_universe_id text,
  roblox_start_place_id text,
  nextcloud_path text,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS creator_artifacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES universe_projects(id) ON DELETE SET NULL,
  creator_sub text NOT NULL,
  artifact_type text NOT NULL,
  name text NOT NULL,
  version integer NOT NULL DEFAULT 1,
  sha256 text,
  nextcloud_path text,
  roblox_asset_id text,
  veritas_state text NOT NULL DEFAULT 'UNVERIFIED',
  locked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (creator_sub, name, version)
);

CREATE TABLE IF NOT EXISTS approval_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_sub text NOT NULL,
  action_type text NOT NULL,
  payload jsonb NOT NULL,
  state text NOT NULL DEFAULT 'pending' CHECK (state IN ('pending','approved','denied','expired')),
  decided_by_sub text,
  decided_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS operation_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  leeway_receipt_id text UNIQUE,
  actor_sub text,
  capability text NOT NULL,
  status text NOT NULL,
  evidence jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
