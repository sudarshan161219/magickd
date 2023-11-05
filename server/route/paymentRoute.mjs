import { Router } from "express";
const router = Router();

import {
  checkout,
  paymentVerification,
  getKey,
} from "../controllers/paymentController.mjs";

router.route("/checkout").post(checkout);
router.route("/verification/:Id").post(paymentVerification);
router.route("/get_key").get(getKey);

router.route("/proxy-razorpay").get((req, res) => {
  // Define the URL of the Razorpay SDK
  const razorpayURL = "https://checkout.razorpay.com/v1/checkout.js";

  // Make a request to the Razorpay SDK URL
  request(razorpayURL, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // Send the Razorpay SDK content as a response to your client
      res.header("Content-Type", "application/javascript");
      res.send(body);
    } else {
      // Handle errors as needed
      res.status(500).send("Error fetching Razorpay SDK");
    }
  });
});


router.route('/proxy-razorpay').get((req, res) => {
  // Define the URL of the Razorpay SDK
  const razorpayURL = 'https://checkout.razorpay.com/v1/checkout.js';

  // Make a request to the Razorpay SDK URL
  request(razorpayURL, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // Set the Content-Type header to indicate JavaScript
      res.setHeader('Content-Type', 'application/javascript');
      res.send(body);
    } else {
      // Handle errors as needed
      res.status(500).send('Error fetching Razorpay SDK');
    }
  });
});

export default router;
