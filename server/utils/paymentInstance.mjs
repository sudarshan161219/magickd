import dotenv from "dotenv";
dotenv.config();
import Razorpay from "razorpay";

const instance = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_EY_SECRET,
});

export { instance };
