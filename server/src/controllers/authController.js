const crypto = require('crypto');
const User = require('../models/User');
const DeviceSession = require('../models/DeviceSession');
const AuditLog = require('../models/AuditLog');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const { sendSuccess, sendError } = require('../utils/responseHelper');
const env = require('../config/env');

const setCookieToken = (res, token) => {
  res.cookie('ranvi_access_token', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

const register = async (req, res, next) => {
  try {
    const { name, email, phone, password, targetExam } = req.body;

    if (!name || !email || !phone || !password) {
      return sendError(res, 'Please provide name, email, phone number, and password', 400);
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return sendError(res, 'An account with this email already exists', 400);
    }

    const passwordHash = await User.hashPassword(password);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      passwordHash,
      role: 'STUDENT',
      targetExam: targetExam || '',
      demoUsage: { recordedClasses: [], mockTests: [] },
    });

    // Create unique Device Session
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const deviceId = req.headers['x-device-id'] || crypto.randomBytes(16).toString('hex');
    const userAgent = req.headers['user-agent'] || 'Unknown Browser';
    const ipAddress = req.ip || req.connection.remoteAddress || '';

    await DeviceSession.create({
      studentId: user._id,
      deviceId,
      sessionToken,
      deviceInfo: req.headers['x-device-info'] || 'Web Browser',
      userAgent,
      ipAddress,
      isActive: true,
    });

    const token = generateAccessToken(user, sessionToken);
    setCookieToken(res, token);

    await AuditLog.create({
      userId: user._id,
      userEmail: user.email,
      userRole: user.role,
      action: 'USER_REGISTER',
      resource: 'User',
      resourceId: user._id.toString(),
      details: { email: user.email, name: user.name },
      ipAddress,
      userAgent,
    });

    return sendSuccess(res, 'Registration successful', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        targetExam: user.targetExam,
      },
      token,
      sessionToken,
    }, 201);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password, deviceInfo } = req.body;

    if (!email || !password) {
      return sendError(res, 'Please provide email and password', 400);
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');
    if (!user) {
      return sendError(res, 'Invalid email or password', 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return sendError(res, 'Invalid email or password', 401);
    }

    if (!user.isActive) {
      return sendError(res, 'Your account has been deactivated. Please contact administration.', 403);
    }

    const userAgent = req.headers['user-agent'] || 'Unknown Browser';
    const ipAddress = req.ip || req.connection.remoteAddress || '';
    const deviceId = req.headers['x-device-id'] || crypto.randomBytes(16).toString('hex');
    const sessionToken = crypto.randomBytes(32).toString('hex');

    // Single-device enforcement for students:
    // Revoke any previous active session for this student and log audit trail
    if (user.role === 'STUDENT') {
      const activeSessions = await DeviceSession.find({ studentId: user._id, isActive: true });
      if (activeSessions.length > 0) {
        await DeviceSession.updateMany(
          { studentId: user._id, isActive: true },
          {
            isActive: false,
            revokedAt: new Date(),
            revokedReason: `Logged in from new device (${deviceInfo || 'Browser'})`,
            revokedBy: 'NEW_DEVICE_LOGIN',
          }
        );
      }

      await DeviceSession.create({
        studentId: user._id,
        deviceId,
        sessionToken,
        deviceInfo: deviceInfo || 'Web Browser',
        userAgent,
        ipAddress,
        isActive: true,
      });
    }

    const token = generateAccessToken(user, sessionToken);
    setCookieToken(res, token);

    await AuditLog.create({
      userId: user._id,
      userEmail: user.email,
      userRole: user.role,
      action: 'USER_LOGIN',
      resource: 'User',
      resourceId: user._id.toString(),
      details: { email: user.email, role: user.role },
      ipAddress,
      userAgent,
    });

    return sendSuccess(res, 'Login successful', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        targetExam: user.targetExam,
      },
      token,
      sessionToken,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    if (req.user && req.sessionToken) {
      await DeviceSession.updateOne(
        { studentId: req.user._id, sessionToken: req.sessionToken },
        {
          isActive: false,
          revokedAt: new Date(),
          revokedReason: 'User initiated logout',
          revokedBy: 'USER_LOGOUT',
        }
      );
    }

    res.clearCookie('ranvi_access_token');
    return sendSuccess(res, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    return sendSuccess(res, 'Current user retrieved', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        targetExam: user.targetExam,
        demoUsage: user.demoUsage,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, targetExam } = req.body;
    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (targetExam !== undefined) user.targetExam = targetExam;
    await user.save();

    return sendSuccess(res, 'Profile updated successfully', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        targetExam: user.targetExam,
      },
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return sendError(res, 'Please provide current and new passwords', 400);
    }
    if (newPassword.length < 6) {
      return sendError(res, 'New password must be at least 6 characters', 400);
    }

    const user = await User.findById(req.user._id).select('+passwordHash');
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return sendError(res, 'Current password is incorrect', 400);
    }

    user.passwordHash = await User.hashPassword(newPassword);
    await user.save();

    return sendSuccess(res, 'Password changed successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
};
