-- Migration: create volunteer_assignments table
-- Run this in psql or your DB client against the configured database

CREATE TABLE IF NOT EXISTS volunteer_assignments (
  id SERIAL PRIMARY KEY,
  volunteer_id INTEGER NOT NULL,
  incident_id INTEGER NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status VARCHAR(50) DEFAULT 'assigned',
  notes TEXT,
  CONSTRAINT fk_volunteer FOREIGN KEY(volunteer_id) REFERENCES volunteers(id) ON DELETE CASCADE,
  CONSTRAINT fk_incident FOREIGN KEY(incident_id) REFERENCES incidents(id) ON DELETE CASCADE
);

-- Optional indexes
CREATE INDEX IF NOT EXISTS idx_volunteer_assignments_volunteer_id ON volunteer_assignments(volunteer_id);
CREATE INDEX IF NOT EXISTS idx_volunteer_assignments_incident_id ON volunteer_assignments(incident_id);
