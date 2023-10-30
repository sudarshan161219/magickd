import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import { Strategy as FacebookStrategy } from "passport-facebook";
import QUser from "../models/QUser.mjs";

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:
        "http://localhost:5000/api/user/auth/oauth2/redirect/facebook",
      // profileFields: [
      //   "id",
      //   "displayName",
      //   'email',
      //   "name",
      //   "gender",
      //   "picture.type(large)",
      // ],
      profileFields: ['id', 'name','picture.type(large)', 'emails', 'displayName', 'about', 'gender'], 
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userAlreadyExist = await QUser.findOne({
          name: profile._json.name,
        });

        if (userAlreadyExist) {
          return done(null, userAlreadyExist);
        }

        const user = await QUser.create({
          name: profile._json.name,
          // userImg: profile._json.picture.data.url,
          userImg: null,
          email: profile._json.email ? profile._json.email : null,
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
