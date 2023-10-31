import { StatusCodes } from "http-status-codes";
import User from "../models/User.mjs";
import QUser from "../models/QUser.mjs";
import { BadRequestError, UnauthenticatedError } from "../errors/export.mjs";
import jwt from "jsonwebtoken";
import attachCookie from "../utils/attachCookie.mjs";

//* post register
const register = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const userAlreadyExist = await User.findOne({
    email,
  });

  if (userAlreadyExist) {
    throw new BadRequestError("Email already in use");
  }

  const user = await User.create({
    email,
    name,
    password,
    method: "LocalAuth",
  });
  const Access_Token = user.createAccess_TokenJWT();
  attachCookie({ res, Access_Token });

  return res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

//* post login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  user.password = undefined;

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const Access_Token = user.createAccess_TokenJWT();

  attachCookie({ res, Access_Token });

  return res.status(StatusCodes.OK).json({ user });
};

const refreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refresh_Token = cookies.jwt;

  jwt.verify(
    refresh_Token,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err) return res.sendStatus(403);
      const { userId } = user;
      const userr = await User.findOne({ _id: userId });
      const Access_Token = userr.createAccess_TokenJWT();
      const expiresIn = 3600;
      return res
        .status(StatusCodes.OK)
        .json({ userr, Access_Token, expiresIn });
    }
  );
};

//* PATCH req
const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    { _id: req.user.userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  await user.save();
  const Access_Token = user.createAccess_TokenJWT();
  attachCookie({ res, Access_Token });
  return res.status(StatusCodes.OK).json({
    user,
  });
};

//* get profile
const profile = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  return res.status(StatusCodes.OK).json({
    user,
  });
};

// * post logout
const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

const getUser = async (req, res) => {
  // const user = await User.findOne({ _id: req.user.userId });
  // res.status(StatusCodes.OK).json({ user });
  try {
    const [user, qUser] = await Promise.all([
      User.findOne({ _id: req.user.userId }),
      QUser.findOne({ _id: req.user.userId })
    ]);

    res.status(StatusCodes.OK).json({ user, qUser });
  } catch (error) {
    // Handle any potential errors here
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
  }

};

const getQUser = async (req, res) => {
  const user = await QUser.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user });
};

const loginSuccess = async (req, res) => {
  if (req.user) {
    const Access_Token = req.user.createAccess_TokenJWT();
    attachCookie({ res, Access_Token });
    return res.status(StatusCodes.OK).json({
      user: req.user,
    });
  } else {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

const loginSuccessfb = async (req, res) => {
  if (req.user) {
    const Access_Token = req.user.createAccess_TokenJWT();
    attachCookie({ res, Access_Token });
    return res.status(StatusCodes.OK).json({
      user: req.user,
    });
  } else {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

const logoutt = (req, res) => {
  const sessionName = "session";
  // const cookies = req.cookies;

  if (req.session ) {
    const sessionKeys = req.sessionKeys || [];

    for (const key of sessionKeys) {
      res.clearCookie(`${sessionName}.${key}`);
    }
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    req.session = null;
  }
  res.send("Cookies and session cleared.");
};



export {
  register,
  login,
  updateUser,
  profile,
  logout,
  refreshToken,
  getUser,
  loginSuccess,
  loginSuccessfb,
  logoutt,
  getQUser
};
