import ResponseModel from "./responseModel.js";

const response = async (req, res) => {
  const { status, data, message, error } = req.resModel;
  res.status(status).json(new ResponseModel(data, message, error));
};

export default response;
