import { Account } from "../../../model/models.js";
import bcrypt from "bcrypt";
import tokenHandler from "../../../utilities/tokenHandler.js";
import logger from "../../../config/logger.js";
import httpStatus from "../../../config/constants.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await Account.findOne({
      where: {
        email,
      },
    });

    if (!user || user == null) {
      logger.error("Invalid User!");
      req.resModel = {
        status: httpStatus.BAD_REQUEST,
        error: ["Invalid User!"],
      };
      return next();
    } else {
      let hashPassword = await bcrypt.compare(
        password,
        user.dataValues.password
      );
      if (hashPassword) {
        // create Token - will be associated with a user & used to authorize all further req of that user based on role
        const token = tokenHandler.createToken({
          id: user.dataValues.id,
          role: user.dataValues.role,
        });
        // res.json(new ResponseModel(user)); // we are creating a new response model object with these values for data, msg & error
        // res.json(new ResponseModel(token));
        req.resModel = {
          status: httpStatus.SUCCESS,
          data: token,
        };
        next();
        logger.info(`successfully authenticated user`);
      } else {
        logger.error("Wrong Password");
        req.resModel = {
          status: httpStatus.BAD_REQUEST,
          error: ["User doesn't exist or Invalid Credentials"],
        };
        return next();
      }
    }
  } catch (err) {
    // res.status(500).json({ error: "Unable to login" }); // internal server error
    // res.status(500).json(new ResponseModel(null, null, ["Unable to login"]));
    req.resModel = {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: ["Unable to Login"],
    };
    next();
    logger.error(err);
  }
};

export default login;
