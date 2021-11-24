const { body, query, validationResult } = require("express-validator");
const responseData = require("../response/responseData");
const responseMessage = require("../response/responseMessage");

//validation for crud operations
const crudValidator = (method) => {
  switch (method) {
    case "create": {
      return [
        body("firstName")
          .isString()
          .withMessage("firstName must be string")
          .bail(),
        body("lastName")
          .isString()
          .withMessage("lastName must be string")
          .bail(),
        body("email").isEmail().withMessage("email must be valid").bail(),
        body("password")
          .isLength({ min: 5 })
          .withMessage("password must be at least 5 characters long")
          .bail()
          .matches(/\d/)
          .withMessage("password must contain a number"),
        body("role").isString().withMessage("role must be string"),
      ];
    }
    case "update": {
      return [
        body("firstName")
          .isString()
          .withMessage("firstName must be string")
          .bail(),
        body("lastName")
          .isString()
          .withMessage("lastName must be string")
          .bail(),
        body("email").isEmail().withMessage("email must be valid").bail(),
        body("password")
          .isString()
          .withMessage("password must be string")
          .bail(),
        body("role").isString().withMessage("role must be string"),
      ];
    }
    case "delete": {
      return [body("id").isInt().withMessage("id must be integer")];
    }
    case "get": {
      return [query("id").isInt().withMessage("id must be integer")];
    }
    default: {
      return [];
    }
  }
};

module.exports = { crudValidator };
