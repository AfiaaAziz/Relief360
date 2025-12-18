-- Migration: Make hospital optional fields nullable to match entity
-- Run this with psql or your DB client against the configured database

ALTER TABLE hospital_registrations
  ALTER COLUMN hospital_type DROP NOT NULL,
  ALTER COLUMN address DROP NOT NULL,
  ALTER COLUMN phone DROP NOT NULL,
  ALTER COLUMN emergency_phone DROP NOT NULL,
  ALTER COLUMN total_beds DROP NOT NULL,
  ALTER COLUMN icu_beds DROP NOT NULL,
  ALTER COLUMN emergency_beds DROP NOT NULL,
  ALTER COLUMN ambulances DROP NOT NULL,
  ALTER COLUMN staff_count DROP NOT NULL,
  ALTER COLUMN contact_name DROP NOT NULL,
  ALTER COLUMN contact_position DROP NOT NULL,
  ALTER COLUMN contact_phone DROP NOT NULL,
  ALTER COLUMN contact_email DROP NOT NULL,
  ALTER COLUMN additional_info DROP NOT NULL;

-- Note: `services` column already allows NULL; `email`, `hospital_name`, and `password_hash` remain NOT NULL.
