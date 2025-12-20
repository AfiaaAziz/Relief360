# Complete Fix Guide: "My Incidents" Not Showing

## Issue Summary

Users cannot see their reported incidents in the "My Incidents" section because:

1. **New incidents**: Now fixed - authentication header added to incident creation
2. **Existing incidents**: Need to be updated in the database with proper user identification

## Step-by-Step Fix

### Step 1: Test New Incident Creation (Verify the Fix Works)

1. **Log in** as the affected user (e.g., ali@gmail.com)
2. **Go to "Report Incident"** page
3. **Create a new test incident** with these details:
   - Type: "Other"
   - Severity: "Medium"
   - Description: "Test incident for debugging"
   - Location: "Test Location"
4. **Submit the incident**
5. **Wait for success message**

### Step 2: Check Backend Debug Information

1. **Go to "My Incidents" page**
2. **Scroll down to "Debug Information" section**
3. **Click "Show Debug Info"**
4. **Look at the "Backend Debug Info" section**

You should see something like this:

```json
{
  "currentUser": { "id": 1, "email": "ali@gmail.com", "role": "citizen" },
  "extractedUserId": 1,
  "extractedUserEmail": "ali@gmail.com",
  "totalIncidentsInDB": 5,
  "userIncidentsCount": 1, // ← This should be > 0 after new incident
  "allIncidentsSummary": [
    {
      "id": 6,
      "title": "Other: Test Location",
      "reported_by_user_id": 1,
      "reported_by_email": "ali@gmail.com",
      "created_at": "2023-12-07T10:30:00.000Z"
    }
    // ... other incidents with null values
  ],
  "userIncidents": [
    /* the new incident data */
  ]
}
```

**Key things to check:**

- ✅ `userIncidentsCount` > 0 (means at least one incident found)
- ✅ `allIncidentsSummary` shows the new incident with `reported_by_user_id: 1` and `reported_by_email: "ali@gmail.com"`
- ✅ The "My Incidents" table now shows at least one incident

### Step 3: Fix Existing Incidents in Database

If you still see old incidents with `null` values in `reported_by_user_id` and `reported_by_email`, you need to update them:

#### Option A: Manual Database Update (Recommended)

1. **Connect to your PostgreSQL database**
2. **Run this query to see all incidents without user identification:**

```sql
SELECT
    id,
    title,
    contact_person,
    contact_phone,
    reported_by_user_id,
    reported_by_email,
    created_at
FROM incidents
WHERE reported_by_user_id IS NULL AND reported_by_email IS NULL
ORDER BY created_at DESC;
```

3. **Update incidents for your user (ali@gmail.com, ID: 1):**

```sql
UPDATE incidents
SET
    reported_by_user_id = 1,
    reported_by_email = 'ali@gmail.com',
    updated_at = CURRENT_TIMESTAMP
WHERE reported_by_user_id IS NULL
    AND reported_by_email IS NULL
    AND (
        contact_person ILIKE '%ali%'
        OR description ILIKE '%ali%'
        OR title ILIKE '%test%'
        OR contact_phone IS NOT NULL  -- Has contact info, likely real incident
    );
```

4. **Alternative: Update ALL null incidents to your user (if you're sure):**

```sql
UPDATE incidents
SET
    reported_by_user_id = 1,
    reported_by_email = 'ali@gmail.com',
    updated_at = CURRENT_TIMESTAMP
WHERE reported_by_user_id IS NULL AND reported_by_email IS NULL;
```

#### Option B: Use the SQL Script

1. **Review the script**: `server-nestjs/src/modules/incidents/fix-existing-incidents.sql`
2. **Customize it** for your specific user identification logic
3. **Run it** against your database

### Step 4: Verify the Complete Fix

1. **Refresh the "My Incidents" page**
2. **You should now see ALL your incidents** (both new and updated existing ones)
3. **Check the debug info again** - `userIncidentsCount` should match the total incidents you expect to see

## Troubleshooting

### If "My Incidents" is Still Empty After New Incident Creation

**Check the browser console (F12 → Console tab) for errors:**

- Look for network errors when creating the incident
- Check if the API call is successful (should see 200 status)

**Check the backend console for authentication logs:**

- Look for logs showing user identification during incident creation
- Should see something like: "findByUser called with: {userId: 1, userEmail: 'ali@gmail.com'}"

### If Debug Info Shows Wrong User Data

**Check the authentication context:**

- Ensure you're logged in as the correct user
- Check if the JWT token is valid
- Verify the user object in the debug info matches your expected user

### If Database Update Doesn't Work

**Check your database schema:**

```sql
-- Verify the columns exist
\d incidents

-- Check the current data
SELECT id, title, reported_by_user_id, reported_by_email FROM incidents LIMIT 5;
```

## Expected Final Result

After completing all steps:

- ✅ "My Incidents" shows all incidents (both new and existing)
- ✅ Debug info shows correct user identification
- ✅ Backend logs confirm proper user authentication
- ✅ New incidents created will automatically be properly linked

## Quick Test Commands

**Check incidents count:**

```sql
SELECT
    COUNT(*) as total,
    COUNT(reported_by_user_id) as with_user_id,
    COUNT(reported_by_email) as with_email
FROM incidents;
```

**Check specific user incidents:**

```sql
SELECT id, title, reported_by_user_id, reported_by_email, created_at
FROM incidents
WHERE reported_by_user_id = 1 OR reported_by_email = 'ali@gmail.com'
ORDER BY created_at DESC;
```

## Notes

- **This is a one-time fix** for existing incidents
- **New incidents** will work correctly from now on
- **Backup your database** before running UPDATE queries
- **Test carefully** in a development environment first
