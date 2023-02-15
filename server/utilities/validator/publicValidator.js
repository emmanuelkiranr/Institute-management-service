import joi from "joi";
import validateRequest from "./validator.js";

const verifyAccount = (req, res, next) => {
  // create schema object
  const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(20).required(),
  });
  validateRequest(req, res, next, loginSchema);

  // schema options
  /* const options = {
    abortEarly: false, // include all errors
    // allowUnknown: true, // ignore unknown props
    // stripUnknown: true, // remove unknown props
  };

  // validate request body against schema
  const { error, value } = loginSchema.validate(req.body, options);
  if (error) {
    logger.error(error.details);
    return res
      .status(400)
      .json(new ResponseModel(null, null, ["Invalid Credentials"]));
  }
  logger.info(value);
  // The controller receives the validated request body.
  req.body = value;
  next(); */
};

export default verifyAccount;
