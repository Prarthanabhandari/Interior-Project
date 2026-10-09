// ============================================================
//  middleware/uploadMiddleware.js  —  Multer File Upload Config
//
//  Multer is a middleware that handles multipart/form-data
//  (i.e., file uploads from HTML forms or FormData in React).
//
//  HOW IT WORKS:
//  1. Frontend sends a POST request with FormData containing
//     the file + metadata (title, category, etc.)
//  2. Multer intercepts the request BEFORE the controller
//  3. It saves the file to /backend/uploads/
//  4. It adds req.file (single) or req.files (multiple) to
//     the request object for the controller to use
// ============================================================

const multer = require('multer')
const path   = require('path')
const fs     = require('fs')

// ── Ensure uploads folder exists ──
const uploadsDir = path.join(__dirname, '..', 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// ── Storage Engine ──
// diskStorage gives us full control over where and how to
// name files when they land on disk
const storage = multer.diskStorage({

  // destination: which folder to save the file in
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },

  // filename: rename the file to avoid collisions
  // Result: "1700000000000-image.jpg"  (timestamp + original name)
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`
    cb(null, uniqueName)
  },
})

// ── File Filter ──
// Only allow images and videos — reject everything else
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
  ]

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true)   // ✅ accept file
  } else {
    cb(new Error('Only images (jpg, png, webp) and videos (mp4, mov, avi) are allowed'), false)
  }
}

// ── Create Multer instance ──
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max per file
  },
})

module.exports = upload