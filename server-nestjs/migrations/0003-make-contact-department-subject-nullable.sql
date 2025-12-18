-- Migration: Make department and subject nullable in contactus table
-- This allows feedback submissions (which don't have department/subject) 
-- to be stored in the same table as contact us messages

-- Make department nullable
ALTER TABLE contactus 
ALTER COLUMN department DROP NOT NULL;

-- Make subject nullable
ALTER TABLE contactus 
ALTER COLUMN subject DROP NOT NULL;

-- Verify the changes
SELECT column_name, is_nullable, data_type 
FROM information_schema.columns 
WHERE table_name = 'contactus' 
AND column_name IN ('department', 'subject');

