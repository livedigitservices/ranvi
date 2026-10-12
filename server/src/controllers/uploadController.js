const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { sendSuccess, sendError } = require('../utils/responseHelper');

// Ensure upload directories exist
const uploadDir = path.join(__dirname, '../../uploads');
const videoDir = path.join(uploadDir, 'videos');
const imageDir = path.join(uploadDir, 'images');
const papersDir = path.join(uploadDir, 'papers');

[uploadDir, videoDir, imageDir, papersDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, videoDir);
    } else if (
      file.mimetype === 'application/pdf' ||
      file.mimetype.includes('csv') ||
      file.mimetype.includes('json') ||
      file.mimetype.includes('document') ||
      file.mimetype.includes('sheet') ||
      file.originalname.match(/\.(pdf|csv|json|doc|docx|xlsx|xls)$/i)
    ) {
      cb(null, papersDir);
    } else {
      cb(null, imageDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase() || (file.mimetype.startsWith('video/') ? '.mp4' : '.jpg');
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('image/') ||
    file.mimetype.startsWith('video/') ||
    file.mimetype === 'application/pdf' ||
    file.mimetype.includes('csv') ||
    file.mimetype.includes('json') ||
    file.mimetype.includes('document') ||
    file.mimetype.includes('sheet') ||
    file.originalname.match(/\.(pdf|csv|json|doc|docx|xlsx|xls)$/i)
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only images, videos (MP4/WebM), PDFs, and document files (CSV/JSON/DOCX) are allowed!'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500 MB max limit
  },
  fileFilter,
});

exports.uploadMiddleware = upload;

// Image upload handler
exports.handleImageUpload = (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, 'No image file provided', 400);
    }
    const relativePath = `/uploads/images/${req.file.filename}`;
    return sendSuccess(res, {
      url: relativePath,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    }, 'Image uploaded successfully');
  } catch (err) {
    next(err);
  }
};

// Video upload handler
exports.handleVideoUpload = (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, 'No video file provided', 400);
    }
    const relativePath = `/uploads/videos/${req.file.filename}`;
    return sendSuccess(res, {
      url: relativePath,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
      provider: 'CUSTOM',
    }, 'Video uploaded successfully');
  } catch (err) {
    next(err);
  }
};

// Document / Mock Test Paper PDF upload handler
exports.handleDocumentUpload = (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, 'No document or paper file provided', 400);
    }
    const relativePath = `/uploads/papers/${req.file.filename}`;
    return sendSuccess(res, {
      url: relativePath,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    }, 'Mock test paper / document uploaded successfully');
  } catch (err) {
    next(err);
  }
};

