const User = require('../models/User');
const Course = require('../models/Course');
const LiveClass = require('../models/LiveClass');
const MockTest = require('../models/MockTest');
const Order = require('../models/Order');
const Entitlement = require('../models/Entitlement');
const DeviceSession = require('../models/DeviceSession');
const AuditLog = require('../models/AuditLog');
const { sendSuccess, sendError } = require('../utils/responseHelper');

// Admin Dashboard Summary Metrics
const getDashboardStats = async (req, res, next) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'STUDENT' });
    const activeStudents = await User.countDocuments({ role: 'STUDENT', isActive: true });
    const totalCourses = await Course.countDocuments({ isPublished: true });
    const totalMockTests = await MockTest.countDocuments({ isPublished: true });
    const totalLiveClassesUpcoming = await LiveClass.countDocuments({ status: { $in: ['SCHEDULED', 'LIVE'] } });
    const totalEnrollments = await Entitlement.countDocuments({ isActive: true });

    // Revenue calculation
    const paidOrders = await Order.find({ status: 'PAID' });
    const totalRevenue = paidOrders.reduce((sum, o) => sum + (o.amount || 0), 0);

    // Recent activity
    const recentStudents = await User.find({ role: 'STUDENT' }).sort({ createdAt: -1 }).limit(5);
    const recentOrders = await Order.find().populate('studentId', 'name email').sort({ createdAt: -1 }).limit(5);

    return sendSuccess(res, 'Admin overview metrics retrieved', {
      metrics: {
        totalStudents,
        activeStudents,
        totalCourses,
        totalMockTests,
        totalLiveClassesUpcoming,
        totalEnrollments,
        totalRevenue,
      },
      recentStudents,
      recentOrders,
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all students with search & pagination
const getStudents = async (req, res, next) => {
  try {
    const { search, page = 1, limit = 20, isActive } = req.query;
    const query = { role: 'STUDENT' };

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const total = await User.countDocuments(query);
    const students = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    // Attach active device status for each student
    const studentIds = students.map(s => s._id);
    const activeSessions = await DeviceSession.find({
      studentId: { $in: studentIds },
      isActive: true,
    });

    const sessionMap = new Map(activeSessions.map(s => [s.studentId.toString(), s]));

    const enrichedStudents = students.map(student => ({
      ...student.toObject(),
      activeDevice: sessionMap.get(student._id.toString()) || null,
    }));

    return sendSuccess(res, 'Students retrieved', {
      students: enrichedStudents,
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

// Admin: Reset student device session (Unlock / re-bind device)
const resetStudentDevice = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { reason } = req.body;

    const student = await User.findById(studentId);
    if (!student) {
      return sendError(res, 'Student not found', 404);
    }

    // Revoke all active sessions for this student
    const result = await DeviceSession.updateMany(
      { studentId: student._id, isActive: true },
      {
        isActive: false,
        revokedAt: new Date(),
        revokedReason: reason || 'Administrator reset device registration',
        revokedBy: 'ADMIN_RESET',
      }
    );

    // Record audit log
    await AuditLog.create({
      userId: req.user._id,
      userEmail: req.user.email,
      userRole: req.user.role,
      action: 'DEVICE_SESSION_RESET',
      resource: 'User',
      resourceId: student._id.toString(),
      details: { studentEmail: student.email, reason: reason || 'Admin reset', sessionsRevoked: result.modifiedCount },
      ipAddress: req.ip || '',
    });

    return sendSuccess(res, `Device sessions reset successfully. Student ${student.name} can now register their new device upon next login.`);
  } catch (error) {
    next(error);
  }
};

// Admin: Toggle student status (Suspend / Reactivate)
const toggleStudentStatus = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const student = await User.findById(studentId);
    if (!student) {
      return sendError(res, 'Student not found', 404);
    }

    student.isActive = !student.isActive;
    await student.save();

    await AuditLog.create({
      userId: req.user._id,
      userEmail: req.user.email,
      userRole: req.user.role,
      action: student.isActive ? 'STUDENT_ACTIVATED' : 'STUDENT_SUSPENDED',
      resource: 'User',
      resourceId: student._id.toString(),
      details: { studentEmail: student.email, newStatus: student.isActive },
    });

    return sendSuccess(res, `Student account ${student.isActive ? 'activated' : 'suspended'} successfully`, student);
  } catch (error) {
    next(error);
  }
};

// Admin: Get Audit Logs
const getAuditLogs = async (req, res, next) => {
  try {
    const { action, resource, page = 1, limit = 30 } = req.query;
    const query = {};
    if (action) query.action = action;
    if (resource) query.resource = resource;

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const total = await AuditLog.countDocuments(query);
    const logs = await AuditLog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    return sendSuccess(res, 'Audit logs retrieved', {
      logs,
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

module.exports = {
  getDashboardStats,
  getStudents,
  resetStudentDevice,
  toggleStudentStatus,
  getAuditLogs,
};
