import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();
import Purchase from "../models/Purchase.mjs";
import Product from "../models/Product.mjs";
import { instance } from "../utils/paymentInstance.mjs";

const checkout = async (req, res) => {
  try {
    const { price } = req.body;
    const options = {
      amount: Number(price * 100),
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    res.status(200).json({ order: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const userId = req.user.userId;
  const productId = req.params.Id;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZOR_EY_SECRET)
    .update(body.toString())
    .digest("hex");
  console.log("sig created", razorpay_signature);
  console.log("sig generated", expectedSignature);

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    const purchase = await Purchase.create({
      user: userId,
      product: productId,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_order_id: razorpay_order_id,
      razorpay_signature: razorpay_signature,
      status: "completed",
    });

    const updatedProduct = await Product.findByIdAndUpdate(
      productId, // The first argument is the ID of the document you want to update
      {
        purchase: true,
      },
      { new: true } // This option returns the updated document
    );

    purchase.save();

    if (updatedProduct) {
      console.log("Product updated successfully:", updatedProduct);
    } else {
      console.error("Product not found or update failed.");
    }

    res.redirect(
      `http://localhost:5173/payment_success?reference=${razorpay_payment_id}`
    );
  } else {
    res
      .status(400)
      .json({ message: "Something went wrong, please try again later!" });
  }
};

const getKey = async (req, res) => {
  try {
    res.status(200).json({ key: process.env.RAZOR_KEY_ID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { checkout, paymentVerification, getKey };
