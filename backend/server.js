// ============================================================
//  server.js  —  Anita Interior Backend Entry Point
//  
//  What this file does:
//  1. Loads environment variables from .env
//  2. Creates the Express app
//  3. Attaches middleware (CORS, JSON parser, static files)
//  4. Mounts all API routes under /api
//  5. Starts listening on PORT 5000
// ============================================================

const express  = require('express')
const cors     = require('cors')
const dotenv   = require('dotenv')
const path     = require('path')

// Load .env variables FIRST before anything else
dotenv.config()

// ── Import route files ──
const projectRoutes = require('./routes/projectRoutes')
const inquiryRoutes = require('./routes/inquiryRoutes')
const authRoutes    = require('./routes/authRoutes')

const app  = express()
const PORT = process.env.PORT || 5000

// ============================================================
//  MIDDLEWARE
// ============================================================

// CORS — allows your React frontend (localhost:5173) to call
// this backend (localhost:5000) without browser blocking
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))

// Parse incoming JSON request bodies (for POST/PUT requests)
app.use(express.json())

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }))

// ── Static File Serving ──
// This line makes the /uploads folder publicly accessible.
// When frontend requests: http://localhost:5000/uploads/image.jpg
// Express serves the actual file from: backend/uploads/image.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// ============================================================
//  API ROUTES
// ============================================================

// Health check — visit http://localhost:5000/api to test
app.get('/api', (req, res) => {
  res.json({ message: 'Anita Interior API is running ✅', status: 'ok' })
})

// All project routes  → /api/projects
app.use('/api/projects', projectRoutes)

// All inquiry routes  → /api/inquiries
app.use('/api/inquiries', inquiryRoutes)

// Auth routes         → /api/auth
app.use('/api/auth', authRoutes)

// ============================================================
//  GLOBAL ERROR HANDLER
//  Any route that calls next(err) lands here
// ============================================================
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  })
})

// ============================================================
//  START SERVER
// ============================================================
app.listen(PORT, () => {
  console.log(`🚀 Anita Interior backend running on http://localhost:${PORT}`)
})