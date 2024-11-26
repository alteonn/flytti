-- Add system user for automated actions
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'system@flytti.se', 'SYSTEM_USER', NOW(), NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Update lead_activities to use UUID for created_by
ALTER TABLE lead_activities 
  ALTER COLUMN created_by TYPE UUID USING created_by::UUID;