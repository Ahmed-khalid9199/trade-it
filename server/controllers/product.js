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

const updateProduct = async (req, res) => {
  try {
    console.log("update product:", req.body);
    product
      .findByIdAndUpdate(
        req.params._id,
        {
          $set: req.body,
        },
        { new: true }
      )
      .then((result) => {
        console.log(result);
        res.status(200).send(result);
      });
  } catch (error) {
    console.log(error);
  }
};
const getProducts = async (req, res, next) => {
  try {
    console.log("get products", req.params.offset);
    const offset = parseInt(req.params.offset);
    const products = await product
      .find()
      .populate("owner")
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

const getFilteredProducts = async (req, res, next) => {
  try {
    console.log("get Filtered Products", req.params.city);

    const filteredProducts = await product
      .find({ city: req.params.city })
      .populate("owner")
      .sort({ createdAt: -1 });
    console.log("filtered Products", { filteredProducts });
    res.status(200).send(filteredProducts);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

const getTestFilter = async (req, res, next) => {
  try {
    console.log("get Filtered Products", req.params.city);

    const filteredProducts = await product
      .find({ city: req.params.city })
      .populate("owner")
      .sort({ createdAt: -1 });
    console.log("filtered Products", { filteredProducts });
    res.status(200).send(filteredProducts);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

const getSearchedProducts = async (req, res, next) => {
  try {
    const s = req.params.search;
    const regex = new RegExp(s, "i"); // i for case insensitive

    const searchedProducts = await product

      .find({
        $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }],
      })
      .populate("owner")
      .sort({ createdAt: -1 });
    console.log("searched Products", { searchedProducts });

    res.status(200).send(searchedProducts);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

const getProduct = async (req, res, next) => {
  try {
    console.log("Get Product", req.params.productid);
    const result = await product
      .findById(req.params.productid)
      .populate("owner");
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

const getMyProducts = async (req, res, next) => {
  try {
    console.log("get My Products", req.params._id);

    const myProducts = await product
      .find({ owner: req.params._id })
      .populate("owner")
      .sort({ createdAt: -1 });
    console.log("my Products", { myProducts });
    res.status(200).send(myProducts);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

module.exports = {
  addProduct,
  getProduct,
  getProducts,
  getFilteredProducts,
  getMyProducts,
  updateProduct,
  getSearchedProducts,
  getTestFilter,
};
