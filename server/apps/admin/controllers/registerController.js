import { User, Account } from "../../../model/models.js";
import ResponseModel from "../../../utilities/responseModel.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
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

    let fullName = firstName + " " + middleName + " " + lastname;
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
      return res
        .status(400)
        .json(new ResponseModel(null, null, ["Student already exists"]));
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

    res.json(new ResponseModel("Successfully registered student"));
  } catch (err) {
    console.log(err);
    res.status(500).json(new ResponseModel(null, null, ["Unable to register"]));
  }
};

export default register;
