// ============================================================
//  controllers/authController.js  —  Admin Authentication
//
//  POST /api/auth/login   → login (get JWT token)
//  GET  /api/auth/me      → verify token & get admin info
// ============================================================

const db     = require('../db')
const bcrypt = require('bcrypt')
const jwt    = require('jsonwebtoken')

// ============================================================
//  POST /api/auth/login
//  PUBLIC — Anita enters email + password on admin login page
//
//  Body: { email, password }
//
//  Returns: { token, admin: { id, name, email } }
//
//  HOW JWT WORKS:
//  1. We check DB for a matching email
//  2. We use bcrypt to compare the submitted password with the
//     stored HASH (we never store plain passwords)
//  3. If match → generate a signed JWT token (like a key card)
//  4. Frontend stores this token in localStorage
//  5. Every future admin request sends this token in headers
// ============================================================
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      })
    }

    // Find admin by email
    const result = await db.query(
      'SELECT * FROM admin_users WHERE email = $1',
      [email.toLowerCase()]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const admin = result.rows[0]

    // Compare submitted password with stored bcrypt hash
    const isMatch = await bcrypt.compare(password, admin.password_hash)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    // Generate JWT — payload contains admin id and email
    const token = jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.json({
      success: true,
      message: `Welcome back, ${admin.name}! 👋`,
      token,
      admin: {
        id:    admin.id,
        name:  admin.name,
        email: admin.email,
      },
    })
  } catch (err) {
    console.error('login error:', err)
    res.status(500).json({ success: false, message: 'Server error during login' })
  }
}

// ============================================================
//  GET /api/auth/me
//  PROTECTED — Verify token and return current admin info
//  Used by frontend on page load to check if still logged in
// ============================================================
const getMe = async (req, res) => {
  try {
    // req.admin is set by authMiddleware after token verification
    const result = await db.query(
      'SELECT id, name, email, created_at FROM admin_users WHERE id = $1',
      [req.admin.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Admin not found' })
    }

    res.json({ success: true, data: result.rows[0] })
  } catch (err) {
    console.error('getMe error:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

// ============================================================
//  Utility: Hash a password (run this manually to generate
//  a new admin password hash for the DB seed)
//
//  Usage in Node REPL:
//    const bcrypt = require('bcrypt')
//    bcrypt.hash('YourPassword', 10).then(console.log)
// ============================================================

module.exports = { login, getMe }