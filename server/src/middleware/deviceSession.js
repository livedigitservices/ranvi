const DeviceSession = require('../models/DeviceSession');

const enforceSingleDevice = async (req, res, next) => {
  try {
    // Only enforce single-device lock on STUDENT accounts
    if (!req.user || req.user.role !== 'STUDENT') {
      return next();
    }

    const sessionToken = req.sessionToken;
    if (!sessionToken) {
      return res.status(401).json({
        success: false,
        code: 'NO_ACTIVE_SESSION',
        message: 'No registered device session token found. Please log in again.',
      });
    }

    // Look up the active session for this user
    const activeSession = await DeviceSession.findOne({
      studentId: req.user._id,
      sessionToken,
      isActive: true,
    });

    if (!activeSession) {
      // Check if session was revoked due to another device login
      const revokedSession = await DeviceSession.findOne({
        studentId: req.user._id,
        sessionToken,
      });

      const message = revokedSession && revokedSession.revokedReason
        ? `Your account was signed in on another device (${revokedSession.revokedReason}). Only one active device is allowed.`
        : 'Your device session has been revoked or expired. Please log in again to register this device.';

      return res.status(401).json({
        success: false,
        code: 'DEVICE_SESSION_REVOKED',
        message,
      });
    }

    // Update lastActiveAt periodically
    activeSession.lastActiveAt = new Date();
    await activeSession.save();

    req.deviceSession = activeSession;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to verify device session security.',
      error: error.message,
    });
  }
};

module.exports = { enforceSingleDevice };
