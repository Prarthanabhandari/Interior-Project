// ============================================================
//  controllers/projectController.js  —  Project Logic
//
//  Each function handles one API endpoint.
//  Routes call these functions, keeping routes clean.
//
//  PUBLIC  (no login needed):
//    GET  /api/projects              → getAllProjects
//    GET  /api/projects/:id          → getProjectById
//
//  PROTECTED  (admin login required):
//    POST   /api/projects            → createProject
//    PUT    /api/projects/:id        → updateProject
//    DELETE /api/projects/:id        → deleteProject
// ============================================================

const db   = require('../db')
const fs   = require('fs')
const path = require('path')

// ── Helper: build the full URL for a file ──
// Converts local path "/uploads/image.jpg"
// → "http://localhost:5000/uploads/image.jpg"
const buildMediaUrl = (filename) => {
  const baseUrl = process.env.BACKEND_URL || 'http://localhost:5000'
  return `${baseUrl}/uploads/${filename}`
}

// ============================================================
//  GET /api/projects
//  PUBLIC — fetch all projects, optionally filter by category
//
//  Query params:
//    ?category=KITCHEN        → filter by category
//    ?media_type=video        → filter by type
//    ?category=KITCHEN&media_type=image → both filters
// ============================================================
const getAllProjects = async (req, res) => {
  try {
    const { category, media_type } = req.query

    // Build dynamic WHERE clause based on query params
    let sql    = 'SELECT * FROM projects'
    let params = []
    let conditions = []

    if (category) {
      conditions.push(`category = $${params.length + 1}`)
      params.push(category.toUpperCase())
    }

    if (media_type) {
      conditions.push(`media_type = $${params.length + 1}`)
      params.push(media_type)
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ')
    }

    sql += ' ORDER BY created_at DESC'

    const result = await db.query(sql, params)

    res.json({
      success: true,
      count:   result.rows.length,
      data:    result.rows,
    })
  } catch (err) {
    console.error('getAllProjects error:', err)
    res.status(500).json({ success: false, message: 'Server error fetching projects' })
  }
}

// ============================================================
//  GET /api/projects/:id
//  PUBLIC — get a single project by ID
// ============================================================
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await db.query('SELECT * FROM projects WHERE id = $1', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' })
    }

    res.json({ success: true, data: result.rows[0] })
  } catch (err) {
    console.error('getProjectById error:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

// ============================================================
//  POST /api/projects
//  PROTECTED — Anita uploads a new project image/video
//
//  Expected request (multipart/form-data):
//    file        → the actual image or video file
//    title       → "Modern White Kitchen"
//    category    → "KITCHEN"
//    description → (optional) text description
//    is_featured → (optional) "true" / "false"
// ============================================================
const createProject = async (req, res) => {
  try {
    // req.file is added by Multer middleware
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' })
    }

    const { title, category, description, is_featured } = req.body

    if (!title || !category) {
      return res.status(400).json({ success: false, message: 'Title and category are required' })
    }

    // Determine if it's an image or video based on MIME type
    const media_type = req.file.mimetype.startsWith('video/') ? 'video' : 'image'

    // Store the URL path (not full path) in the DB
    // e.g., "/uploads/1700000000000-kitchen.jpg"
    const media_url = `/uploads/${req.file.filename}`

    const result = await db.query(
      `INSERT INTO projects (title, category, description, media_type, media_url, is_featured)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        title,
        category.toUpperCase(),
        description || null,
        media_type,
        media_url,
        is_featured === 'true',
      ]
    )

    res.status(201).json({
      success: true,
      message: 'Project created successfully ✅',
      data:    result.rows[0],
    })
  } catch (err) {
    console.error('createProject error:', err)
    res.status(500).json({ success: false, message: 'Server error creating project' })
  }
}

// ============================================================
//  PUT /api/projects/:id
//  PROTECTED — Update project metadata (not the file itself)
//
//  Body (JSON):
//    title, category, description, is_featured
// ============================================================
const updateProject = async (req, res) => {
  try {
    const { id } = req.params
    const { title, category, description, is_featured } = req.body

    // Check project exists
    const existing = await db.query('SELECT * FROM projects WHERE id = $1', [id])
    if (existing.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' })
    }

    const result = await db.query(
      `UPDATE projects
       SET title = $1, category = $2, description = $3, is_featured = $4
       WHERE id = $5
       RETURNING *`,
      [
        title       || existing.rows[0].title,
        category    ? category.toUpperCase() : existing.rows[0].category,
        description !== undefined ? description : existing.rows[0].description,
        is_featured !== undefined ? is_featured === 'true' : existing.rows[0].is_featured,
        id,
      ]
    )

    res.json({
      success: true,
      message: 'Project updated ✅',
      data:    result.rows[0],
    })
  } catch (err) {
    console.error('updateProject error:', err)
    res.status(500).json({ success: false, message: 'Server error updating project' })
  }
}

// ============================================================
//  DELETE /api/projects/:id
//  PROTECTED — Delete project from DB AND delete the file
//  from the /uploads folder
// ============================================================
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params

    // Find the project first to get the file path
    const existing = await db.query('SELECT * FROM projects WHERE id = $1', [id])
    if (existing.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' })
    }

    const project = existing.rows[0]

    // Delete the actual file from /uploads folder
    // media_url is like: "/uploads/1700000000000-image.jpg"
    const filePath = path.join(__dirname, '..', project.media_url)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      console.log(`🗑️  Deleted file: ${filePath}`)
    }

    // Delete the record from database
    await db.query('DELETE FROM projects WHERE id = $1', [id])

    res.json({
      success: true,
      message: `Project "${project.title}" deleted successfully 🗑️`,
    })
  } catch (err) {
    console.error('deleteProject error:', err)
    res.status(500).json({ success: false, message: 'Server error deleting project' })
  }
}

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
}