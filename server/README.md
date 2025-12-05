# Relief360 Server

This folder contains a minimal Express server to receive contact form submissions and store them in PostgreSQL.

Setup

- Copy `.env.example` to `.env` and set `DATABASE_URL` (or individual PG_ variables).
- Create the `contactus` table in your database using `sql_create_table.sql`. You can run it in `pgAdmin` or psql.

Install & Run

Windows (PowerShell):

```
cd server
npm install
# copy .env.example -> .env and edit
npm run dev   # requires nodemon if you want auto-restart, otherwise `npm start`
```

Endpoint

- `POST /api/contact` — accepts JSON: `{ name, email, phone, department, subject, message, priority }`
