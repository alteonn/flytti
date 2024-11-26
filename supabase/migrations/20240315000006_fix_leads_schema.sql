-- Drop existing views that might reference the leads table
DROP VIEW IF EXISTS active_leads;

-- Ensure we have the correct columns and relationships
ALTER TABLE leads DROP COLUMN IF EXISTS company;
ALTER TABLE leads DROP COLUMN IF EXISTS companies;

-- Make sure we have the assigned_company_id column with the correct foreign key
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leads' AND column_name = 'assigned_company_id'
  ) THEN
    ALTER TABLE leads ADD COLUMN assigned_company_id UUID REFERENCES companies(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Create or update indexes
DROP INDEX IF EXISTS idx_leads_assigned_company;
CREATE INDEX idx_leads_assigned_company ON leads(assigned_company_id);

-- Recreate the active_leads view with the correct joins
CREATE OR REPLACE VIEW active_leads AS
SELECT 
  l.*,
  c.name as company_name,
  c.city as company_city
FROM leads l
LEFT JOIN companies c ON l.assigned_company_id = c.id
WHERE l.status != 'cancelled';

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';