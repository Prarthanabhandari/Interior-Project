// ============================================================
//  db/index.js  —  PostgreSQL Connection
//
//  We use the 'pg' library's Pool class.
//  A Pool keeps multiple connections open so the app doesn't
//  open/close a DB connection on every single API request.
//
//  HOW TO USE in any controller:
//    const db = require('../db')
//    const result = await db.query('SELECT * FROM projects')
//    console.log(result.rows)
// ============================================================

const { Pool } = require('pg')

const pool = new Pool({
  user:     process.env.DB_USER,
  host:     process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port:     Number(process.env.DB_PORT) || 5432,
})

// Test connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ PostgreSQL connection failed:', err.message)
    console.error('   Check your .env DB credentials')
    return
  }
  console.log('✅ PostgreSQL connected successfully')
  release()
})

// Export a simple query helper so controllers just call:
//   db.query(sql, [params])
module.exports = {
  query: (text, params) => pool.query(text, params),
}