import { Account } from "../../../model/models.js";
import ResponseModel from "../../../utilities/responseModel.js";
import bcrypt from "bcrypt";
import tokenHandler from "../../../utilities/tokenHandler.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Account.findOne({
      where: {
        email,
      },
    });

    if (!user || user == null) {
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
        // create Token - will be associated with a user and will be used to authorize all further req of that user
        const token = tokenHandler.createToken({
          id: user.dataValues.id,
          role: user.dataValues.role,
        });
        // res.json(new ResponseModel(user));
        res.json(new ResponseModel(token));
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
