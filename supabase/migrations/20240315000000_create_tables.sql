-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create enum types for status values
DROP TYPE IF EXISTS lead_status CASCADE;
DROP TYPE IF EXISTS service_type CASCADE;
DROP TYPE IF EXISTS certification_type CASCADE;
DROP TYPE IF EXISTS article_category CASCADE;

CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'completed', 'cancelled');

CREATE TYPE service_type AS ENUM (
    'Flytthjälp',
    'Företagsflytt',
    'Utlandsflytt',
    'Flyttstädning',
    'Magasinering',
    'Dödsbo',
    'Städning'
);

CREATE TYPE certification_type AS ENUM ('ISO 14001', 'ISO 9001');

CREATE TYPE article_category AS ENUM (
    'Hem',
    'Flytthjälp',
    'Företagsflytt',
    'Utlandsflytt',
    'Flyttstädning',
    'Magasinering',
    'Dödsbo',
    'Annat'
);

-- Drop existing tables if they exist
DROP TABLE IF EXISTS lead_activities CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS company_notes CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS companies CASCADE;

-- Companies table
CREATE TABLE companies (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    description TEXT NOT NULL,
    phone TEXT NOT NULL,
    email CITEXT NOT NULL UNIQUE,
    website TEXT,
    services service_type[] DEFAULT '{}' NOT NULL,
    certifications certification_type[] DEFAULT '{}' NOT NULL,
    is_verified BOOLEAN DEFAULT false NOT NULL,
    notes TEXT,
    CONSTRAINT companies_name_length CHECK (char_length(name) >= 2),
    CONSTRAINT companies_phone_format CHECK (phone ~ '^[0-9+() -]{8,}$')
);

-- Articles table
CREATE TABLE articles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    category article_category NOT NULL,
    CONSTRAINT articles_title_length CHECK (char_length(title) >= 2),
    CONSTRAINT articles_slug_format CHECK (slug ~ '^[a-z0-9-]+$')
);

-- Company notes table for tracking changes and comments
CREATE TABLE company_notes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_by UUID NOT NULL,
    note_text TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT true NOT NULL
);

-- Leads table
CREATE TABLE leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    type service_type NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email CITEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    status lead_status DEFAULT 'new' NOT NULL,
    notes TEXT,
    assigned_company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    form_data JSONB NOT NULL DEFAULT '{}',
    CONSTRAINT leads_customer_name_length CHECK (char_length(customer_name) >= 2),
    CONSTRAINT leads_customer_phone_format CHECK (customer_phone ~ '^[0-9+() -]{8,}$')
);

-- Lead activity tracking
CREATE TABLE lead_activities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_by UUID NOT NULL,
    activity_type TEXT NOT NULL,
    description TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'
);

-- Create indexes for better query performance
CREATE INDEX idx_companies_name ON companies USING gin (to_tsvector('simple', name));
CREATE INDEX idx_companies_city ON companies USING gin (to_tsvector('simple', city));
CREATE INDEX idx_companies_services ON companies USING gin (services);
CREATE INDEX idx_companies_certifications ON companies USING gin (certifications);
CREATE INDEX idx_companies_verified ON companies (is_verified);

CREATE INDEX idx_articles_title ON articles USING gin (to_tsvector('simple', title));
CREATE INDEX idx_articles_slug ON articles (slug);
CREATE INDEX idx_articles_category ON articles (category);
CREATE INDEX idx_articles_created_at ON articles (created_at);

CREATE INDEX idx_company_notes_company_id ON company_notes (company_id);
CREATE INDEX idx_company_notes_created_at ON company_notes (created_at);

CREATE INDEX idx_leads_type ON leads (type);
CREATE INDEX idx_leads_status ON leads (status);
CREATE INDEX idx_leads_created_at ON leads (created_at);
CREATE INDEX idx_leads_customer_email ON leads (customer_email);
CREATE INDEX idx_leads_assigned_company ON leads (assigned_company_id);

CREATE INDEX idx_lead_activities_lead_id ON lead_activities (lead_id);
CREATE INDEX idx_lead_activities_created_at ON lead_activities (created_at);

-- Add updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_companies_updated_at
    BEFORE UPDATE ON companies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create views for common queries
CREATE OR REPLACE VIEW active_leads AS
SELECT l.*, c.name as assigned_company_name
FROM leads l
LEFT JOIN companies c ON l.assigned_company_id = c.id
WHERE l.status != 'cancelled';

CREATE OR REPLACE VIEW verified_companies AS
SELECT *
FROM companies
WHERE is_verified = true;

-- Functions for common operations
CREATE OR REPLACE FUNCTION assign_lead_to_company(
    lead_id UUID,
    company_id UUID,
    assigned_by UUID
) RETURNS void AS $$
BEGIN
    -- Update lead
    UPDATE leads
    SET assigned_company_id = company_id,
        updated_at = NOW()
    WHERE id = lead_id;

    -- Create activity log
    INSERT INTO lead_activities (
        lead_id,
        created_by,
        activity_type,
        description,
        metadata
    ) VALUES (
        lead_id,
        assigned_by,
        'assignment',
        'Lead assigned to company',
        jsonb_build_object('company_id', company_id)
    );
END;
$$ LANGUAGE plpgsql;