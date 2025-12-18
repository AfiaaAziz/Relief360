-- Migration: Fix NULL values in contactus table
-- This fixes any existing rows that might have NULL values in required columns

-- Update NULL name values to 'Anonymous' if they exist
UPDATE contactus 
SET name = 'Anonymous' 
WHERE name IS NULL;

-- Update NULL email values to 'unknown@example.com' if they exist (shouldn't happen but just in case)
UPDATE contactus 
SET email = 'unknown@example.com' 
WHERE email IS NULL;

-- Update NULL message values to empty string if they exist (shouldn't happen but just in case)
UPDATE contactus 
SET message = '' 
WHERE message IS NULL;

-- Verify no NULL values remain in required columns
SELECT 
    COUNT(*) as null_names,
    (SELECT COUNT(*) FROM contactus WHERE email IS NULL) as null_emails,
    (SELECT COUNT(*) FROM contactus WHERE message IS NULL) as null_messages
FROM contactus 
WHERE name IS NULL;

