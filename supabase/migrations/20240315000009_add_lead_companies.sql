-- Drop existing view and function first
DROP VIEW IF EXISTS active_leads;
DROP FUNCTION IF EXISTS get_lead_assigned_companies(UUID);

-- Create a junction table for leads and companies
CREATE TABLE IF NOT EXISTS lead_company_assignments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    assigned_by UUID NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    notes TEXT,
    UNIQUE(lead_id, company_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_lead_company_assignments_lead_id ON lead_company_assignments(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_company_assignments_company_id ON lead_company_assignments(company_id);
CREATE INDEX IF NOT EXISTS idx_lead_company_assignments_status ON lead_company_assignments(status);

-- Add status check constraint
ALTER TABLE lead_company_assignments
    ADD CONSTRAINT lead_company_assignments_status_check
    CHECK (status IN ('pending', 'accepted', 'declined', 'completed'));

-- Create a function to get assigned companies for a lead
CREATE OR REPLACE FUNCTION get_lead_assigned_companies(p_lead_id UUID)
RETURNS TABLE (
    id UUID,
    name TEXT,
    city TEXT,
    assigned_at TIMESTAMPTZ,
    status TEXT
) 
LANGUAGE sql
STABLE
AS $$
    SELECT 
        c.id,
        c.name,
        c.city,
        lca.assigned_at,
        lca.status
    FROM lead_company_assignments lca
    JOIN companies c ON lca.company_id = c.id
    WHERE lca.lead_id = p_lead_id
    ORDER BY lca.assigned_at DESC;
$$;

-- Add trigger to update assigned_at on status change
CREATE OR REPLACE FUNCTION update_lead_company_assignment_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        NEW.assigned_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_lead_company_assignment_timestamp
    BEFORE UPDATE ON lead_company_assignments
    FOR EACH ROW
    EXECUTE FUNCTION update_lead_company_assignment_timestamp();

-- Recreate the active_leads view with assigned companies
CREATE OR REPLACE VIEW active_leads AS
SELECT 
    l.*,
    (
        SELECT jsonb_agg(
            jsonb_build_object(
                'id', ac.id,
                'name', ac.name,
                'city', ac.city,
                'assigned_at', ac.assigned_at,
                'status', ac.status
            )
        )
        FROM get_lead_assigned_companies(l.id) ac
    ) as assigned_companies
FROM leads l
WHERE l.status != 'cancelled';