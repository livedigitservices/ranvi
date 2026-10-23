const Enquiry = require('../models/Enquiry');
const { sendSuccess, sendError } = require('../utils/responseHelper');
const { emitNewEnquiryReceived, emitAdminStatsUpdate } = require('../utils/socketService');

// Public: Submit enquiry or book demo
const createEnquiry = async (req, res, next) => {
  try {
    const { fullName, email, phone, division, courseInterest, type, preferredMode, preferredSchedule, message } = req.body;

    if (!fullName || !email || !phone) {
      return sendError(res, 'Please provide your name, email, and mobile number', 400);
    }

    // Phone validation (Flexible 10-digit Indian standard)
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      return sendError(res, 'Please enter a valid 10-digit mobile number', 400);
    }

    const enquiry = await Enquiry.create({
      fullName,
      email: email.toLowerCase(),
      phone: cleanPhone,
      division: division || 'GENERAL',
      courseInterest: courseInterest || 'General Enquiry',
      type: type || 'GENERAL',
      preferredMode: preferredMode || 'BOTH',
      preferredSchedule: preferredSchedule || 'Flexible',
      message: message || '',
      status: 'NEW',
    });

    emitNewEnquiryReceived(enquiry);
    emitAdminStatsUpdate({ reason: 'NEW_ENQUIRY' });

    return sendSuccess(res, 'Thank you! Your enquiry has been received. Our counselor will contact you shortly.', enquiry, 201);
  } catch (error) {
    next(error);
  }
};

// Admin: Get enquiries with filtering and pagination
const getEnquiries = async (req, res, next) => {
  try {
    const { status, type, division, page = 1, limit = 20, search } = req.query;
    const query = {};

    if (status) query.status = status;
    if (type) query.type = type;
    if (division) query.division = division;
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { courseInterest: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const total = await Enquiry.countDocuments(query);
    const enquiries = await Enquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    return sendSuccess(res, 'Enquiries retrieved', {
      enquiries,
      pagination: {
        total,
        page: parseInt(page, 10),
        pages: Math.ceil(total / parseInt(limit, 10)) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update enquiry status & add note
const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return sendError(res, 'Enquiry not found', 404);
    }

    if (status) enquiry.status = status;
    if (note) {
      enquiry.adminNotes.push({
        note,
        addedBy: req.user.name || req.user.email,
        addedAt: new Date(),
      });
    }

    await enquiry.save();
    return sendSuccess(res, 'Enquiry updated successfully', enquiry);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
};
