-- Add tsvector column for full-text search
ALTER TABLE content ADD COLUMN search_vector tsvector;

-- Populate tsvector with title and description
UPDATE content SET search_vector = to_tsvector('english', title || ' ' || description);

-- Create GIN index on tsvector column
CREATE INDEX content_search_vector_idx ON content USING GIN (search_vector);

-- Create trigger function to update tsvector on insert or update
CREATE FUNCTION content_search_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', NEW.title || ' ' || NEW.description);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to update tsvector when title or description changes
CREATE TRIGGER content_search_update
BEFORE INSERT OR UPDATE OF title, description
ON content
FOR EACH ROW
EXECUTE FUNCTION content_search_trigger();