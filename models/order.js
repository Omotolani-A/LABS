// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true }, // product name 
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // unit price
      },
    ],

    shippingAddress: {
      type: String,
      required: true,
    },

    deliveryZone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryZone",
      required: true,
    },

    shippingFee: {
      type: Number,
      required: true,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    finalAmount: {
      type: Number,
      required: true, // totalPrice + shippingFee
    },

    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
