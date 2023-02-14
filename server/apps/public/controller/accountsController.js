import { Account } from "../../../model/models.js";
import ResponseModel from "../../../utilities/responseModel.js";
import bcrypt from "bcrypt";
import tokenHandler from "../../../utilities/tokenHandler.js";
import logger from "../../../config/logger.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Account.findOne({
      where: {
        email,
      },
    });

    if (!user || user == null) {
      logger.error("Invalid User!");
      return res
        .status(400)
        .json(
          new ResponseModel(null, null, [
            "User doesn't exist or Invalid Credentials",
          ])
        );
      // we are creating a new response model object with these values for data, msg & error
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
        // res.json(new ResponseModel(user));
        res.json(new ResponseModel(token));
        logger.info(`successfully authenticated user`);
      } else {
        logger.error("Wrong Password");
        return res
          .status(400)
          .json(
            new ResponseModel(null, null, [
              "User doesn't exist or Invalid Credentials",
            ])
          );
      }
    }
  } catch (err) {
    // res.status(500).json({ error: "Unable to login" }); // internal server error
    res.status(500).json(new ResponseModel(null, null, ["Unable to login"]));
    logger.error(err);
  }
};

export default login;
