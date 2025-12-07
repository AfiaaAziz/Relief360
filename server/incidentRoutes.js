const express = require("express");
const db = require("./db");

const router = express.Router();

// GET /api/incidents
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT i.*,
             COUNT(va.id) as assigned_volunteers,
             COUNT(CASE WHEN va.status = 'assigned' THEN 1 END) as active_assignments
      FROM incidents i
      LEFT JOIN volunteer_assignments va ON i.id = va.incident_id
      GROUP BY i.id
      ORDER BY i.created_at DESC
    `;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch incidents error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/incidents
router.post("/", async (req, res) => {
  const {
    title,
    description,
    location,
    severity,
    required_skills,
    estimated_duration,
    contact_person,
    contact_phone,
  } = req.body;

  if (!title || !description || !location || !severity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const insertQuery = `
      INSERT INTO incidents (
        title, description, location, severity, required_skills,
        estimated_duration, contact_person, contact_phone
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, created_at
    `;
    const values = [
      title,
      description,
      location,
      severity,
      required_skills || [],
      estimated_duration || null,
      contact_person || null,
      contact_phone || null,
    ];

    const result = await db.query(insertQuery, values);

    res.status(201).json({
      id: result.rows[0].id,
      created_at: result.rows[0].created_at,
    });
  } catch (err) {
    console.error("Create incident error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT /api/incidents/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    location,
    severity,
    status,
    required_skills,
    estimated_duration,
    contact_person,
    contact_phone,
  } = req.body;

  try {
    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(title);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(description);
    }
    if (location !== undefined) {
      updates.push(`location = $${paramIndex++}`);
      values.push(location);
    }
    if (severity !== undefined) {
      updates.push(`severity = $${paramIndex++}`);
      values.push(severity);
    }
    if (status !== undefined) {
      updates.push(`status = $${paramIndex++}`);
      values.push(status);
    }
    if (required_skills !== undefined) {
      updates.push(`required_skills = $${paramIndex++}`);
      values.push(required_skills);
    }
    if (estimated_duration !== undefined) {
      updates.push(`estimated_duration = $${paramIndex++}`);
      values.push(estimated_duration);
    }
    if (contact_person !== undefined) {
      updates.push(`contact_person = $${paramIndex++}`);
      values.push(contact_person);
    }
    if (contact_phone !== undefined) {
      updates.push(`contact_phone = $${paramIndex++}`);
      values.push(contact_phone);
    }

    updates.push(`updated_at = now()`);

    if (updates.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const updateQuery = `
      UPDATE incidents
      SET ${updates.join(", ")}
      WHERE id = $${paramIndex}
      RETURNING id
    `;
    values.push(id);

    const result = await db.query(updateQuery, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.json({
      message: "Incident updated successfully",
      id: result.rows[0].id,
    });
  } catch (err) {
    console.error("Update incident error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /api/incidents/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteQuery = `DELETE FROM incidents WHERE id = $1 RETURNING id`;
    const result = await db.query(deleteQuery, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.json({
      message: "Incident deleted successfully",
      id: result.rows[0].id,
    });
  } catch (err) {
    console.error("Delete incident error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/incidents/:id/volunteers
router.get("/:id/volunteers", async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT v.*, va.assigned_at, va.status as assignment_status, va.notes
      FROM volunteer_assignments va
      JOIN volunteers v ON va.volunteer_id = v.id
      WHERE va.incident_id = $1
      ORDER BY va.assigned_at DESC
    `;
    const result = await db.query(query, [id]);
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch incident volunteers error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/incidents/:id/assign
router.post("/:id/assign", async (req, res) => {
  const { id } = req.params;
  const { volunteer_id, notes } = req.body;

  if (!volunteer_id) {
    return res.status(400).json({ message: "Volunteer ID is required" });
  }

  try {
    // Check if volunteer is already assigned to this incident
    const checkQuery = `
      SELECT id FROM volunteer_assignments
      WHERE volunteer_id = $1 AND incident_id = $2
    `;
    const checkResult = await db.query(checkQuery, [volunteer_id, id]);

    if (checkResult.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "Volunteer already assigned to this incident" });
    }

    // Check if volunteer is available
    const volunteerQuery = `SELECT availability FROM volunteers WHERE id = $1`;
    const volunteerResult = await db.query(volunteerQuery, [volunteer_id]);

    if (volunteerResult.rows.length === 0) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    if (volunteerResult.rows[0].availability === "Unavailable") {
      return res
        .status(400)
        .json({ message: "Volunteer is currently unavailable" });
    }

    // Assign volunteer
    const assignQuery = `
      INSERT INTO volunteer_assignments (volunteer_id, incident_id, notes)
      VALUES ($1, $2, $3)
      RETURNING id, assigned_at
    `;
    const assignResult = await db.query(assignQuery, [
      volunteer_id,
      id,
      notes || null,
    ]);

    // Update volunteer's assigned status
    await db.query(`UPDATE volunteers SET assigned = true WHERE id = $1`, [
      volunteer_id,
    ]);

    res.status(201).json({
      message: "Volunteer assigned successfully",
      assignment: {
        id: assignResult.rows[0].id,
        assigned_at: assignResult.rows[0].assigned_at,
      },
    });
  } catch (err) {
    console.error("Assign volunteer error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /api/incidents/:id/assign/:volunteerId
router.delete("/:id/assign/:volunteerId", async (req, res) => {
  const { id, volunteerId } = req.params;

  try {
    const deleteQuery = `
      DELETE FROM volunteer_assignments
      WHERE incident_id = $1 AND volunteer_id = $2
      RETURNING id
    `;
    const result = await db.query(deleteQuery, [id, volunteerId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Check if volunteer has other active assignments
    const checkQuery = `
      SELECT COUNT(*) as active_assignments
      FROM volunteer_assignments
      WHERE volunteer_id = $1 AND status = 'assigned'
    `;
    const checkResult = await db.query(checkQuery, [volunteerId]);

    // Update volunteer's assigned status if no other active assignments
    if (parseInt(checkResult.rows[0].active_assignments) === 0) {
      await db.query(`UPDATE volunteers SET assigned = false WHERE id = $1`, [
        volunteerId,
      ]);
    }

    res.json({
      message: "Volunteer unassigned successfully",
      id: result.rows[0].id,
    });
  } catch (err) {
    console.error("Unassign volunteer error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/volunteers/available
router.get("/volunteers/available", async (req, res) => {
  try {
    const query = `
      SELECT id, first_name, last_name, email, phone, age, availability, address, skills
      FROM volunteers
      WHERE availability != 'Unavailable' AND assigned = false
      ORDER BY created_at DESC
    `;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch available volunteers error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
