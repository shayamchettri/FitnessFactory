export const checkAdminRole = (req, res, next) => {
    if (req.role_id === 1) {
      next(); 
    } else {
      return res.status(403).json({ message: "Access forbidden for non-admin users" });
    }
  };
