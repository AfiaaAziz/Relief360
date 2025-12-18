-- Creates core incident tracking tables if they don't exist yet.
-- Run with:
--   psql -d relief360 -f server-nestjs/migrations/0002-create-incidents-and-volunteer-assignments.sql

CREATE TABLE IF NOT EXISTS incidents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    severity VARCHAR(50) DEFAULT 'medium',
    status VARCHAR(50) DEFAULT 'pending',
    required_skills TEXT[] NULL,
    estimated_duration VARCHAR(255) NULL,
    contact_person VARCHAR(255) NULL,
    contact_phone VARCHAR(50) NULL,
    reported_by_user_id INTEGER NULL,
    assigned_volunteer_id INTEGER NULL,
    assigned_hospital_id INTEGER NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS volunteer_assignments (
    id SERIAL PRIMARY KEY,
    volunteer_id INTEGER NOT NULL,
    incident_id INTEGER NOT NULL,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'assigned',
    notes TEXT,
    CONSTRAINT fk_volunteer_assignments_volunteer
        FOREIGN KEY (volunteer_id) REFERENCES volunteers(id) ON DELETE CASCADE,
    CONSTRAINT fk_volunteer_assignments_incident
        FOREIGN KEY (incident_id) REFERENCES incidents(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_incidents_status ON incidents(status);
CREATE INDEX IF NOT EXISTS idx_incidents_severity ON incidents(severity);
CREATE INDEX IF NOT EXISTS idx_assignments_volunteer_id ON volunteer_assignments(volunteer_id);
CREATE INDEX IF NOT EXISTS idx_assignments_incident_id ON volunteer_assignments(incident_id);


