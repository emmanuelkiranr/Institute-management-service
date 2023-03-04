import { User, Account } from "../../../model/models.js";
import bcrypt from "bcrypt";
import logger from "../../../config/logger.js";
import { STATUS_CODES } from "../../../config/constants.js";

const register = async (req, res, next) => {
  try {
    const {
      firstName,
      middleName,
      lastname,
      gender,
      dob,
      phone,
      address,
      board_12,
      Institute_12,
      mark_12,
      board_10,
      Institute_10,
      mark_10,
      entrance,
      department,
      fatherName,
      motherName,
      occupation,
      pemail,
      pphone,
    } = req.body;

    let fullName;
    if (!middleName) {
      fullName = firstName + " " + lastname;
    } else {
      fullName = firstName + " " + middleName + " " + lastname;
    }

    let email =
      firstName.toLowerCase() +
      "." +
      lastname[0].toLowerCase() +
      "@student.myedu.edu.in";

    let user = await User.findOne({
      where: {
        fullName,
        email,
      },
    });
    if (user) {
      logger.error("Student already exists");
      req.resModel = {
        status: STATUS_CODES.BAD_REQUEST,
        error: ["Student already exists"],
      };
      return next();
    }

    let semester = 1;

    let newUser = await User.create({
      firstName,
      middleName,
      lastname,
      fullName,
      gender,
      dob,
      email,
      phone,
      address,
      board_12,
      Institute_12,
      mark_12,
      board_10,
      Institute_10,
      mark_10,
      entrance,
      department,
      semester,
      fatherName,
      motherName,
      occupation,
      pemail,
      pphone,
    });

    let password = firstName.toLowerCase() + "@2023";
    let passwordHash = await bcrypt.hash(password, 10);

    await Account.create({
      email: email,
      password: passwordHash,
      role: "S",
      UserId: newUser.dataValues.id,
    });

    let name = fatherName.split(" ");
    let ppassword = name[0].toLowerCase() + "@2023";
    let ppasswordHash = await bcrypt.hash(ppassword, 10);

    await Account.create({
      email: pemail,
      password: ppasswordHash,
      role: "P",
      UserId: newUser.dataValues.id,
    });

    req.resModel = {
      status: STATUS_CODES.SUCCESS,
      data: "Successfully registered student",
    };
    next();
    logger.info("Successfully registered student");
  } catch (err) {
    req.resModel = {
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
      error: ["Unable to register"],
    };
    next();
    logger.error(err);
  }
};

export default register;
