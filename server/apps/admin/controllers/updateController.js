import { User, Account } from "../../../model/models.js";

const updateContact = async (req, res) => {
  try {
    const { fullName, phone, pphone, address } = req.body;

    let exists = await User.findOne({
      where: {
        fullName,
      },
    });

    if (exists == null) {
      return res.status(400).json({ data: "User doesn't exist" });
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

    res.json({ data: "Contact updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
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

    if (exists == null) {
      return res
        .status(400)
        .json({ data: "Bad request or invalid credentials" });
    }

    let prevPassword = exists.dataValues.password;

    if (password === prevPassword) {
      return res
        .status(400)
        .json({ data: "New password cannot be same as old one" });
    }

    await Account.update(
      { password },
      {
        where: {
          email: [email, pemail],
        },
      }
    );

    res.json({ data: "Successfully updated password" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Internal serever error" });
  }
};

export default { updateContact, updatePassword };
