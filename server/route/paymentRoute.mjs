import { Router } from "express";
const router = Router();

import {
  checkout,
  paymentVerification,
  getKey
} from "../controllers/paymentController.mjs";

router.route("/checkout").post(checkout);
router.route("/verification/:Id").post(paymentVerification);
router.route("/get_key").get(getKey);

export default router;
