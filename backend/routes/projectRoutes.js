// ============================================================
//  routes/projectRoutes.js  —  Project API Routes
//
//  Base path (set in server.js): /api/projects
//
//  PUBLIC  → No auth needed (visitors can view portfolio)
//  PROTECTED → Requires JWT token (admin actions only)
// ============================================================

const express  = require('express')
const router   = express.Router()

const upload   = require('../middleware/uploadMiddleware')  // Multer
const protect  = require('../middleware/authMiddleware')     // JWT guard

const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController')

// ── PUBLIC ROUTES ──────────────────────────────────────────

// GET  /api/projects              → all projects (with optional ?category= filter)
// GET  /api/projects?category=KITCHEN&media_type=image
router.get('/', getAllProjects)

// GET  /api/projects/42           → single project
router.get('/:id', getProjectById)

// ── PROTECTED ROUTES (admin only) ─────────────────────────

// POST /api/projects
// Body: FormData with { file, title, category, description, is_featured }
// upload.single('file') = Multer processes ONE file with field name "file"
router.post('/', protect, upload.single('file'), createProject)

// PUT  /api/projects/42
// Body: JSON with { title, category, description, is_featured }
router.put('/:id', protect, updateProject)

// DELETE /api/projects/42
router.delete('/:id', protect, deleteProject)

module.exports = router