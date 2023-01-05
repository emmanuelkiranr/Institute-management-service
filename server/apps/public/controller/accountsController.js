import { Account } from "../../../model/models.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Account.findOne({
      where: {
        email,
        password,
      },
    }); // the returned variable "user" will contain that users details from the Account table
    if (user == null) {
      return res.status(400).json({
        data: "User doesn't exist or Invalid credentials",
      }); // bad request
    }
    res.json({ data: "login successfull", details: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to login" }); // internal server error
  }
};

export default login;
