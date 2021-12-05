const product = require("../models/product");

const addProduct = async (req, res, next) => {
  try {
    console.log("Set Product", req.body);
    const result = await product.create(req.body);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

const getProducts = async (req, res, next) => {
  try {
    console.log("get products", req.params.offset);
    const offset = parseInt(req.params.offset);
    const products = await product
      .find()
      .sort({ createdAt: -1 })
      .limit(50)
      .skip(offset);
    const allProducts = await product.find();
    const remainingProducts = allProducts.length - offset - products.length;
    console.log({ products, remainingProducts });
    res.status(200).send({ products, remainingProducts });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

const getProduct = async (req, res, next) => {
  try {
    console.log("Get Product", req.params.productid);
    const result = await product.findById(req.params.productid);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

module.exports = {
  addProduct,
  getProduct,
  getProducts,
};
