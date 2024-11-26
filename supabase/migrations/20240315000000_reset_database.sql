-- Drop all existing tables, views, and types
DROP VIEW IF EXISTS active_leads CASCADE;
DROP VIEW IF EXISTS verified_companies CASCADE;

DROP TABLE IF EXISTS lead_activities CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS company_notes CASCADE;
DROP TABLE IF EXISTS companies CASCADE;

-- Drop custom types
DROP TYPE IF EXISTS lead_status CASCADE;
DROP TYPE IF EXISTS service_type CASCADE;
DROP TYPE IF EXISTS certification_type CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS assign_lead_to_company() CASCADE;

-- Drop extensions (optional, usually keep these)
-- DROP EXTENSION IF EXISTS "uuid-ossp";
-- DROP EXTENSION IF EXISTS "citext";
-- DROP EXTENSION IF EXISTS "pg_trgm";