const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required before role authorization.',
      });
    }

    // SUPER_ADMIN has access to all admin/staff endpoints
    if (req.user.role === 'SUPER_ADMIN') {
      return next();
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Access restricted. Requires one of [${allowedRoles.join(', ')}] permissions.`,
      });
    }

    next();
  };
};

module.exports = { authorize };
