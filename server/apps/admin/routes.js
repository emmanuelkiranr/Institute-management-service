import register from "./controllers/registerController.js";
import view from "./controllers/viewController.js";
import express from "express";

const router = express.Router();

router.post("/admin/register", register);
router.get("/admin/getall", view.profile);
router.post("/admin/getfiltered", view.profileFiltered);
router.get("/admin/parentaccounts", view.parentAccounts);
router.get("/admin/studentaccounts", view.studentAccounts);

export default router;
