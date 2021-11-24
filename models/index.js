//"use strict";
//const { strict } = require("assert/strict");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const Sequelize = require("sequelize");
const { DBCONFIG } = require("../config/config");

const database = DBCONFIG.DATABASE;
const username = DBCONFIG.USERNAME;
const password = DBCONFIG.PASSWORD;
const host = DBCONFIG.HOST;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "mysql",
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  },
  pool: {
    max: 100,
    min: 0,
    idle: 10000,
    acquire: 10000,
  },
  logging: false,
});

const db = {};

// Read all files in models directory
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
});
module.exports = db;
