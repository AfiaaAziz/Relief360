const { Pool } = require('pg');
require('dotenv').config();

// Prefer a single DATABASE_URL (e.g., from pgAdmin connection or Heroku)
const connectionString = process.env.DATABASE_URL;

const pool = new Pool(
  connectionString
    ? { connectionString, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false }
    : {
        host: process.env.PG_HOST || 'localhost',
        port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : 5432,
        database: process.env.PG_DATABASE || 'relief360',
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
      }
);

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
