import { Account, User } from "../../../model/models.js";
import bcrypt from "bcrypt";

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
      return res
        .status(400)
        .json({ data: "Bad request or Invalid credentials" });
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
        res.json({ data: "Successfully deleted user" });
      } else {
        return res.status(400).json({ data: "Unauthorized access" });
      }
    } else {
      return res
        .status(400)
        .json({ data: "Bad request or Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Internal server error" });
  }
};

export default deleteUser;
