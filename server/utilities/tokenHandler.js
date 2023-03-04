import jwt from "jsonwebtoken";
import { TOKEN_OPTIONS } from "../config/constants.js";

// This will create a token for successfully logged-in/authenticated users
const createToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: TOKEN_OPTIONS.EXPIREY,
    algorithm: TOKEN_OPTIONS.ALGORITHM,
    audience: TOKEN_OPTIONS.AUDIENCE,
    issuer: TOKEN_OPTIONS.ISSUER,
  });
};

// verify token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY, {
    audience: TOKEN_OPTIONS.AUDIENCE,
    issuer: TOKEN_OPTIONS.ISSUER,
  });
  // returns a decoded token which is the object used to create the token, if verification fails it throws an error
};

export default { createToken, verifyToken };
