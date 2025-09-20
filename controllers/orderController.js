// controllers/orderController.js
import Order from "../models/order.js";
import DeliveryZone from "../models/DeliveryZone.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // 1. Calculate subtotal
    const totalPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    // 2. Find zone fee
    const zone = await DeliveryZone.findById(shippingAddress.zone);
    if (!zone) {
      return res.status(400).json({ message: "Invalid delivery zone" });
    }

    const shippingFee = zone.fee;

    // 3. Final amount
    const finalAmount = totalPrice + shippingFee;

    // 4. Create order
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      shippingFee,
      totalPrice,
      finalAmount,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("orderItems.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("orderItems.product")
      .populate("shippingAddress.zone");

    if (!order) return res.status(404).json({ message: "Order not found" });
// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product")
      .populate("shippingAddress.zone");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status || order.status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
