-- First, ensure we have the correct column
ALTER TABLE leads DROP COLUMN IF EXISTS companies;
ALTER TABLE leads DROP COLUMN IF EXISTS assigned_company_id;

-- Add the correct foreign key column
ALTER TABLE leads 
  ADD COLUMN assigned_company_id UUID REFERENCES companies(id) ON DELETE SET NULL;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_assigned_company ON leads(assigned_company_id);

-- Update or create the active_leads view
DROP VIEW IF EXISTS active_leads;
CREATE VIEW active_leads AS
SELECT 
  l.*,
  c.name as assigned_company_name,
  c.city as assigned_company_city
FROM leads l
LEFT JOIN companies c ON l.assigned_company_id = c.id
WHERE l.status != 'cancelled';

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';