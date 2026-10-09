// ============================================================
//  routes/inquiryRoutes.js  —  Inquiry API Routes
//  Base path: /api/inquiries
// ============================================================

const express = require('express')
const router  = express.Router()
const protect = require('../middleware/authMiddleware')

const {
  createInquiry,
  getAllInquiries,
  updateInquiryStatus,
  deleteInquiry,
} = require('../controllers/inquiryController')

// PUBLIC  — website visitor submits Get Quote form
router.post('/', createInquiry)

// PROTECTED — admin views/manages inquiries
router.get('/',       protect, getAllInquiries)
router.put('/:id',    protect, updateInquiryStatus)
router.delete('/:id', protect, deleteInquiry)

module.exports = router