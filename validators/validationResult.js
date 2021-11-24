const { validationResult } = require("express-validator");
const responseData = require("../response/responseData");
const responseMessage = require("../response/responseMessage");

const validate = (validationRules) => async (req, res, next) => {
  await validationRules.map((rule) => {
    rule.run(req);
  });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseData.badRequest(
      res,
      responseMessage.VALIDATION.valError,
      errors.array()
    );
  }
  next();
};

module.exports = { validate };
