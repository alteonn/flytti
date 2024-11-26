-- First ensure the article_category enum type exists with all values
DO $$ 
BEGIN
    -- Check if the type doesn't exist before creating it
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'article_category') THEN
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
    END IF;
END $$;

-- Then create the articles table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'articles') THEN
        -- Create articles table
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

        -- Create indexes
        CREATE INDEX idx_articles_title ON articles USING gin (to_tsvector('simple', title));
        CREATE INDEX idx_articles_slug ON articles (slug);
        CREATE INDEX idx_articles_category ON articles (category);
        CREATE INDEX idx_articles_created_at ON articles (created_at);

        -- Add updated_at trigger
        CREATE TRIGGER update_articles_updated_at
            BEFORE UPDATE ON articles
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;