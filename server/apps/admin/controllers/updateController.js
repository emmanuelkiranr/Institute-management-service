import { User, Account } from "../../../model/models.js";
import ResponseModel from "../../../utilities/responseModel.js";
import bcrypt from "bcrypt";

const updateContact = async (req, res) => {
  try {
    const { fullName, phone, pphone, address } = req.body;

    let exists = await User.findOne({
      where: {
        fullName,
      },
    });

    if (exists == null) {
      return res
        .status(400)
        .json(new ResponseModel(null, null, ["User doesn't exist"]));
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

    res.json(new ResponseModel("Contact updated successfully"));
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(new ResponseModel(null, null, ["Internal server error"]));
  }
};

const updatePassword = async (req, res) => {
  try {
    const { email, pemail, password } = req.body;

    let exists = await Account.findOne({
      where: {
        email: [email, pemail],
      },
    });
    // In this if email and pemail is not present then you won't get the internal error

    if (exists == null) {
      return res
        .status(400)
        .json(
          new ResponseModel(null, null, ["Bad request or invalid credentials"])
        );
    }

    let prevPassword = exists.dataValues.password;
    let decryptPrevPass = await bcrypt.compare(password, prevPassword);

    if (decryptPrevPass) {
      return res
        .status(400)
        .json(
          new ResponseModel(null, null, [
            "New password cannot be same as old one",
          ])
        );
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

    res.json(new ResponseModel("Successfully updated password"));
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(new ResponseModel(null, null, ["Internal serever error"]));
  }
};

export default { updateContact, updatePassword };
