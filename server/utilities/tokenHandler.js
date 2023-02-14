import jwt from "jsonwebtoken";

// This will create a token for successfully logged-in/authenticated users
const createToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
    algorithm: "HS256",
    audience: "http://localhost",
    issuer: "http://localhost",
  });
};

// verify token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY, {
    audience: "http://localhost",
    issuer: "http://localhost",
  });
  // returns a decoded token which is the object used to create the token, if verification fails it throws an error
};

export default { createToken, verifyToken };
