import ResponseModel from "../utilities/responseModel.js";
import tokenHandler from "../utilities/tokenHandler.js";

const authMiddleware = async (req, res, next) => {
  try {
    // we only need to authenticate/authorize logged in users and not public users
    if (!req.url.startsWith("/api/v1/admin")) {
      return next();
    }

    let token = req.headers["authorization"];
    token = token ? token.split(" ")[1] : null;

    if (!token) {
      return res
        .status(401) // not authorised
        .json(new ResponseModel(null, null, ["Unauthorized access"]));
    }
    let result = tokenHandler.verifyToken(token);
    req["user"] = result;
    next();
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(new ResponseModel(null, null, ["Internal server error"]));
  }
};

export default authMiddleware;
