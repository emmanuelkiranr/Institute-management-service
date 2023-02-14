import { Account, User } from "../../../model/models.js";
import ResponseModel from "../../../utilities/responseModel.js";
import bcrypt from "bcrypt";
import logger from "../../../config/logger.js";

const deleteUser = async (req, res) => {
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
      return res
        .status(400)
        .json(
          new ResponseModel(null, null, ["Bad request or Invalid credentials"])
        );
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
        res.json(new ResponseModel("Successfully deleted user"));
        logger.info("User deletion is successful");
      } else {
        logger.error("Unauthorized access, only admin can delete");
        return res
          .status(400)
          .json(new ResponseModel(null, null, ["Unauthorized access"]));
      }
    } else {
      logger.error("Admin entry not found");
      return res
        .status(400)
        .json(
          new ResponseModel(null, null, ["Bad request or Invalid credentials"])
        );
    }
  } catch (err) {
    res
      .status(500)
      .json(new ResponseModel(null, null, ["Internal server error"]));
    logger.error(err);
  }
};

export default deleteUser;
