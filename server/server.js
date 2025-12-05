const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send({ status: "ok" }));

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
