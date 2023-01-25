// Class that defines the structure of all output send from the app, output sent as json format should be an object of this class

class ResponseModel {
  totalPages = 1;
  perPage = 1;
  pageNumber = 1;
  success = true;
  errors = [];
  constructor(data = null, message = null, errors = []) {
    this.data = data;
    this.message = message;
    this.errors = errors;

    if (errors.length > 0) {
      this.success = false;
    }
  }
}

// Instead of just sending the JSON data output, we are sending another "object" as output this object(which is in json format) is of the class
// ResponseModel, with properties data, message, error and moore. The values of these properties is initialized via the constructor

export default ResponseModel;
