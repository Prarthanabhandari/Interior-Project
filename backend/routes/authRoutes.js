// ============================================================
//  routes/authRoutes.js  —  Auth API Routes
//  Base path: /api/auth
// ============================================================

const express = require('express')
const router  = express.Router()
const protect = require('../middleware/authMiddleware')
const { login, getMe } = require('../controllers/authController')

// PUBLIC  — login and receive a JWT token
router.post('/login', login)

// PROTECTED — verify token, get current admin info
router.get('/me', protect, getMe)

module.exports = router