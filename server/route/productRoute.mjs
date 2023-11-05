import { Router } from "express";
const router = Router();

//*--> Import all controllers  <--*//
import {
  getItem,
  saveItem,
  unsaveItem,
  getSavedItem,
  getallItem,
  getProduct,
  getpurchasedProduct,
  getsearchedItem,
  getProductCategory,
  getPrice_category,
} from "../controllers/productController.mjs";
import auth from "../middlewares/auth.mjs";

//? POST

//? GET
router.route("/getItem").get(getItem);
router.route("/getallItem").get(getallItem);
router.route("/getProduct/:Id").get(getProduct);
router.route("/getProduct_category/:category").get(getProductCategory);
router.route("/save/:Id").post(auth, saveItem);
router.route("/unsave/:Id").post(auth, unsaveItem);
router.route("/search").get(getsearchedItem);
router.route("/saved-items").get(auth, getSavedItem);
router.route("/purchased-items").get(auth, getpurchasedProduct);
router.route("/category_price").get(getPrice_category);

export default router;
