const express = require("express");
const cors = require("cors");
const db = require("./db");
const incidentRoutes = require("./incidentRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// Mount incident routes
app.use("/api/incidents", incidentRoutes);

app.get("/", (req, res) => res.send({ status: "ok" }));

// GET /api/volunteers
app.get("/api/volunteers", async (req, res) => {
  try {
    const query = `
      SELECT id, first_name, last_name, email, phone, age, availability, address, experience, motivation, skills, created_at
      FROM volunteers
      ORDER BY created_at DESC
    `;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch volunteers error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/hospitals
app.get("/api/hospitals", async (req, res) => {
  try {
    const query = `
      SELECT id, hospital_name, address, phone, emergency_phone, email, total_beds, icu_beds, emergency_beds, ambulances, staff_count, contact_name, contact_position, contact_phone, contact_email, services, status, created_at
      FROM hospital_registrations
      WHERE status = 'approved'
      ORDER BY created_at DESC
    `;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch hospitals error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/contact
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, department, subject, message, priority } =
    req.body;

  if (!name || !email || !department || !subject || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const insertQuery = `
      INSERT INTO contactus (name, email, phone, department, subject, message, priority)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, created_at
    `;
    const values = [
      name,
      email,
      phone || null,
      department,
      subject,
      message,
      priority || "medium",
    ];

    const result = await db.query(insertQuery, values);

    res
      .status(201)
      .json({ id: result.rows[0].id, created_at: result.rows[0].created_at });
  } catch (err) {
    console.error("Insert contact error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/hospital-registration
app.post("/api/hospital-registration", async (req, res) => {
  const {
    hospitalName,
    hospitalType,
    address,
    phone,
    emergencyPhone,
    email,
    totalBeds,
    icuBeds,
    emergencyBeds,
    ambulances,
    staffCount,
    contactName,
    contactPosition,
    contactPhone,
    contactEmail,
    additionalInfo,
    services,
    terms,
    dataSharing,
  } = req.body;

  if (
    !hospitalName ||
    !hospitalType ||
    !address ||
    !phone ||
    !emergencyPhone ||
    !email ||
    !totalBeds ||
    !icuBeds ||
    !emergencyBeds ||
    !staffCount ||
    !contactName ||
    !contactPosition ||
    !contactPhone ||
    !contactEmail
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const insertQuery = `
      INSERT INTO hospital_registrations (
        hospital_name, hospital_type, address, phone, emergency_phone, email,
        total_beds, icu_beds, emergency_beds, ambulances, staff_count,
        contact_name, contact_position, contact_phone, contact_email,
        additional_info, services, terms, data_sharing
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      RETURNING id, created_at
    `;
    const values = [
      hospitalName,
      hospitalType,
      address,
      phone,
      emergencyPhone,
      email,
      totalBeds,
      icuBeds,
      emergencyBeds,
      ambulances || null,
      staffCount,
      contactName,
      contactPosition,
      contactPhone,
      contactEmail,
      additionalInfo || null,
      services || [],
      terms,
      dataSharing,
    ];

    const result = await db.query(insertQuery, values);

    res
      .status(201)
      .json({ id: result.rows[0].id, created_at: result.rows[0].created_at });
  } catch (err) {
    console.error("Insert hospital registration error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/volunteer-registration
app.post("/api/volunteer-registration", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    age,
    availability,
    address,
    experience,
    motivation,
    termsAccepted,
    backgroundCheck,
    selectedSkills,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !age ||
    !availability ||
    !address ||
    !motivation ||
    termsAccepted === undefined ||
    backgroundCheck === undefined ||
    !selectedSkills ||
    selectedSkills.length === 0
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const insertQuery = `
      INSERT INTO volunteers (
        first_name, last_name, email, phone, age, availability, address,
        experience, motivation, terms_accepted, background_check, skills
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id, created_at
    `;
    const values = [
      firstName,
      lastName,
      email,
      phone,
      age,
      availability,
      address,
      experience || null,
      motivation,
      termsAccepted,
      backgroundCheck,
      selectedSkills,
    ];

    const result = await db.query(insertQuery, values);

    res
      .status(201)
      .json({ id: result.rows[0].id, created_at: result.rows[0].created_at });
  } catch (err) {
    console.error("Insert volunteer registration error", err);

    // Handle duplicate email error
    if (err.code === "23505" && err.constraint === "volunteers_email_key") {
      return res.status(409).json({
        message:
          "This email address is already registered. Please use a different email or contact support if you need to update your registration.",
      });
    }

    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT /api/volunteers/:id
app.put("/api/volunteers/:id", async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    email,
    phone,
    age,
    availability,
    address,
    experience,
    motivation,
    skills,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !email ||
    !phone ||
    !age ||
    !availability ||
    !address ||
    !motivation
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const updateQuery = `
      UPDATE volunteers
      SET first_name = $1, last_name = $2, email = $3, phone = $4, age = $5,
          availability = $6, address = $7, experience = $8, motivation = $9, skills = $10
      WHERE id = $11
      RETURNING id
    `;
    const values = [
      first_name,
      last_name,
      email,
      phone,
      age,
      availability,
      address,
      experience || null,
      motivation,
      skills || [],
      id,
    ];

    const result = await db.query(updateQuery, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.json({
      message: "Volunteer updated successfully",
      id: result.rows[0].id,
    });
  } catch (err) {
    console.error("Update volunteer error", err);

    // Handle duplicate email error
    if (err.code === "23505" && err.constraint === "volunteers_email_key") {
      return res.status(409).json({
        message: "This email address is already in use by another volunteer.",
      });
    }

    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT /api/hospitals/:id
app.put("/api/hospitals/:id", async (req, res) => {
  const { id } = req.params;
  const {
    hospital_name,
    address,
    phone,
    emergency_phone,
    email,
    total_beds,
    icu_beds,
    emergency_beds,
    ambulances,
    staff_count,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
    services,
  } = req.body;

  try {
    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (hospital_name !== undefined) {
      updates.push(`hospital_name = $${paramIndex++}`);
      values.push(hospital_name);
    }
    if (address !== undefined) {
      updates.push(`address = $${paramIndex++}`);
      values.push(address);
    }
    if (phone !== undefined) {
      updates.push(`phone = $${paramIndex++}`);
      values.push(phone);
    }
    if (emergency_phone !== undefined) {
      updates.push(`emergency_phone = $${paramIndex++}`);
      values.push(emergency_phone);
    }
    if (email !== undefined) {
      updates.push(`email = $${paramIndex++}`);
      values.push(email);
    }
    if (total_beds !== undefined) {
      updates.push(`total_beds = $${paramIndex++}`);
      values.push(total_beds);
    }
    if (icu_beds !== undefined) {
      updates.push(`icu_beds = $${paramIndex++}`);
      values.push(icu_beds);
    }
    if (emergency_beds !== undefined) {
      updates.push(`emergency_beds = $${paramIndex++}`);
      values.push(emergency_beds);
    }
    if (ambulances !== undefined) {
      updates.push(`ambulances = $${paramIndex++}`);
      values.push(ambulances);
    }
    if (staff_count !== undefined) {
      updates.push(`staff_count = $${paramIndex++}`);
      values.push(staff_count);
    }
    if (contact_name !== undefined) {
      updates.push(`contact_name = $${paramIndex++}`);
      values.push(contact_name);
    }
    if (contact_position !== undefined) {
      updates.push(`contact_position = $${paramIndex++}`);
      values.push(contact_position);
    }
    if (contact_phone !== undefined) {
      updates.push(`contact_phone = $${paramIndex++}`);
      values.push(contact_phone);
    }
    if (contact_email !== undefined) {
      updates.push(`contact_email = $${paramIndex++}`);
      values.push(contact_email);
    }
    if (services !== undefined) {
      updates.push(`services = $${paramIndex++}`);
      values.push(services);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const updateQuery = `
      UPDATE hospital_registrations
      SET ${updates.join(", ")}
      WHERE id = $${paramIndex}
      RETURNING id
    `;
    values.push(id);

    const result = await db.query(updateQuery, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.json({
      message: "Hospital updated successfully",
      id: result.rows[0].id,
    });
  } catch (err) {
    console.error("Update hospital error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/hospitals/pending
app.get("/api/hospitals/pending", async (req, res) => {
  try {
    const query = `
      SELECT id, hospital_name, address, phone, emergency_phone, email, total_beds, icu_beds, emergency_beds, ambulances, staff_count, contact_name, contact_position, contact_phone, contact_email, services, status, created_at
      FROM hospital_registrations
      WHERE status = 'pending'
      ORDER BY created_at DESC
    `;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch pending hospitals error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT /api/hospitals/:id/status
app.put("/api/hospitals/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !["approved", "rejected"].includes(status)) {
    return res
      .status(400)
      .json({ message: "Invalid status. Must be 'approved' or 'rejected'" });
  }

  try {
    const updateQuery = `
      UPDATE hospital_registrations
      SET status = $1
      WHERE id = $2
      RETURNING id, hospital_name, status
    `;
    const result = await db.query(updateQuery, [status, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.json({
      message: `Hospital ${status} successfully`,
      hospital: result.rows[0],
    });
  } catch (err) {
    console.error("Update hospital status error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /api/hospitals/:id
app.delete("/api/hospitals/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteQuery = `DELETE FROM hospital_registrations WHERE id = $1 RETURNING id`;
    const result = await db.query(deleteQuery, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.json({
      message: "Hospital deleted successfully",
      id: result.rows[0].id,
    });
  } catch (err) {
    console.error("Delete hospital error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /api/volunteers/:id
app.delete("/api/volunteers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteQuery = `DELETE FROM volunteers WHERE id = $1 RETURNING id`;
    const result = await db.query(deleteQuery, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.json({
      message: "Volunteer deleted successfully",
      id: result.rows[0].id,
    });
  } catch (err) {
    console.error("Delete volunteer error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
