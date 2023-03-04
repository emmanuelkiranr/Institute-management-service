import { User, Account } from "../../../model/models.js";
import logger from "../../../config/logger.js";
import { STATUS_CODES } from "../../../config/constants.js";

// all user details
const profile = async (req, res, next) => {
  try {
    const result = await User.findAll({
      attributes: [
        "id",
        "fullName",
        "email",
        "phone",
        "fatherName",
        "motherName",
        "pemail",
        "pphone",
      ],
    });
    req.resModel = {
      status: STATUS_CODES.SUCCESS,
      data: result,
    };
    next();
    logger.info("Successfully fetched all users");
  } catch (err) {
    req.resModel = {
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: ["Internal server error"],
    };
    next();
    logger.error(err);
  }
};

// all users filtered by department and semester
const profileFiltered = async (req, res, next) => {
  try {
    const { department, semester } = req.body;
    const result = await User.findAll({
      attributes: [
        "id",
        "fullName",
        "email",
        "phone",
        "fatherName",
        "motherName",
        "pemail",
        "pphone",
      ],
      where: {
        department,
        semester,
      },
    });
    if (result.length === 0) {
      logger.error("No students in the selected department or semester");
      req.resModel = {
        status: STATUS_CODES.BAD_REQUEST,
        error: ["No students in the selected department or semester"],
      };
      return next();
    }

    req.resModel = {
      status: STATUS_CODES.SUCCESS,
      data: result,
    };
    next();
    logger.info("Successfully fetched results");
  } catch (err) {
    req.resModel = {
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: ["Internal server error"],
    };
    next();
    logger.error(err);
  }
};

// view all parent and student accounts

const parentAccounts = async (req, res, next) => {
  try {
    let result = await Account.findAll({
      where: {
        role: "P",
      },
    });
    req.resModel = {
      status: STATUS_CODES.SUCCESS,
      data: result,
    };
    next();
    logger.info("Successfully fetched parents information");
  } catch (err) {
    req.resModel = {
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: ["Internal server error"],
    };
    next();
    logger.error(err);
  }
};
const studentAccounts = async (req, res, next) => {
  try {
    let result = await Account.findAll({
      where: {
        role: "S",
      },
    });
    req.resModel = {
      status: STATUS_CODES.SUCCESS,
      data: result,
    };
    next();
    logger.info("Successfully fetched students information");
  } catch (err) {
    req.resModel = {
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: ["Internal server error"],
    };
    next();
    logger.error(err);
  }
};

export default { profile, profileFiltered, parentAccounts, studentAccounts };
