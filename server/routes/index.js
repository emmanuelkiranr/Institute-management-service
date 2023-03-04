import express from "express";
import accountsRoute from "./accountsRoute.js";
import adminRoute from "./adminRoutes.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use("/home", accountsRoute);
router.use("/admin", authMiddleware, adminRoute);

export default router;
