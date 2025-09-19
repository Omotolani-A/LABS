// models/DeliveryZone.js
import mongoose from "mongoose";

const deliveryZoneSchema = new mongoose.Schema(
  {
    zoneName: {
      type: String,
      required: true,
      unique: true, // no duplicate zones
      trim: true,
    },
    fee: {
      type: Number,
      required: true,
      min: 0, // must be non-negative
    },
  },
  { timestamps: true }
);

export default mongoose.model("DeliveryZone", deliveryZoneSchema);
