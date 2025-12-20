
ALTER TABLE incidents 
ADD COLUMN reported_by_email VARCHAR(255);

-- Add media_files column
ALTER TABLE incidents 
ADD COLUMN media_files TEXT;

-- Add index for better query performance on reported_by_email
CREATE INDEX IF NOT EXISTS idx_incidents_reported_by_email ON incidents(reported_by_email);

COMMENT ON COLUMN incidents.reported_by_email IS 'Email of the person who reported the incident';
COMMENT ON COLUMN incidents.media_files IS 'JSON string containing information about uploaded media files';
