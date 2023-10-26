import { Router } from "express";
const router = Router();

//*--> Import all controllers  <--*//
import {
  register,
  login,
  logout,
  refreshToken,
  profile,
  updateUser,
  getUser
} from "../controllers/authController.mjs";
import loginLimiter from "../middlewares/loginLimiter.mjs";
import auth from "../middlewares/auth.mjs"

//? POST
router.route("/register").post(register);
router.route("/login").post(loginLimiter, login);
router.route("/logout").post(logout);

//? GET
router.route("/refresh").get(refreshToken);
router.route("/profile").get(profile);
router.route("/updateUser").patch(updateUser);
router.route("/getUser").get(auth, getUser);

export default router;
