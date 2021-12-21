const express = require("express");
const route = express.Router();
const userController = require("../controllers/users");
const chatController = require("../controllers/chats");
const productController = require("../controllers/product");
const tagController = require("../controllers/tags");

route.post("/register", userController.registerUser);
route.post("/getuser", userController.getUser);
route.post("/login", userController.login);
route.post("/updateuser", userController.updateUser);

route.post("/newchat", chatController.newChat);
route.get("/getchats/:user", chatController.getChats);
route.get("/getchat/:chatid", chatController.getChat);
route.put("/updatechat/:chatid", chatController.updateChat);
route.post("/sendmessage", chatController.newMessage);
route.put("/offerad/:chatid", chatController.offerAd);

route.post("/post", productController.addProduct);
route.get("/getproducts/:offset", productController.getProducts);
route.get("/getlikes/:userId", productController.getLikes);
route.get("/getrec/:userId/:offset", productController.getRec);
route.get("/getproduct/:productid", productController.getProduct);
route.get("/getmyproducts/:_id", productController.getMyProducts);
route.post("/updateproduct/:_id", productController.updateProduct);
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
