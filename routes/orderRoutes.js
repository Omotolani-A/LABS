// routes/orderRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import { 
  createOrder, 
  getMyOrders, 
  getOrderById, 
  getAllOrders, 
  updateOrderStatus 
} from "../controllers/orderController.js";

const router = express.Router();

// Customer routes
router.post("/", protect, createOrder);   // ✅ fixed from placeOrder
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

// Admin routes
router.get("/", protect, admin, getAllOrders);      
router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;
