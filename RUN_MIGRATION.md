# 🗄️ How to Run Database Migration

## Overview

Your existing database has these tables:
- contactus
- hospital_registrations
- volunteers
- incidents
- volunteer_assignments

**Missing:** users, citizens (needed for authentication)

The migration file `migration_add_auth.sql` will:
1. ✅ Create `users` table (authentication)
2. ✅ Link `volunteers` to `users` table
3. ✅ Link `hospital_registrations` to `users` table
4. ✅ Create `citizens` table
5. ✅ Create indexes for performance

---

## Step-by-Step Instructions

### Step 1: Verify PostgreSQL is Running

```bash
# Check if PostgreSQL is running
psql --version
```

Should show: `psql (PostgreSQL) 15.x` (or similar)

---

### Step 2: Run the Migration

```bash
# From your project root directory
cd c:\Users\HP\Desktop\FSWD-PROJECT\relief-360

# Run the migration file
psql -d relief360 -f server/migration_add_auth.sql
```

**Expected output:**
```
CREATE TABLE
ALTER TABLE
ALTER TABLE
ALTER TABLE
CREATE TABLE
CREATE INDEX
CREATE INDEX
CREATE INDEX
CREATE INDEX
CREATE INDEX
CREATE INDEX
```

If you see errors, read them carefully - they indicate what went wrong.

---

### Step 3: Verify the Migration

Connect to database and check tables:

```bash
# Connect to database
psql -d relief360

# Inside psql, run these commands:
\dt                          # List all tables (should see users, citizens, etc.)
\d users                      # Describe users table
\d volunteers                 # Describe volunteers table (should have user_id)
\d citizens                   # Describe citizens table (new)
```

---

## Common Issues & Solutions

### Issue 1: "Database relief360 does not exist"

**Solution:** Create the database first
```bash
createdb relief360
psql -d relief360 -f server/sql_create_table.sql
psql -d relief360 -f server/migration_add_auth.sql
```

---

### Issue 2: "Relation 'volunteers' does not exist"

**Solution:** Run the original sql_create_table.sql first
```bash
psql -d relief360 -f server/sql_create_table.sql
psql -d relief360 -f server/migration_add_auth.sql
```

---

### Issue 3: "Duplicate column user_id"

**Solution:** The column already exists - this is fine! The migration uses `IF NOT EXISTS` so it won't error.

---

### Issue 4: "Constraint unique_volunteer_email already exists"

**Solution:** The constraint already exists - this is fine! The migration checks for existing constraints.

---

## What Each Part Does

### Part 1: Create Users Table
```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,              -- Auto-incrementing ID
  email VARCHAR(255) NOT NULL UNIQUE, -- Unique email for login
  password_hash VARCHAR(255) NOT NULL,-- Bcrypt hashed password
  role VARCHAR(50) NOT NULL,          -- admin, volunteer, hospital, citizen
  is_active BOOLEAN DEFAULT true,     -- For soft deletes
  created_at TIMESTAMP,               -- When account created
  updated_at TIMESTAMP                -- When account updated
);
```

**Purpose:** Central authentication table for ALL user types

---

### Part 2: Link Volunteers to Users
```sql
ALTER TABLE volunteers
ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;
```

**Purpose:** Each volunteer record links to a user record for authentication

---

### Part 3: Link Hospital to Users
```sql
ALTER TABLE hospital_registrations
ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;
```

**Purpose:** Each hospital record links to a user record for authentication

---

### Part 4: Create Citizens Table
```sql
CREATE TABLE IF NOT EXISTS citizens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**Purpose:** New table to store citizen registration data

---

### Part 5: Create Indexes
```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_volunteers_user_id ON volunteers(user_id);
CREATE INDEX idx_citizens_user_id ON citizens(user_id);
```

**Purpose:** Speed up database queries by indexing frequently searched columns

---

## Verify Migration Success

### Check Tables Exist

```bash
psql -d relief360 -c "\dt"
```

Should show:
```
             List of relations
 Schema |           Name           | Type  | Owner
--------+--------------------------+-------+-------
 public | citizens                 | table | postgres
 public | contactus                | table | postgres
 public | hospital_registrations   | table | postgres
 public | incidents                | table | postgres
 public | users                    | table | postgres
 public | volunteer_assignments    | table | postgres
 public | volunteers               | table | postgres
```

---

### Check Users Table Structure

```bash
psql -d relief360 -c "\d users"
```

Should show:
```
                      Table "public.users"
   Column    |            Type             | Modifiers
-------------+-----------------------------+----------
 id          | integer                     | PK, AUTO
 email       | character varying(255)      | NOT NULL, UNIQUE
 password_hash | character varying(255)     | NOT NULL
 role        | character varying(50)       | NOT NULL, CHECK
 is_active   | boolean                     | DEFAULT true
 created_at  | timestamp with time zone    | DEFAULT now()
 updated_at  | timestamp with time zone    | DEFAULT now()
```

---

### Check Volunteers Table Has user_id

```bash
psql -d relief360 -c "\d volunteers"
```

Should show new `user_id` column:
```
 user_id | integer | FK to users(id)
```

---

## After Migration

Your database is now ready for the authentication system!

1. ✅ Users can register as volunteer/hospital/citizen
2. ✅ Passwords stored securely in `users` table
3. ✅ User profiles stored in `volunteers`, `hospital_registrations`, `citizens`
4. ✅ Everything linked together via `user_id`

---

## Rollback (If Needed)

If something goes wrong, you can rollback by deleting the newly created tables:

```bash
psql -d relief360 << EOF
DROP TABLE IF EXISTS citizens CASCADE;
ALTER TABLE volunteers DROP COLUMN IF EXISTS user_id CASCADE;
ALTER TABLE hospital_registrations DROP COLUMN IF EXISTS user_id CASCADE;
DROP TABLE IF EXISTS users CASCADE;
EOF
```

Then re-run the migration after fixing the issue.

---

## Next Steps After Migration

1. ✅ Database schema is ready
2. ✅ Frontend forms are ready (with password fields)
3. ✅ Backend auth endpoints are ready
4. Start the backend: `cd server && npm start`
5. Start the frontend: `npm start`
6. Test registration flows!

---

## Support

If you get stuck:
1. Check the error message carefully
2. Make sure PostgreSQL is running: `psql --version`
3. Make sure database exists: `psql -l`
4. Make sure you're in the right directory before running migration
