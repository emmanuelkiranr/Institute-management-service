import register from "./controllers/registerController.js";
import view from "./controllers/viewController.js";
import update from "./controllers/updateController.js";
import deleteUser from "./controllers/deleteController.js";
import express from "express";

const router = express.Router();

// Create/register routes
router.post("/admin/register", register);

// Read/view routes
router.get("/admin/getall", view.profile);
router.post("/admin/getfiltered", view.profileFiltered);
router.get("/admin/parentaccounts", view.parentAccounts);
router.get("/admin/studentaccounts", view.studentAccounts);

// Update routes
router.put("/admin/updatecontact", update.updateContact);
router.put("/admin/updatepassword", update.updatePassword);

// Delete routes
router.delete("/admin/delete", deleteUser);

export default router;
