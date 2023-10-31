import { Router } from "express";
import passport from "passport";
const router = Router();
import jwt from "jsonwebtoken";
import attachCookie from "../utils/attachCookie.mjs";

//*--> Import all controllers  <--*//
import {
  register,
  login,
  logout,
  refreshToken,
  profile,
  updateUser,
  getUser,
  loginSuccess,
  logoutt,
  loginSuccessfb,
  getQUser,
} from "../controllers/authController.mjs";
import loginLimiter from "../middlewares/loginLimiter.mjs";
import auth from "../middlewares/auth.mjs";

// //? POST
router.route("/register").post(register);
router.route("/login").post(loginLimiter, login);
router.route("/logout").post(logout);

// //? GET
router.route("/refresh").get(refreshToken);
router.route("/profile").get(profile);
router.route("/updateUser").patch(updateUser);
router.route("/getUser").get(auth, getUser);
router.route("/getQuser").get(auth, getQUser);

router.route("/login/failed").get((req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.route("/login/success").get(loginSuccess);
router.route("/qauth_logout").get(logoutt);

// function generateUserToken(req, res) {
//     const Access_Token = req.user.createAccess_TokenJWT();
//     attachCookie({ res, Access_Token });
// }

router
  .route("/auth/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

// router.route("/auth/google/callback").get(
//   passport.authenticate("google", {
//     session: false,
//     successRedirect: "http://localhost:5173",
//     failureRedirect: "/login/failed",
//   })
// );

// Google OAuth callback route
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const Access_Token = req.user.createAccess_TokenJWT();
    attachCookie({ res, Access_Token });
    res.redirect("http://localhost:5173"); 
  }
);

router.route("/login/fb/success").get(loginSuccessfb);

router.route("/login/fb/failed").get((req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router
  .route("/auth/facebook")
  .get(passport.authenticate("facebook", { scope: ["email"] }));

router.route("/auth/oauth2/redirect/facebook").get(
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:5173",
    failureRedirect: "/login/failed",
  })
);

// router.get('/auth/oauth2/redirect/facebook', passport.authenticate('facebook', {
//           failureRedirect: '/login' }), (req, res) => {
//                    res.redirect('/user/home');
// });

export default router;
