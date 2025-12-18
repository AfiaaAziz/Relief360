-- Fix NULL values in contactus table before TypeORM synchronize
-- Run this script first to fix existing data

-- Step 1: Update NULL name values
UPDATE contactus 
SET name = 'Anonymous' 
WHERE name IS NULL;

-- Step 2: Update NULL email values (shouldn't happen but just in case)
UPDATE contactus 
SET email = 'unknown@example.com' 
WHERE email IS NULL;

-- Step 3: Update NULL message values (shouldn't happen but just in case)
UPDATE contactus 
SET message = 'No message provided' 
WHERE message IS NULL;

-- Step 4: Verify no NULL values remain
SELECT 
    'name' as column_name,
    COUNT(*) as null_count
FROM contactus 
WHERE name IS NULL
UNION ALL
SELECT 
    'email' as column_name,
    COUNT(*) as null_count
FROM contactus 
WHERE email IS NULL
UNION ALL
SELECT 
    'message' as column_name,
    COUNT(*) as null_count
FROM contactus 
WHERE message IS NULL;

-- If all counts are 0, you're good to go!

