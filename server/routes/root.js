const express = require("express");
const route = express.Router();
const userController = require("../controllers/users");
const chatController = require("../controllers/chats");
const productController = require("../controllers/product");
const tagController = require("../controllers/tags");

route.post("/sendemail", userController.sendEmail);
route.post("/verify", userController.verify);
route.post("/register", userController.registerUser);
route.post("/getuser", userController.getUser);
route.post("/getusers/:limit/:offset", userController.getUsers);
route.post("/login", userController.login);
route.put("/updateuser/:id", userController.updateUser);

route.post("/newchat", chatController.newChat);
route.get("/getchats/:user", chatController.getChats);
route.get("/getchat/:chatid", chatController.getChat);
route.put("/updatechat/:chatid", chatController.updateChat);
route.post("/sendmessage", chatController.newMessage);
route.put("/offerad/:chatid", chatController.offerAd);

route.post("/post", productController.addProduct);
route.post("/getproducts/:limit/:offset", productController.getProducts);
route.get("/getlikes/:userId", productController.getLikes);
route.get("/getrec/:userId/:offset", productController.getRec);
route.get("/getproduct/:productid", productController.getProduct);
route.get("/getmyproducts/:_id", productController.getMyProducts);
route.put("/updateproduct/:_id", productController.updateProduct);
route.get("/gettestfilter/:city/:search", productController.getFilter);
route.get(
  "/getSearchedProducts/:search",
  productController.getSearchedProducts
);
route.put("/likeproduct/:productid/:userid", productController.likeProduct);

// tags
route.post("/newtag", tagController.postTag);
route.get("/gettags", tagController.gatTags);

module.exports = route;
