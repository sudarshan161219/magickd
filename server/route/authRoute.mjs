import { Router } from "express";
const router = Router();

//*--> Import all controllers  <--*//
import {
  register,
  login,
  updateUser,
  profile,
  logout,
  refreshToken,
  getCurrentUser,
} from "../controllers/authController.mjs";
import auth from "../middlewares/auth.mjs";
import loginLimiter from "../middlewares/loginLimiter.mjs";

//? POST
router.route("/register").post(register);
router.route("/login").post(loginLimiter, login);
router.route("/logout").post(logout);

//? GET
router.route("/profile").get(auth, profile);
router.route("/refresh").get(refreshToken);

router.route("/updateUser").patch(auth, updateUser);
router.route("/getCurrentUser").get(auth, getCurrentUser);

export default router;
