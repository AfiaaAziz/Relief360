-- Create emergency_plans and emergency_plan_tasks tables

CREATE TABLE IF NOT EXISTS "emergency_plans" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  volunteer_id INTEGER NOT NULL REFERENCES volunteers(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_emergency_plans_volunteer_id ON emergency_plans(volunteer_id);

CREATE TABLE IF NOT EXISTS "emergency_plan_tasks" (
  id SERIAL PRIMARY KEY,
  plan_id INTEGER NOT NULL REFERENCES emergency_plans(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_emergency_plan_tasks_plan_id ON emergency_plan_tasks(plan_id);
