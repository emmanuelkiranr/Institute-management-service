import register from "./controllers/registerController.js";
import express from "express";

const router = express.Router();

router.post("/admin/register", register);

export default router;
