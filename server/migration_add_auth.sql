-- Migration: Add Authentication System to Existing Database
-- This migration adds the users table and links existing tables to it
-- All existing data in volunteers and hospital_registrations is preserved

-- ============================================================================
-- STEP 1: Create users table (central authentication table)
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'volunteer', 'hospital', 'citizen')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================================================
-- STEP 2: Modify volunteers table to add foreign key to users
-- ============================================================================

ALTER TABLE volunteers
ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;

-- Add unique constraint on email in volunteers table
ALTER TABLE volunteers
ADD CONSTRAINT IF NOT EXISTS unique_volunteer_email UNIQUE (email);

-- ============================================================================
-- STEP 3: Modify hospital_registrations table to add foreign key to users
-- ============================================================================

ALTER TABLE hospital_registrations
ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;

-- Add unique constraint on email in hospital_registrations table
ALTER TABLE hospital_registrations
ADD CONSTRAINT IF NOT EXISTS unique_hospital_email UNIQUE (email);

-- Add status column for hospital approval workflow
ALTER TABLE hospital_registrations
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));

-- ============================================================================
-- STEP 4: Create citizens table (new table for citizen registration)
-- ============================================================================

CREATE TABLE IF NOT EXISTS citizens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================================================
-- STEP 5: Create indexes for better performance
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_volunteers_user_id ON volunteers(user_id);
CREATE INDEX IF NOT EXISTS idx_hospital_registrations_user_id ON hospital_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_citizens_user_id ON citizens(user_id);
CREATE INDEX IF NOT EXISTS idx_citizens_email ON citizens(email);

-- ============================================================================
-- OPTIONAL: Insert admin user (if needed for testing)
-- ============================================================================
-- Uncomment below to insert admin user with email: admin@relief360.com
-- Password hash is for "admin123" (bcrypt hash with 10 rounds)
-- 
-- INSERT INTO users (email, password_hash, role, is_active)
-- VALUES ('admin@relief360.com', '$2b$10$YourHashedPasswordHere', 'admin', true)
-- ON CONFLICT (email) DO NOTHING;

-- ============================================================================
-- Migration Complete
-- ============================================================================
-- 
-- What was done:
-- 1. Created 'users' table for authentication (central table for all roles)
-- 2. Added 'user_id' foreign key to 'volunteers' table
-- 3. Added 'user_id' foreign key to 'hospital_registrations' table
-- 4. Added 'status' column to 'hospital_registrations' for approval workflow
-- 5. Created 'citizens' table for new citizen registration feature
-- 6. Added indexes for faster queries
--
-- All existing data in volunteers and hospital_registrations is preserved!
-- These tables are now linked to the authentication system via user_id
--
-- Data Structure:
-- users → volunteers (1-to-1)
-- users → hospital_registrations (1-to-1)
-- users → citizens (1-to-1)
--
-- ============================================================================
