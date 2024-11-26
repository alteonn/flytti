-- Add constraints to lead_company_assignments table
ALTER TABLE lead_company_assignments
    ADD CONSTRAINT lead_company_assignments_status_check
    CHECK (status IN ('pending', 'accepted', 'declined', 'completed'));

-- Create index for status field
CREATE INDEX IF NOT EXISTS idx_lead_company_assignments_status 
ON lead_company_assignments(status);

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