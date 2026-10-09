// ============================================================
//  middleware/authMiddleware.js  —  JWT Auth Guard
//
//  Protects admin-only routes so only Anita can access them.
//
//  HOW IT WORKS:
//  1. Frontend stores the JWT token in localStorage after login
//  2. Every protected request sends the token in the header:
//       Authorization: Bearer <token>
//  3. This middleware verifies the token before the request
//     reaches the controller
//  4. If valid → attaches req.admin = { id, email } and calls next()
//  5. If invalid/expired → returns 401 Unauthorized
//
//  USAGE in routes:
//    const protect = require('../middleware/authMiddleware')
//    router.delete('/:id', protect, deleteProject)
// ============================================================

const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
  // Get the Authorization header: "Bearer eyJhbGci..."
  const authHeader = req.headers['authorization']

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    })
  }

  // Extract the token part after "Bearer "
  const token = authHeader.split(' ')[1]

  try {
    // Verify & decode the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Attach admin info to req so controllers can use it
    // e.g., req.admin.id, req.admin.email
    req.admin = decoded

    next() // ✅ token valid — proceed to controller
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.',
    })
  }
}

module.exports = protect