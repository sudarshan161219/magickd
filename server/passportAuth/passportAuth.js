import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import QUser from "../models/QUser.mjs";
import jwt from "jsonwebtoken";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userAlreadyExist = await QUser.findOne({
          email: profile._json.email,
        });

        if (userAlreadyExist) {
          const token = jwt.sign(
            { id: userAlreadyExist._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.JWT_LONG_LIFETIME } // Adjust the expiration as needed
          );
          return done(null, userAlreadyExist);
        }

        const user = await QUser.create({
          name: profile._json.name,
          userImg: profile._json.picture,
          email: profile._json.email,
          method: "OAuth",
        });

        const token = jwt.sign(
          { id: user._id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.JWT_LONG_LIFETIME } // Adjust the expiration as needed
        );

        return done(null, { user, token });
      } catch (err) {
        return done(err);
      }
    }
  )
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await QUser.findById(jwtPayload.id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async function (id, done) {
  const user = await QUser.findById(id);
  done(null, user);
});
