import { User, Account } from "../../../model/models.js";
import bcrypt from "bcrypt";
import logger from "../../../config/logger.js";
import httpStatus from "../../../config/constants.js";

const updateContact = async (req, res, next) => {
  try {
    const { fullName, phone, pphone, address } = req.body;

    let exists = await User.findOne({
      where: {
        fullName,
      },
    });

    if (exists == null) {
      logger.error("User doesn't exist");
      req.resModel = {
        status: httpStatus.BAD_REQUEST,
        error: ["User doesn't exist"],
      };
      return next();
    }

    await User.update(
      {
        phone,
        pphone,
        address,
      },
      {
        where: {
          fullName,
        },
      }
    );
    req.resModel = {
      status: httpStatus.SUCCESS,
      data: "Contact updated successfully",
    };
    next();
    logger.info("Contact updated successfully");
  } catch (err) {
    req.resModel = {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: ["Internal server error"],
    };
    next();
    logger.error(err);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { email, pemail, password } = req.body;

    let exists = await Account.findOne({
      where: {
        email: [email, pemail],
      },
    });
    // In this if email and pemail is not present then you won't get the internal error

    if (exists == null) {
      logger.error("Invalid email");
      req.resModel = {
        status: httpStatus.BAD_REQUEST,
        error: ["Bad request or invalid credentials"],
      };
      return next();
    }

    let prevPassword = exists.dataValues.password;
    let decryptPrevPass = await bcrypt.compare(password, prevPassword);

    if (decryptPrevPass) {
      logger.error("New password is same as old password");
      req.resModel = {
        status: httpStatus.BAD_REQUEST,
        error: ["New password cannot be same as old one"],
      };
      return next();
    }

    let hashPassword = await bcrypt.hash(password, 10);

    await Account.update(
      { password: hashPassword },
      {
        where: {
          email: exists.dataValues.email, // it should be the email of the right actor
        },
      }
    );

    req.resModel = {
      status: httpStatus.SUCCESS,
      data: "Successfully updated password",
    };
    next();
    logger.info("Successfully updated password");
  } catch (err) {
    req.resModel = {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: ["Internal server error"],
    };
    next();
    logger.error(err);
  }
};

export default { updateContact, updatePassword };
