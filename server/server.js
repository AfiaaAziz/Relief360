const http = require("http");
const url = require("url");
const db = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

function parseBody(req, callback) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    try {
      const parsed = JSON.parse(body);
      callback(null, parsed);
    } catch (err) {
      callback(err);
    }
  });
}

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function setCORSHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  // Allow Authorization header for bearer tokens
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret";

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;
  const method = req.method;

  setCORSHeaders(res);

  if (method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // --- Auth endpoints ---
  if (pathname === "/api/auth/login" && method === "POST") {
    parseBody(req, async (err, body) => {
      if (err) return sendJSON(res, 400, { message: "Invalid JSON" });
      const { email, password } = body;
      if (!email || !password)
        return sendJSON(res, 400, { message: "Missing email or password" });
      try {
        const userResult = await db.query(
          "SELECT id, email, password_hash, role, is_active FROM users WHERE email = $1",
          [email]
        );
        if (userResult.rows.length === 0)
          return sendJSON(res, 401, { message: "Invalid credentials" });
        const user = userResult.rows[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match)
          return sendJSON(res, 401, { message: "Invalid credentials" });
        if (!user.is_active)
          return sendJSON(res, 403, { message: "User is disabled" });
        const token = generateToken(user);
        // Return user (without password_hash)
        sendJSON(res, 200, {
          token,
          user: { id: user.id, email: user.email, role: user.role },
        });
      } catch (e) {
        console.error("Login error", e);
        sendJSON(res, 500, { message: "Internal server error" });
      }
    });
    return;
  }

  if (pathname === "/api/auth/me" && method === "GET") {
    (async () => {
      try {
        const auth = req.headers["authorization"] || "";
        const parts = auth.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer")
          return sendJSON(res, 401, { message: "Missing or invalid token" });
        const token = parts[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const userResult = await db.query(
          "SELECT id, email, role, is_active FROM users WHERE id = $1",
          [decoded.id]
        );
        if (userResult.rows.length === 0)
          return sendJSON(res, 404, { message: "User not found" });
        const user = userResult.rows[0];
        if (!user.is_active)
          return sendJSON(res, 403, { message: "User disabled" });
        sendJSON(res, 200, { id: user.id, email: user.email, role: user.role });
      } catch (e) {
        console.error("Auth me error", e);
        sendJSON(res, 401, { message: "Invalid token" });
      }
    })();
    return;
  }

  // GET /api/volunteers/me - return volunteer record for authenticated user
  if (pathname === "/api/volunteers/me" && method === "GET") {
    (async () => {
      try {
        const auth = req.headers["authorization"] || "";
        const parts = auth.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer")
          return sendJSON(res, 401, { message: "Missing or invalid token" });
        const token = parts[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        // Try to find volunteer by user_id
        const volRes = await db.query(
          "SELECT * FROM volunteers WHERE user_id = $1 LIMIT 1",
          [decoded.id]
        );
        if (volRes.rows.length > 0) {
          return sendJSON(res, 200, volRes.rows[0]);
        }

        // Fallback: find by email
        const userRes = await db.query(
          "SELECT email FROM users WHERE id = $1",
          [decoded.id]
        );
        const email = userRes.rows[0]?.email;
        if (email) {
          const volByEmail = await db.query(
            "SELECT * FROM volunteers WHERE email = $1 LIMIT 1",
            [email]
          );
          if (volByEmail.rows.length > 0)
            return sendJSON(res, 200, volByEmail.rows[0]);
        }

        sendJSON(res, 404, { message: "Volunteer profile not found" });
      } catch (e) {
        console.error("GET /api/volunteers/me error", e);
        sendJSON(res, 401, { message: "Invalid token" });
      }
    })();
    return;
  }

  // Route handling
  if (pathname === "/" && method === "GET") {
    sendJSON(res, 200, { status: "ok" });
  } else if (pathname === "/api/volunteers" && method === "GET") {
    // GET /api/volunteers
    db.query(
      `
      SELECT id, first_name, last_name, email, phone, age, availability, address, experience, motivation, skills, created_at
      FROM volunteers
      ORDER BY created_at DESC
    `
    )
      .then((result) => sendJSON(res, 200, result.rows))
      .catch((err) => {
        console.error("Fetch volunteers error", err);
        sendJSON(res, 500, { message: "Internal server error" });
      });
  } else if (pathname === "/api/hospitals" && method === "GET") {
    // GET /api/hospitals
    db.query(
      `
      SELECT id, hospital_name, address, phone, emergency_phone, email, total_beds, icu_beds, emergency_beds, ambulances, staff_count, contact_name, contact_position, contact_phone, contact_email, services, status, created_at
      FROM hospital_registrations
      WHERE status = 'approved'
      ORDER BY created_at DESC
    `
    )
      .then((result) => sendJSON(res, 200, result.rows))
      .catch((err) => {
        console.error("Fetch hospitals error", err);
        sendJSON(res, 500, { message: "Internal server error" });
      });
  } else if (pathname === "/api/contact" && method === "POST") {
    // POST /api/contact
    parseBody(req, (err, body) => {
      if (err) return sendJSON(res, 400, { message: "Invalid JSON" });

      const { name, email, phone, department, subject, message, priority } =
        body;
      if (!name || !email || !department || !subject || !message) {
        return sendJSON(res, 400, { message: "Missing required fields" });
      }

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

      db.query(insertQuery, values)
        .then((result) =>
          sendJSON(res, 201, {
            id: result.rows[0].id,
            created_at: result.rows[0].created_at,
          })
        )
        .catch((err) => {
          console.error("Insert contact error", err);
          sendJSON(res, 500, { message: "Internal server error" });
        });
    });
  } else if (pathname === "/api/hospital-registration" && method === "POST") {
    // POST /api/hospital-registration
    parseBody(req, (err, body) => {
      if (err) return sendJSON(res, 400, { message: "Invalid JSON" });

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
        password,
      } = body;

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
        return sendJSON(res, 400, { message: "Missing required fields" });
      }

      // If password is provided, create a user and link it
      (async () => {
        try {
          let userId = null;
          if (password) {
            // create user with role 'hospital'
            const hashed = await bcrypt.hash(password, 10);
            const userRes = await db.query(
              `INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role`,
              [email, hashed, "hospital"]
            );
            userId = userRes.rows[0].id;
          }

          const insertQuery = `
            INSERT INTO hospital_registrations (
              hospital_name, hospital_type, address, phone, emergency_phone, email,
              total_beds, icu_beds, emergency_beds, ambulances, staff_count,
              contact_name, contact_position, contact_phone, contact_email,
              additional_info, services, terms, data_sharing, user_id
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
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
            userId,
          ];

          const result = await db.query(insertQuery, values);
          sendJSON(res, 201, {
            id: result.rows[0].id,
            created_at: result.rows[0].created_at,
          });
        } catch (err) {
          console.error("Insert hospital registration error", err);
          if (err.code === "23505") {
            // unique violation
            sendJSON(res, 409, { message: "This email already exists" });
          } else {
            sendJSON(res, 500, { message: "Internal server error" });
          }
        }
      })();
    });
  } else if (pathname === "/api/volunteer-registration" && method === "POST") {
    // POST /api/volunteer-registration
    parseBody(req, (err, body) => {
      if (err) return sendJSON(res, 400, { message: "Invalid JSON" });

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
        password,
      } = body;

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
        return sendJSON(res, 400, { message: "Missing required fields" });
      }

      (async () => {
        try {
          let userId = null;
          if (password) {
            const hashed = await bcrypt.hash(password, 10);
            const userRes = await db.query(
              `INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role`,
              [email, hashed, "volunteer"]
            );
            userId = userRes.rows[0].id;
          }

          const insertQuery = `
            INSERT INTO volunteers (
              first_name, last_name, email, phone, age, availability, address,
              experience, motivation, terms_accepted, background_check, skills, user_id
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
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
            userId,
          ];

          const result = await db.query(insertQuery, values);
          sendJSON(res, 201, {
            id: result.rows[0].id,
            created_at: result.rows[0].created_at,
          });
        } catch (err) {
          console.error("Insert volunteer registration error", err);
          if (err.code === "23505") {
            sendJSON(res, 409, {
              message:
                "This email address is already registered. Please use a different email or contact support if you need to update your registration.",
            });
          } else {
            sendJSON(res, 500, { message: "Internal server error" });
          }
        }
      })();
    });
  } else if (pathname.startsWith("/api/volunteers/") && method === "PUT") {
    // PUT /api/volunteers/:id
    const id = pathname.split("/")[3];
    parseBody(req, (err, body) => {
      if (err) return sendJSON(res, 400, { message: "Invalid JSON" });

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
      } = body;

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
        return sendJSON(res, 400, { message: "Missing required fields" });
      }

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

      db.query(updateQuery, values)
        .then((result) => {
          if (result.rows.length === 0) {
            sendJSON(res, 404, { message: "Volunteer not found" });
          } else {
            sendJSON(res, 200, {
              message: "Volunteer updated successfully",
              id: result.rows[0].id,
            });
          }
        })
        .catch((err) => {
          console.error("Update volunteer error", err);
          if (
            err.code === "23505" &&
            err.constraint === "volunteers_email_key"
          ) {
            sendJSON(res, 409, {
              message:
                "This email address is already in use by another volunteer.",
            });
          } else {
            sendJSON(res, 500, { message: "Internal server error" });
          }
        });
    });
  } else if (pathname.startsWith("/api/hospitals/") && method === "PUT") {
    // PUT /api/hospitals/:id
    const id = pathname.split("/")[3];
    parseBody(req, (err, body) => {
      if (err) return sendJSON(res, 400, { message: "Invalid JSON" });

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
      } = body;

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
        return sendJSON(res, 400, { message: "No fields to update" });
      }

      const updateQuery = `
        UPDATE hospital_registrations
        SET ${updates.join(", ")}
        WHERE id = $${paramIndex}
        RETURNING id
      `;
      values.push(id);

      db.query(updateQuery, values)
        .then((result) => {
          if (result.rows.length === 0) {
            sendJSON(res, 404, { message: "Hospital not found" });
          } else {
            sendJSON(res, 200, {
              message: "Hospital updated successfully",
              id: result.rows[0].id,
            });
          }
        })
        .catch((err) => {
          console.error("Update hospital error", err);
          sendJSON(res, 500, { message: "Internal server error" });
        });
    });
  } else if (pathname === "/api/hospitals/pending" && method === "GET") {
    // GET /api/hospitals/pending
    db.query(
      `
      SELECT id, hospital_name, address, phone, emergency_phone, email, total_beds, icu_beds, emergency_beds, ambulances, staff_count, contact_name, contact_position, contact_phone, contact_email, services, status, created_at
      FROM hospital_registrations
      WHERE status = 'pending'
      ORDER BY created_at DESC
    `
    )
      .then((result) => sendJSON(res, 200, result.rows))
      .catch((err) => {
        console.error("Fetch pending hospitals error", err);
        sendJSON(res, 500, { message: "Internal server error" });
      });
  } else if (
    pathname.startsWith("/api/hospitals/") &&
    pathname.endsWith("/status") &&
    method === "PUT"
  ) {
    // PUT /api/hospitals/:id/status
    const id = pathname.split("/")[3];
    parseBody(req, (err, body) => {
      if (err) return sendJSON(res, 400, { message: "Invalid JSON" });

      const { status } = body;
      if (!status || !["approved", "rejected"].includes(status)) {
        return sendJSON(res, 400, {
          message: "Invalid status. Must be 'approved' or 'rejected'",
        });
      }

      const updateQuery = `
        UPDATE hospital_registrations
        SET status = $1
        WHERE id = $2
        RETURNING id, hospital_name, status
      `;
      db.query(updateQuery, [status, id])
        .then((result) => {
          if (result.rows.length === 0) {
            sendJSON(res, 404, { message: "Hospital not found" });
          } else {
            sendJSON(res, 200, {
              message: `Hospital ${status} successfully`,
              hospital: result.rows[0],
            });
          }
        })
        .catch((err) => {
          console.error("Update hospital status error", err);
          sendJSON(res, 500, { message: "Internal server error" });
        });
    });
  } else if (pathname.startsWith("/api/hospitals/") && method === "DELETE") {
    // DELETE /api/hospitals/:id
    const id = pathname.split("/")[3];
    db.query(`DELETE FROM hospital_registrations WHERE id = $1 RETURNING id`, [
      id,
    ])
      .then((result) => {
        if (result.rows.length === 0) {
          sendJSON(res, 404, { message: "Hospital not found" });
        } else {
          sendJSON(res, 200, {
            message: "Hospital deleted successfully",
            id: result.rows[0].id,
          });
        }
      })
      .catch((err) => {
        console.error("Delete hospital error", err);
        sendJSON(res, 500, { message: "Internal server error" });
      });
  } else if (pathname.startsWith("/api/volunteers/") && method === "DELETE") {
    // DELETE /api/volunteers/:id
    const id = pathname.split("/")[3];
    db.query(`DELETE FROM volunteers WHERE id = $1 RETURNING id`, [id])
      .then((result) => {
        if (result.rows.length === 0) {
          sendJSON(res, 404, { message: "Volunteer not found" });
        } else {
          sendJSON(res, 200, {
            message: "Volunteer deleted successfully",
            id: result.rows[0].id,
          });
        }
      })
      .catch((err) => {
        console.error("Delete volunteer error", err);
        sendJSON(res, 500, { message: "Internal server error" });
      });
  } else if (pathname === "/api/incidents" && method === "GET") {
    // GET /api/incidents
    db.query(
      `
      SELECT i.*,
             COUNT(va.id) as assigned_volunteers,
             COUNT(CASE WHEN va.status = 'assigned' THEN 1 END) as active_assignments
      FROM incidents i
      LEFT JOIN volunteer_assignments va ON i.id = va.incident_id
      GROUP BY i.id
      ORDER BY i.created_at DESC
    `
    )
      .then((result) => sendJSON(res, 200, result.rows))
      .catch((err) => {
        console.error("Fetch incidents error", err);
        sendJSON(res, 500, { message: "Internal server error" });
      });
  } else if (pathname === "/api/incidents" && method === "POST") {
    // POST /api/incidents
    parseBody(req, (err, body) => {
      if (err) return sendJSON(res, 400, { message: "Invalid JSON" });

      const {
        title,
        description,
        location,
        severity,
        required_skills,
        estimated_duration,
        contact_person,
        contact_phone,
      } = body;
      if (!title || !description || !location || !severity) {
        return sendJSON(res, 400, { message: "Missing required fields" });
      }

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

      db.query(insertQuery, values)
        .then((result) =>
          sendJSON(res, 201, {
            id: result.rows[0].id,
            created_at: result.rows[0].created_at,
          })
        )
        .catch((err) => {
          console.error("Create incident error", err);
          sendJSON(res, 500, { message: "Internal server error" });
        });
    });
  } else if (pathname.startsWith("/api/incidents/") && method === "PUT") {
    // PUT /api/incidents/:id
    const id = pathname.split("/")[3];
    parseBody(req, (err, body) => {
      if (err) return sendJSON(res, 400, { message: "Invalid JSON" });

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
      } = body;

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
        return sendJSON(res, 400, { message: "No fields to update" });
      }

      const updateQuery = `
        UPDATE incidents
        SET ${updates.join(", ")}
        WHERE id = $${paramIndex}
        RETURNING id
      `;
      values.push(id);

      db.query(updateQuery, values)
        .then((result) => {
          if (result.rows.length === 0) {
            sendJSON(res, 404, { message: "Incident not found" });
          } else {
            sendJSON(res, 200, {
              message: "Incident updated successfully",
              id: result.rows[0].id,
            });
          }
        })
        .catch((err) => {
          console.error("Update incident error", err);
          sendJSON(res, 500, { message: "Internal server error" });
        });
    });
  } else if (pathname.startsWith("/api/incidents/") && method === "DELETE") {
    // DELETE /api/incidents/:id
    const id = pathname.split("/")[3];
    db.query(`DELETE FROM incidents WHERE id = $1 RETURNING id`, [id])
      .then((result) => {
        if (result.rows.length === 0) {
          sendJSON(res, 404, { message: "Incident not found" });
        } else {
          sendJSON(res, 200, {
            message: "Incident deleted successfully",
            id: result.rows[0].id,
          });
        }
      })
      .catch((err) => {
        console.error("Delete incident error", err);
        sendJSON(res, 500, { message: "Internal server error" });
      });
  } else if (
    pathname.match(/^\/api\/incidents\/\d+\/volunteers$/) &&
    method === "GET"
  ) {
    // GET /api/incidents/:id/volunteers
    const id = pathname.split("/")[3];
    db.query(
      `
      SELECT v.*, va.assigned_at, va.status as assignment_status, va.notes
      FROM volunteer_assignments va
      JOIN volunteers v ON va.volunteer_id = v.id
      WHERE va.incident_id = $1
      ORDER BY va.assigned_at DESC
    `,
      [id]
    )
      .then((result) => sendJSON(res, 200, result.rows))
      .catch((err) => {
        console.error("Fetch incident volunteers error", err);
        sendJSON(res, 500, { message: "Internal server error" });
      });
  } else if (
    pathname.match(/^\/api\/incidents\/\d+\/assign$/) &&
    method === "POST"
  ) {
    // POST /api/incidents/:id/assign
    const id = pathname.split("/")[3];
    parseBody(req, (err, body) => {
      if (err) return sendJSON(res, 400, { message: "Invalid JSON" });

      const { volunteer_id, notes } = body;
      if (!volunteer_id) {
        return sendJSON(res, 400, { message: "Volunteer ID is required" });
      }

      // Check if volunteer is already assigned
      db.query(
        `SELECT id FROM volunteer_assignments WHERE volunteer_id = $1 AND incident_id = $2`,
        [volunteer_id, id]
      )
        .then((checkResult) => {
          if (checkResult.rows.length > 0) {
            sendJSON(res, 409, {
              message: "Volunteer already assigned to this incident",
            });
            return;
          }

          // Check availability
          return db.query(`SELECT availability FROM volunteers WHERE id = $1`, [
            volunteer_id,
          ]);
        })
        .then((volunteerResult) => {
          if (volunteerResult.rows.length === 0) {
            sendJSON(res, 404, { message: "Volunteer not found" });
            return;
          }
          if (volunteerResult.rows[0].availability === "Unavailable") {
            sendJSON(res, 400, {
              message: "Volunteer is currently unavailable",
            });
            return;
          }

          // Assign
          return db.query(
            `INSERT INTO volunteer_assignments (volunteer_id, incident_id, notes) VALUES ($1, $2, $3) RETURNING id, assigned_at`,
            [volunteer_id, id, notes || null]
          );
        })
        .then((assignResult) => {
          // Update assigned status
          db.query(`UPDATE volunteers SET assigned = true WHERE id = $1`, [
            volunteer_id,
          ]);
          sendJSON(res, 201, {
            message: "Volunteer assigned successfully",
            assignment: {
              id: assignResult.rows[0].id,
              assigned_at: assignResult.rows[0].assigned_at,
            },
          });
        })
        .catch((err) => {
          console.error("Assign volunteer error", err);
          sendJSON(res, 500, { message: "Internal server error" });
        });
    });
  } else if (
    pathname.match(/^\/api\/incidents\/\d+\/assign\/\d+$/) &&
    method === "DELETE"
  ) {
    // DELETE /api/incidents/:id/assign/:volunteerId
    const parts = pathname.split("/");
    const id = parts[3];
    const volunteerId = parts[5];
    db.query(
      `DELETE FROM volunteer_assignments WHERE incident_id = $1 AND volunteer_id = $2 RETURNING id`,
      [id, volunteerId]
    )
      .then((result) => {
        if (result.rows.length === 0) {
          sendJSON(res, 404, { message: "Assignment not found" });
        } else {
          // Check other assignments
          db.query(
            `SELECT COUNT(*) as active_assignments FROM volunteer_assignments WHERE volunteer_id = $1 AND status = 'assigned'`,
            [volunteerId]
          ).then((checkResult) => {
            if (parseInt(checkResult.rows[0].active_assignments) === 0) {
              db.query(`UPDATE volunteers SET assigned = false WHERE id = $1`, [
                volunteerId,
              ]);
            }
            sendJSON(res, 200, {
              message: "Volunteer unassigned successfully",
              id: result.rows[0].id,
            });
          });
        }
      })
      .catch((err) => {
        console.error("Unassign volunteer error", err);
        sendJSON(res, 500, { message: "Internal server error" });
      });
  } else if (
    pathname === "/api/incidents/volunteers/available" &&
    method === "GET"
  ) {
    // GET /api/volunteers/available
    db.query(
      `
      SELECT id, first_name, last_name, email, phone, age, availability, address, skills
      FROM volunteers
      WHERE availability != 'Unavailable' AND assigned = false
      ORDER BY created_at DESC
    `
    )
      .then((result) => sendJSON(res, 200, result.rows))
      .catch((err) => {
        console.error("Fetch available volunteers error", err);
        sendJSON(res, 500, { message: "Internal server error" });
      });
  } else if (pathname === "/api/incidents/volunteers" && method === "GET") {
    // GET /api/incidents/volunteers
    db.query(
      `
      SELECT id, first_name, last_name, email, phone, age, availability, address, skills, assigned
      FROM volunteers
      ORDER BY created_at DESC
    `
    )
      .then((result) => sendJSON(res, 200, result.rows))
      .catch((err) => {
        console.error("Fetch volunteers error", err);
        sendJSON(res, 500, { message: "Internal server error" });
      });
  } else {
    sendJSON(res, 404, { message: "Endpoint not found" });
  }
});

// Auth endpoints
// POST /api/auth/login
// GET /api/auth/me
// Note: simple implementations using JWTs
const AUTH_PREFIX = "/api/auth";

// Add auth handlers before server.listen by wrapping previous logic; we already handle routes above,
// so add explicit checks for auth endpoints at top-level by reopening server creation would be complex.
// Instead, we handle them within the same request handler by checking their paths earlier. Add here for clarity.

// To keep code structure simple, intercept auth routes via a small additional server wrapper is not necessary
// because the main handler above will reach the following checks if path matches. (We will add them inline above.)

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
