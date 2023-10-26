import { Router } from "express";
const router = Router();
import passport from "passport";

//*--> Import all controllers  <--*//
import { loginSuccess, logout } from "../controllers/qauthController.mjs";

const CLIENT_URL = "http://localhost:5173/";

//? google - facebook auth

router.route("/login/failed").get((req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.route("/login/success").get(loginSuccess);
router.route("/qauth_logout").post(logout);

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router.route("/google/callback").get(
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req, res) => {
  req.logout(); // Logout the user and clear session data
  res.json({ message: "Logged out successfully" });
});

export default router;
