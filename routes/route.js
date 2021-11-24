//"use strict";

const express = require("express");
const router = express.Router();
const { crudValidator } = require("../validators/userValidator");
//const { validate } = require("../validators/validationResult");
const {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/controller");

router.get("/get", crudValidator, getAllUsers);
router.post("/create", crudValidator, createUser);
router.delete("/delete", crudValidator, deleteUser);
router.put("/update", crudValidator, updateUser);

module.exports = router;
