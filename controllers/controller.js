//"use strict";

const User = require("../models/user");
const models = require("../models/index");
const responseData = require("../response/responseData");
const responseMessage = require("../response/responseMessage");
const logger = require("../utils/logger");

//get all users
const getAllUsers = async (req, res) => {
  models.user
    .findAll()
    .then((users) => {
      return responseData.success(res, responseMessage.CRUD.SUCCESS, users);
    })
    .catch((err) => {
      return responseData.internalServerError(
        res,
        responseMessage.CRUD.ERROR,
        err
      );
    });
};

//post the user
const createUser = async (req, res) => {
  const { id, firstName, lastName, email, password, role } = req.body;
  //console.log("DB", models);
  models.user
    .create({
      id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: role,
    })
    .then((user) => {
      return responseData.success(res, responseMessage.CRUD.SUCCESS, user);
    })
    .catch((err) => {
      return responseData.internalServerError(
        res,
        responseMessage.CRUD.ERROR,
        err
      );
    });
};

//delete the user by id
const deleteUser = async (req, res) => {
  const { id } = req.params;
  models.user
    .destroy({
      where: {
        id: id,
      },
    })
    .then((user) => {
      //send response of deleted user details
      return responseData.success(res, responseMessage.CRUD.userDeleted, user);
    })
    .catch((err) => {
      return responseData.internalServerError(
        res,
        responseMessage.CRUD.ERROR,
        err
      );
    });
};

//update the user by id
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, role } = req.body;
  models.user
    .update(
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: role,
      },
      {
        where: {
          id: id,
        },
      }
    )
    .then((user) => {
      return responseData.success(res, responseMessage.CRUD.userUpdated, user);
    })
    .catch((err) => {
      return responseData.internalServerError(
        res,
        responseMessage.CRUD.ERROR,
        err
      );
    });
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
};
