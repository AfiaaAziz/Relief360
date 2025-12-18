-- Create Citizens Table
CREATE TABLE IF NOT EXISTS citizens (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_citizens_email ON citizens(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_citizens_created_at ON citizens(created_at);

-- Verify table creation
SELECT * FROM citizens;

