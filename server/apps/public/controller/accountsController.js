import { Account } from "../../../model/models.js";
import ResponseModel from "../../../utilities/responseModel.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Account.findOne({
      where: {
        email,
        // password, cannot check password here since we need to compare the plain password with hashed one
      },
    }); // the returned variable "user" will contain that users details from the Account table

    if (!user || user == null) {
      // return res.status(400).json({
      //   data: "User doesn't exist or Invalid Credentials!",
      // }); // bad request
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
        // res.json({ data: "login successfull", details: user });
        res.json(new ResponseModel(user));
      } else {
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
    console.log(err);
    // res.status(500).json({ error: "Unable to login" }); // internal server error
    res.status(500).json(new ResponseModel(null, null, ["Unable to login"]));
  }
};

export default login;
