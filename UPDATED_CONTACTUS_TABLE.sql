-- Updated CREATE TABLE statement for contactus
-- department and subject are now nullable to support both feedback and contact us messages

CREATE TABLE IF NOT EXISTS contactus (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  department VARCHAR(100),  -- Changed: Now nullable (was NOT NULL)
  subject VARCHAR(255),    -- Changed: Now nullable (was NOT NULL)
  message TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status VARCHAR(50) DEFAULT 'pending'
);

-- If table already exists, run this migration instead:
-- ALTER TABLE contactus ALTER COLUMN department DROP NOT NULL;
-- ALTER TABLE contactus ALTER COLUMN subject DROP NOT NULL;

SELECT * FROM contactus;

