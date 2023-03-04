import express from "express";
import register from "../apps/admin/controllers/registerController.js";
import view from "../apps/admin/controllers/viewController.js";
import update from "../apps/admin/controllers/updateController.js";
import deleteUser from "../apps/admin/controllers/deleteController.js";
import {
  verifyDetails,
  viewProfile,
  updateContact,
  deleteData,
} from "../utilities/validator/adminValidatior.js";

const router = express.Router();

// Create/register routes
router.post("/register", verifyDetails, register);

// Read/view routes
router.get("/getall", view.profile);
router.post("/getfiltered", viewProfile, view.profileFiltered);
router.get("/parentaccounts", view.parentAccounts);
router.get("/studentaccounts", view.studentAccounts);

// Update routes
router.put("/updatecontact", updateContact, update.updateContact);
router.put("/updatepassword", update.updatePassword);

// Delete routes
router.delete("/delete", deleteData, deleteUser);

export default router;
