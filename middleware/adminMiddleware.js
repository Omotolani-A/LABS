// middleware/adminMiddleware.js
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // user is admin → continue
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};
