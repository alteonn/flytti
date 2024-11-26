-- Update article_category enum type
ALTER TYPE article_category RENAME TO article_category_old;
CREATE TYPE article_category AS ENUM (
  'Flytthjälp',
  'Företagsflytt',
  'Utlandsflytt',
  'Flyttstädning',
  'Magasinering',
  'Dödsbo',
  'Annat'
);

-- Convert existing data
ALTER TABLE articles
  ALTER COLUMN category TYPE article_category 
  USING category::text::article_category;

-- Drop old type
DROP TYPE article_category_old;