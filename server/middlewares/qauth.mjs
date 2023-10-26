import { OAuth2Client } from 'google-auth-library';
import { UnauthenticatedError } from "../errors/export.mjs";
import dotenv from "dotenv";
dotenv.config();


const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; 
// const token = 'your-id-token'; 

const client = new OAuth2Client();

const qauth = async (req, res, next) => {
    try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userid = payload.sub;
    req.user = { userId: userid};
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
}

export default qauth;

