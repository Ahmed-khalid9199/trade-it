const express = require("express");
const route = express.Router();
const userController = require("../controllers/users");
const chatController = require("../controllers/chats");
const productController = require("../controllers/product");

route.post("/register", userController.registerUser);
route.post("/getuser", userController.getUser);
route.post("/login", userController.login);
route.post("/updateuser", userController.updateUser);

route.post("/newchat", chatController.newChat);
route.get("/getchats/:user", chatController.getChats);
route.get("/getchat/:chatid", chatController.getChat);
route.put("/updatechat/:chatid", chatController.updateChat);
route.post("/sendmessage", chatController.newMessage);

route.post("/post", productController.addProduct);
route.get("/getproducts/:offset", productController.getProducts);
route.get("/getproduct/:productid", productController.getProduct);
route.get("/getfilteredproducts/:city", productController.getFilteredProducts);
route.get("/getmyproducts/:_id", productController.getMyProducts);
route.post("/updateproduct/:_id", productController.updateProduct);
route.post("/gettestfilter/:city/:search", productController.getTestFilter);
route.get(
  "/getSearchedProducts/:search",
  productController.getSearchedProducts
);

route.get("/test/:param1/:param2", (req, res) => {
  console.log(req.params.param1, req.params.param2);
  res.send({
    p1: req.params.param1,
    p2: req.params.param2,
  });
});

module.exports = route;
