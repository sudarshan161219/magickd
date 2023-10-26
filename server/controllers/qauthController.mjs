import QUser from "../models/QUser.mjs";
import { BadRequestError, UnauthenticatedError } from "../errors/export.mjs";
import passport from "passport";


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

const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect(CLIENT_URL);
      });
};

export { loginSuccess, logout };
