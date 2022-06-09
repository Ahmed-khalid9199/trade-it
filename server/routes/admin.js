const express = require("express");
const route = express.Router();
const adminController = require("../controllers/admin");

route.get("/linechart", adminController.productsAndUsersByMonth);
module.exports = route;
