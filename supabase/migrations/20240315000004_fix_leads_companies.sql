-- Add assigned_company_id column to leads table
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS assigned_company_id UUID REFERENCES companies(id) ON DELETE SET NULL;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_assigned_company ON leads(assigned_company_id);

-- Update view to include company information
CREATE OR REPLACE VIEW active_leads AS
SELECT 
  l.*,
  c.name as assigned_company_name,
  c.city as assigned_company_city
FROM leads l
LEFT JOIN companies c ON l.assigned_company_id = c.id
WHERE l.status != 'cancelled';