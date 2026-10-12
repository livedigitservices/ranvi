const Faculty = require('../models/Faculty');
const { sendSuccess, sendError } = require('../utils/responseHelper');

// Public: get all active faculty
exports.getFacultyList = async (req, res, next) => {
  try {
    const { isFeatured } = req.query;
    const query = { isActive: true };
    if (isFeatured === 'true') {
      query.isFeatured = true;
    }

    const faculty = await Faculty.find(query).sort({ displayOrder: 1, createdAt: -1 });
    return sendSuccess(res, faculty, 'Faculty list retrieved successfully');
  } catch (err) {
    next(err);
  }
};

// Public: get single faculty profile
exports.getFacultyById = async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return sendError(res, 'Faculty profile not found', 404);
    }
    return sendSuccess(res, faculty);
  } catch (err) {
    next(err);
  }
};

// Admin: create faculty profile
exports.createFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.create(req.body);
    return sendSuccess(res, faculty, 'Faculty profile created successfully', 201);
  } catch (err) {
    next(err);
  }
};

// Admin: update faculty profile
exports.updateFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!faculty) {
      return sendError(res, 'Faculty profile not found', 404);
    }
    return sendSuccess(res, faculty, 'Faculty profile updated successfully');
  } catch (err) {
    next(err);
  }
};

// Admin: delete faculty profile
exports.deleteFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) {
      return sendError(res, 'Faculty profile not found', 404);
    }
    return sendSuccess(res, { id: req.params.id }, 'Faculty profile deleted successfully');
  } catch (err) {
    next(err);
  }
};
