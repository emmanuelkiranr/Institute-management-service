import { User, Account } from "../../../model/models.js";
import ResponseModel from "../../../utilities/responseModel.js";

// all user details
const profile = async (req, res) => {
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
    res.json(new ResponseModel(result));
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(new ResponseModel(null, null, ["Internal server error"]));
  }
};

// all users filtered by department and semester
const profileFiltered = async (req, res) => {
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
    res.json(new ResponseModel(result));
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(new ResponseModel(null, null, ["Internal server error"]));
  }
};

// view all parent and student accounts

const parentAccounts = async (req, res) => {
  try {
    let result = await Account.findAll({
      where: {
        role: "P",
      },
    });
    res.json(new ResponseModel(result));
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(new ResponseModel(null, null, ["Internal server error"]));
  }
};
const studentAccounts = async (req, res) => {
  try {
    let result = await Account.findAll({
      where: {
        role: "S",
      },
    });
    res.json(new ResponseModel(result));
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(new ResponseModel(null, null, ["Internal server error"]));
  }
};

export default { profile, profileFiltered, parentAccounts, studentAccounts };
