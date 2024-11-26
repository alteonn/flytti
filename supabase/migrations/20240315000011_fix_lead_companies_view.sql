-- Drop existing view first
DROP VIEW IF EXISTS active_leads;

-- Create a function to get assigned companies for a lead
CREATE OR REPLACE FUNCTION get_lead_assigned_companies(p_lead_id UUID)
RETURNS TABLE (
    id UUID,
    name TEXT,
    city TEXT,
    assigned_at TIMESTAMPTZ,
    status TEXT
) AS $$
BEGIN
    RETURN QUERY
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
END;
$$ LANGUAGE plpgsql STABLE;

-- Recreate the active_leads view
CREATE OR REPLACE VIEW active_leads AS
SELECT 
    l.*,
    COALESCE(
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
        ),
        '[]'::jsonb
    ) as assigned_companies
FROM leads l
WHERE l.status != 'cancelled';