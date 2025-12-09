-- Migration: Add password storage to volunteers table
-- This migration adds password_hash column to volunteers table
-- and migrates existing volunteers with a default password

-- ============================================================================
-- STEP 1: Add password_hash column to volunteers table
-- ============================================================================

ALTER TABLE volunteers
ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- ============================================================================
-- STEP 2: Set default password for existing volunteers
-- ============================================================================

-- Update existing volunteers with default password hash for 'changeme123'
UPDATE volunteers
SET password_hash = '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE password_hash IS NULL;

-- Make password_hash NOT NULL after setting defaults
ALTER TABLE volunteers
ALTER COLUMN password_hash SET NOT NULL;

-- ============================================================================
-- STEP 3: Add password_hash column to hospital_registrations table
-- ============================================================================

ALTER TABLE hospital_registrations
ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- Update existing hospitals with default password hash
UPDATE hospital_registrations
SET password_hash = '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE password_hash IS NULL;

-- Make password_hash NOT NULL after setting defaults
ALTER TABLE hospital_registrations
ALTER COLUMN password_hash SET NOT NULL;

-- ============================================================================
-- Migration Complete
-- ============================================================================
--
-- What was done:
-- 1. Added password_hash column to volunteers table
-- 2. Added password_hash column to hospital_registrations table
-- 3. Set default password 'changeme123' for existing records
--
-- IMPORTANT: All existing volunteers and hospitals must change their password
-- from 'changeme123' on first login!
--
-- ============================================================================
