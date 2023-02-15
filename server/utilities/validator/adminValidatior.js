import joi from "joi";
import validateRequest from "./validator.js";

// registerController
const verifyDetails = (req, res, next) => {
  const schema = joi.object({
    firstName: joi.string().required(),
    middleName: joi.string().empty(""),
    lastname: joi.string().required(),
    gender: joi.string().required(),
    dob: joi.date().required(),
    phone: joi.string().min(10).max(10).required(),
    address: joi.string().required(),
    board_12: joi.string().required(),
    Institute_12: joi.string().required(),
    mark_12: joi.string().required(),
    board_10: joi.string().required(),
    Institute_10: joi.string().required(),
    mark_10: joi.string().required(),
    entrance: joi.string().required(),
    department: joi.string().required(),
    fatherName: joi.string().required(),
    motherName: joi.string().required(),
    occupation: joi.string().required(),
    pemail: joi.string().email().required(),
    pphone: joi.string().min(10).max(10).required(),
  });
  validateRequest(req, res, next, schema);
};

// viewController
const viewProfile = (req, res, next) => {
  const schema = joi.object({
    department: joi.string().required(),
    semester: joi.string().required(),
  });
  validateRequest(req, res, next, schema);
};

// updateController
const updateContact = (req, res, next) => {
  const schema = joi.object({
    fullName: joi.string().required(),
    phone: joi.string().min(10).max(10),
    pphone: joi.string().min(10).max(10),
    address: joi.string().required(),
  });
  validateRequest(req, res, next, schema);
};

// updatePassword - fix: Only one email field needed in req.body

// deleteController
const deleteData = (req, res, next) => {
  const schema = joi.object({
    fullName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(20).required(),
  });
  validateRequest(req, res, next, schema);
};

export { verifyDetails, viewProfile, updateContact, deleteData };
