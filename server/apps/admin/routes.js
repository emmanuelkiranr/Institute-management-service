import register from "./controllers/registerController.js";
import view from "./controllers/viewController.js";
import update from "./controllers/updateController.js";
import deleteUser from "./controllers/deleteController.js";
import express from "express";

const router = express.Router();

// Create/register routes
router.post("/register", register);

// Read/view routes
router.get("/getall", view.profile);
router.post("/getfiltered", view.profileFiltered);
router.get("/parentaccounts", view.parentAccounts);
router.get("/studentaccounts", view.studentAccounts);

// Update routes
router.put("/updatecontact", update.updateContact);
router.put("/updatepassword", update.updatePassword);

// Delete routes
router.delete("/delete", deleteUser);

export default router;
