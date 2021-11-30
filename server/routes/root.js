const express = require("express");
const route = express.Router();
const userController = require("../controllers/users");
const chatController = require("../controllers/chats");

route.post("/register", userController.registerUser);
route.post("/getuser", userController.getUser);
route.post("/login", userController.login);
route.post("/updateuser", userController.updateUser);

route.post("/newchat", chatController.newChat);
route.get("/getchats/:user", chatController.getChats);
route.post("/sendmessage", chatController.newMessage);

module.exports = route;
