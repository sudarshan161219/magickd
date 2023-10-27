import QUser from "../models/QUser.mjs";
import { BadRequestError, UnauthenticatedError } from "../errors/export.mjs";
import passport from "passport";
import attachCookie from "../utils/attachCookie.mjs";
import { StatusCodes } from "http-status-codes";

const CLIENT_URL = "http://localhost:5173/";

const loginSuccess = async (req, res) => {
  if (req.user) {
    return res.status(StatusCodes.OK).json({
      user: req.user,
    });
  } else {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

const logout = (req, res) => {
  //   req.session.destroy(function() {
  //     res.clearCookie("connect.sid", { httpOnly: true, sameSite: "None", secure: true });
  //     res.json({ message: "Cookie cleared" });
  // });
  const sessionName = "session"; // Change this if your session name is different

  if (req.session) {
    const sessionKeys = req.sessionKeys || [];

    // Iterate over the keys and clear each cookie
    for (const key of sessionKeys) {
      res.clearCookie(`${sessionName}.${key}`);
    }

    // Destroy the session
    req.session = null;
  }

  res.send("Cookies and session cleared.");
};

export { loginSuccess, logout };

// const logout = async (req, res, next) => {
//   try {
//     await destroySession(req);
//     clearConnectSidCookie(res);
//     redirectToHomePage(res);
//   } catch (error) {
//     next(error);
//   }
// };

// const destroySession = (req) => {
//   return new Promise((resolve, reject) => {
//     req.session.destroy((err) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve();
//       }
//     });
//   });
// };

// const clearConnectSidCookie = (res) => {
//   res.clearCookie('connect.sid');
// };

// const redirectToHomePage = (res) => {
//   res.redirect('http://localhost:5173');
// };
