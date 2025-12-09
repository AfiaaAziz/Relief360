-- Migration: Create user accounts for existing volunteers
-- This script creates user records for volunteers who don't have user_id set
-- All existing volunteers will get a default password that they must change

-- ============================================================================
-- STEP 1: Create user accounts for existing volunteers without user_id
-- ============================================================================

-- Insert users for volunteers who don't have user_id set
-- Using a default password hash for 'changeme123' (bcrypt with 10 rounds)
-- Volunteers will be required to change this password on first login

INSERT INTO users (email, password_hash, role, is_active, created_at, updated_at)
SELECT
    v.email,
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- 'changeme123'
    'volunteer',
    true,
    v.created_at,
    NOW()
FROM volunteers v
WHERE v.user_id IS NULL
  AND NOT EXISTS (SELECT 1 FROM users u WHERE u.email = v.email);

-- ============================================================================
-- STEP 2: Update volunteers table to link to the newly created users
-- ============================================================================

UPDATE volunteers
SET user_id = u.id
FROM users u
WHERE volunteers.email = u.email
  AND volunteers.user_id IS NULL
  AND u.role = 'volunteer';

-- ============================================================================
-- STEP 3: Create user accounts for existing hospitals without user_id
-- ============================================================================

INSERT INTO users (email, password_hash, role, is_active, created_at, updated_at)
SELECT
    h.email,
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- 'changeme123'
    'hospital',
    true,
    h.created_at,
    NOW()
FROM hospital_registrations h
WHERE h.user_id IS NULL
  AND NOT EXISTS (SELECT 1 FROM users u WHERE u.email = h.email);

-- ============================================================================
-- STEP 4: Update hospitals table to link to the newly created users
-- ============================================================================

UPDATE hospital_registrations
SET user_id = u.id
FROM users u
WHERE hospital_registrations.email = u.email
  AND hospital_registrations.user_id IS NULL
  AND u.role = 'hospital';

-- ============================================================================
-- Migration Complete
-- ============================================================================
--
-- What was done:
-- 1. Created user accounts for existing volunteers without user_id
-- 2. Created user accounts for existing hospitals without user_id
-- 3. Linked existing records to their corresponding user accounts
-- 4. Set default password 'changeme123' for all migrated accounts
--
-- IMPORTANT: All migrated users should change their password on first login!
-- The default password is 'changeme123'
--
-- ============================================================================
