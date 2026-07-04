// Restricts a route to specific roles. Must run after `protect`
// (authMiddleware) so that req.user is already populated from the JWT.
//
// Usage: router.get("/users", protect, authorize("Admin"), getAllUsers);
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action",
      });
    }

    next();
  };
};

module.exports = authorize;
