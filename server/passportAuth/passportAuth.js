import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import QUser from "../models/QUser.mjs";
// import jwt from "jsonwebtoken";
// import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://magickd.onrender.com/api/user/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userAlreadyExist = await QUser.findOne({
          email: profile._json.email,
        });

        if (userAlreadyExist) {
          return done(null, userAlreadyExist);
        }

        const user = await QUser.create({
          name: profile._json.name,
          userImg: profile._json.picture,
          email: profile._json.email,
          method: "OAuth",
        });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});



passport.deserializeUser(async function (id, done) {
  const user = await QUser.findById(id);
  done(null, user);
});
