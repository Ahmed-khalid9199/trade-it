const express = require("express");
const route = express.Router();
const userController = require("../controllers/users");
route.post("/register", userController.registerUser);
route.post("/getuser", userController.getUser);
route.post("/login", userController.login);

module.exports = route;
