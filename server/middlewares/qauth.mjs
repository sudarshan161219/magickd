import { UnauthenticatedError } from "../errors/export.mjs";

const qauth = async (req, res, next) => {
  const session = req.cookies.session;
  
  if (!session || !session.userId) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  req.user = { userId: session.userId };
  next();
}

export default qauth;

