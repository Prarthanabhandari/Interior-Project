// ============================================================
//  create_admin.js
//
//  Run this ONCE from your backend folder:
//    cd anita-interior-site/backend
//    node create_admin.js
//
//  It will:
//  1. Hash the password properly with bcrypt
//  2. Delete any old admin rows
//  3. Insert the correct admin into PostgreSQL
// ============================================================

require('dotenv').config()
const { Pool }  = require('pg')
const bcrypt    = require('bcrypt')

const pool = new Pool({
  user:     process.env.DB_USER,
  host:     process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port:     Number(process.env.DB_PORT) || 5432,
})

async function createAdmin() {
  // ── CHANGE THESE IF NEEDED ──
  const ADMIN_NAME     = 'Prarthana'
  const ADMIN_EMAIL    = 'prarthanabhandari2003@gmail.com'
  const ADMIN_PASSWORD = 'Prv@2003'
  // ────────────────────────────

  try {
    console.log('🔗 Connecting to PostgreSQL...')
    const client = await pool.connect()

    // Hash the password
    console.log('🔐 Hashing password...')
    const hash = await bcrypt.hash(ADMIN_PASSWORD, 10)
    console.log('✅ Hash generated:', hash)

    // Delete old admins and insert fresh
    await client.query('DELETE FROM admin_users')
    console.log('🗑️  Old admin records cleared')

    const result = await client.query(
      `INSERT INTO admin_users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [ADMIN_NAME, ADMIN_EMAIL, hash]
    )

    console.log('\n✅ Admin created successfully!')
    console.log('─────────────────────────────')
    console.log('  Name:    ', result.rows[0].name)
    console.log('  Email:   ', result.rows[0].email)
    console.log('  Password:', ADMIN_PASSWORD)
    console.log('  DB ID:   ', result.rows[0].id)
    console.log('─────────────────────────────')
    console.log('\n👉 Now go to http://localhost:5173/admin/login')
    console.log('   and login with those credentials.\n')

    client.release()
    process.exit(0)
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

createAdmin()