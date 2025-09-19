// routes/authRoutes.js
import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Private route (requires JWT)
router.get("/profile", protect, getUserProfile);

router.get("/test", (req, res) => {
  res.send("Auth route works!");
});


export default router;
