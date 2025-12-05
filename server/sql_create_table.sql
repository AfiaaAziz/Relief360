CREATE TABLE IF NOT EXISTS contactus (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  department VARCHAR(100) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS hospital_registrations (
  id SERIAL PRIMARY KEY,
  hospital_name VARCHAR(255) NOT NULL,
  hospital_type VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(50) NOT NULL,
  emergency_phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  total_beds INTEGER NOT NULL,
  icu_beds INTEGER NOT NULL,
  emergency_beds INTEGER NOT NULL,
  ambulances INTEGER,
  staff_count INTEGER NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  contact_position VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(50) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  additional_info TEXT,
  services TEXT[], -- Array of service IDs
  terms BOOLEAN NOT NULL DEFAULT false,
  data_sharing BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS volunteers (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50) NOT NULL,
  age VARCHAR(20) NOT NULL,
  availability VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  experience TEXT,
  motivation TEXT NOT NULL,
  terms_accepted BOOLEAN NOT NULL DEFAULT false,
  background_check BOOLEAN NOT NULL DEFAULT false,
  skills TEXT[], -- Array of skill IDs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
