import express from "express";
import login from "../apps/public/controller/accountsController.js";
import verifyAccount from "../utilities/validator/publicValidator.js";

const router = express.Router();

router.post("/login", verifyAccount, login);

export default router;
