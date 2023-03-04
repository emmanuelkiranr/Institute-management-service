import { Account, User } from "../../../model/models.js";
import bcrypt from "bcrypt";
import logger from "../../../config/logger.js";
import { STATUS_CODES } from "../../../config/constants.js";

const deleteUser = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    let exists = await User.findOne({
      where: {
        fullName,
      },
      // This is not necessary since email is already present in the User table (Done this to get familiar with include statement)
      include: [
        {
          model: Account,
          where: {
            email,
          },
        },
      ],
    });

    if (exists == null) {
      logger.error("Invalid credentials");
      req.resModel = {
        status: STATUS_CODES.BAD_REQUEST,
        error: ["Bad request or Invalid credentials"],
      };
      return next();
    }

    // Enter admin password to confirm deletion
    let confirm = await Account.findOne({
      where: {
        email: "admin@admin.myedu.edu.in",
        // password,
      },
    });

    if (confirm) {
      let hashPassword = await bcrypt.compare(
        password,
        confirm.dataValues.password
      );
      if (hashPassword) {
        await User.destroy({
          where: {
            fullName,
          },
        });
        req.resModel = {
          status: STATUS_CODES.SUCCESS,
          data: "Successfully deleted user",
        };
        next();
        logger.info("User deletion is successful");
      } else {
        logger.error("Unauthorized access, only admin can delete");
        req.resModel = {
          status: STATUS_CODES.BAD_REQUEST,
          error: ["Unauthorized access"],
        };
        return next();
      }
    } else {
      logger.error("Admin entry not found");
      req.resModel = {
        status: STATUS_CODES.BAD_REQUEST,
        error: ["Bad request or Invalid credentials"],
      };
      return next();
    }
  } catch (err) {
    req.resModel = {
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: ["Internal server error"],
    };
    next();
    logger.error(err);
  }
};

export default deleteUser;
