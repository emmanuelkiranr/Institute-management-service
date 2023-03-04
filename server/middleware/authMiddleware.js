import ResponseModel from "../utilities/responseModel.js";
import tokenHandler from "../utilities/tokenHandler.js";
import logger from "../config/logger.js";

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    token = token ? token.split(" ")[1] : null;

    if (!token) {
      logger.info("No Token found in request header");
      return res
        .status(401) // not authorised
        .json(new ResponseModel(null, null, ["Unauthorized access"]));
    }
    let result = tokenHandler.verifyToken(token);
    req["user"] = result;
    next();
  } catch (err) {
    res
      .status(500)
      .json(new ResponseModel(null, null, ["Internal server error"]));
    logger.error(err);
  }
};

export default authMiddleware;
