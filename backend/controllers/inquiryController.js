// ============================================================
//  controllers/inquiryController.js  —  Inquiry / Get Quote
//
//  PUBLIC:
//    POST /api/inquiries     → createInquiry  (website visitors)
//
//  PROTECTED (admin only):
//    GET  /api/inquiries     → getAllInquiries  (Anita sees all)
//    PUT  /api/inquiries/:id → updateStatus    (mark contacted etc.)
//    DELETE /api/inquiries/:id → deleteInquiry
// ============================================================

const db = require('../db')

// ============================================================
//  POST /api/inquiries
//  PUBLIC — called when a visitor submits "Get Quote" form
//
//  Body (JSON):
//    client_name, email, phone, project_type, budget, message
// ============================================================
const createInquiry = async (req, res) => {
  try {
    const { client_name, email, phone, project_type, budget, message } = req.body

    // Basic validation
    if (!client_name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      })
    }

    const result = await db.query(
      `INSERT INTO inquiries (client_name, email, phone, project_type, budget, message)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [client_name, email, phone || null, project_type || null, budget || null, message || null]
    )

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted! We will contact you shortly 📩',
      data:    result.rows[0],
    })
  } catch (err) {
    console.error('createInquiry error:', err)
    res.status(500).json({ success: false, message: 'Server error submitting inquiry' })
  }
}

// ============================================================
//  GET /api/inquiries
//  PROTECTED — Anita views all inquiries in her dashboard
//
//  Query params:
//    ?status=new        → filter by status
// ============================================================
const getAllInquiries = async (req, res) => {
  try {
    const { status } = req.query

    let sql    = 'SELECT * FROM inquiries'
    let params = []

    if (status) {
      sql += ' WHERE status = $1'
      params.push(status)
    }

    sql += ' ORDER BY created_at DESC'

    const result = await db.query(sql, params)

    res.json({
      success: true,
      count:   result.rows.length,
      data:    result.rows,
    })
  } catch (err) {
    console.error('getAllInquiries error:', err)
    res.status(500).json({ success: false, message: 'Server error fetching inquiries' })
  }
}

// ============================================================
//  PUT /api/inquiries/:id
//  PROTECTED — Update inquiry status
//
//  Body: { status: "contacted" | "converted" | "closed" }
// ============================================================
const updateInquiryStatus = async (req, res) => {
  try {
    const { id }     = req.params
    const { status } = req.body

    const validStatuses = ['new', 'contacted', 'converted', 'closed']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`,
      })
    }

    const result = await db.query(
      'UPDATE inquiries SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' })
    }

    res.json({
      success: true,
      message: `Status updated to "${status}" ✅`,
      data:    result.rows[0],
    })
  } catch (err) {
    console.error('updateInquiryStatus error:', err)
    res.status(500).json({ success: false, message: 'Server error updating status' })
  }
}

// ============================================================
//  DELETE /api/inquiries/:id
//  PROTECTED — Remove an inquiry
// ============================================================
const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params

    const result = await db.query(
      'DELETE FROM inquiries WHERE id = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' })
    }

    res.json({ success: true, message: 'Inquiry deleted ✅' })
  } catch (err) {
    console.error('deleteInquiry error:', err)
    res.status(500).json({ success: false, message: 'Server error deleting inquiry' })
  }
}

module.exports = {
  createInquiry,
  getAllInquiries,
  updateInquiryStatus,
  deleteInquiry,
}