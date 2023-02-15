import login from "../public/controller/accountsController.js";
import express from "express";
import verifyAccount from "../../utilities/validator/publicValidator.js";

const router = express.Router();

router.post("/login", verifyAccount, login);

export default router;
