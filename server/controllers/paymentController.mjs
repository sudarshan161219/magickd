import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();
import Purchase from "../models/Purchase.mjs";
import Product from "../models/Product.mjs";
import User from "../models/User.mjs";
import QUser from "../models/QUser.mjs";
import { instance } from "../utils/paymentInstance.mjs";
import nodemailer from "nodemailer";

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

// const paymentVerification = async (req, res) => {
//   const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
//     req.body;

//   const userId = req.user.userId;
//   const productId = req.params.Id;

//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZOR_EY_SECRET)
//     .update(body.toString())
//     .digest("hex");
//   console.log("sig created", razorpay_signature);
//   console.log("sig generated", expectedSignature);

//   const isAuthentic = expectedSignature === razorpay_signature;

//   if (isAuthentic) {
//     const purchase = await Purchase.create({
//       user: userId,
//       product: productId,
//       razorpay_payment_id: razorpay_payment_id,
//       razorpay_order_id: razorpay_order_id,
//       razorpay_signature: razorpay_signature,
//       status: "completed",
//     });

//     const updatedProduct = await Product.findByIdAndUpdate(
//       productId,
//       {
//         $push: { purchaseByUser: userId },
//       },
//       { new: true }
//     );

//     purchase.save();

//     if (updatedProduct) {

//       console.log("Product updated successfully:", updatedProduct);
//     } else {
//       console.error("Product not found or update failed.");
//     }

//     res.redirect(
//       `http://localhost:5173/payment_success?reference=${razorpay_payment_id}`
//     );
//   } else {
//     res
//       .status(400)
//       .json({ message: "Something went wrong, please try again later!" });
//   }
// };

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "godhustler90956@gmail.com", // Replace with your email
    pass: "jndj zwek psui ltvp", // Replace with your email password
  }

});

const sendPaymentConfirmationEmail = (recipientEmail) => {
  const mailOptions = {
    from: "godhustler90956@gmail.com",
    to: recipientEmail,
    subject: "Payment Confirmation",
    text: "Thank you for your payment. Your payment was successfull.",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending failed:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
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

  // console.log("Signature created", razorpay_signature);
  // console.log("Signature generated", expectedSignature);

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
      productId,
      {
        $push: { purchaseByUser: userId },
      },
      { new: true }
    );

    purchase.save();

    if (updatedProduct) {
      console.log("Product updated successfully:");

      let user;

      // Check if the user is a LocalUser
      const localUser = await User.findById(userId);
      if (localUser) {
        user = localUser;
      }

      // If not a LocalUser, check if the user is a GoogleUser
      if (!user) {
        const googleUser = await QUser.findById(userId);
        if (googleUser) {
          user = googleUser;
        }
      }

      // Send the payment confirmation email to the user
      if (user) {
        sendPaymentConfirmationEmail(user.email);
      } else {
        console.error("User not found. Email not sent.");
      }

      res.redirect(
        `https://magickd.onrender.com/payment_success?reference=${razorpay_payment_id}`
      );
    } else {
      console.error("Product not found or update failed.");
    }
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

// const transporter = nodemailer.createTransport({
//   host: "smtp.forwardemail.net",
//   port: 465,
//   secure: true,
//   auth: {
//     // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//     user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
//     pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
//   },
// });

export { checkout, paymentVerification, getKey };
