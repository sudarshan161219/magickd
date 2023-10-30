import mongoose from "mongoose";
const { Schema, model } = mongoose;

const purchaseSchema = new Schema(
  {
    user: [String],
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    status: { type: String },
    razorpay_payment_id: { type: String },
    razorpay_order_id: { type: String },
    razorpay_signature: { type: String },
  },
  { timestamps: true }
);

const PurchaseModel = model("Purchase", purchaseSchema);

export default PurchaseModel;
