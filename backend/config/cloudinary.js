// ============================================================
//  config/cloudinary.js  —  Cloudinary Setup (Optional)
//
//  Currently the project uses LOCAL storage (/uploads folder).
//  This file is ready for when you want to switch to cloud.
//
//  TO SWITCH TO CLOUDINARY:
//  1. npm install cloudinary multer-storage-cloudinary
//  2. Fill in CLOUDINARY_* keys in your .env
//  3. In uploadMiddleware.js, replace diskStorage with:
//       const { CloudinaryStorage } = require('multer-storage-cloudinary')
//       const cloudinary = require('../config/cloudinary')
//       const storage = new CloudinaryStorage({
//         cloudinary,
//         params: { folder: 'anita-interior', allowed_formats: ['jpg','png','mp4'] }
//       })
// ============================================================

const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

module.exports = cloudinary