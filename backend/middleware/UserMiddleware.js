export const checkUserRole = (req, res, next) => {
    if (req.role_id === 2) {
      next();
    } else {
      return res.status(403).json({ message: "Access forbidden for non-user roles" });
    }
  };