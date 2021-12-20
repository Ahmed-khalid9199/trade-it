const product = require("../models/product");
const User = require("../models/user");

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

const getRec = async (req, res, next) => {
  try {
    console.log("get recommendations Products", req.params);

    const userId = req.params.userId;
    const offset = parseInt(req.params.offset);
    const limit = 50;

    var user = await User.findOne({
      _id: userId,
      preferences: { $exists: true, $not: { $size: 0 } },
    });

    if (user) {
      const pref = user.preferences;
      const allRec = await product.aggregate([
        { $match: { tags: { $in: pref } } },
        { $unwind: "$tags" },
        { $match: { tags: { $in: pref } } },
        { $sort: { matches: -1 } },
      ]);
      const rec = await product
        .aggregate([
          { $match: { tags: { $in: pref } } },
          { $unwind: "$tags" },
          { $match: { tags: { $in: pref } } },
          { $sort: { matches: -1 } },
        ])
        .limit(limit)
        .skip(offset);
      User.populate(rec, { path: "owner" });
      let products = [];
      if (allRec.length < limit) {
        let skip = rec.length === 0 ? offset - allRec.length : 0;
        const recIdList = rec.map((item) => item._id);
        products = await product
          .find({ _id: { $nin: recIdList } })
          .populate("owner")
          .sort({ createdAt: -1 })
          .limit(limit - rec.length)
          .skip(skip);
      }

      res.status(200).send([...rec, ...products]);
    } else {
      res.status(404).send(null);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

const getFilter = async (req, res, next) => {
  try {
    const s = req.params.search;
    const regex = new RegExp(s, "i"); // i for case insensitive
    console.log("get Filtered Products", req.params.city);
    let filteredProducts;
    if (req.params.city === "null") {
      filteredProducts = await product

        .find({
          $or: [
            { title: { $regex: regex } },
            { description: { $regex: regex } },
          ],
        })
        .populate("owner")
        .sort({ createdAt: -1 });
    } else if (req.params.search === "null") {
      filteredProducts = await product
        .find({
          city: req.params.city,
        })
        .populate("owner")
        .sort({ createdAt: -1 });
    } else {
      filteredProducts = await product
        .find({
          city: req.params.city,
          $or: [
            { title: { $regex: regex } },
            { description: { $regex: regex } },
          ],
        })
        .populate("owner")
        .sort({ createdAt: -1 });
    }

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
    console.log("search");
    res.status(500).send({ msg: err.message });
  }
};
const likeProduct = async (req, res, next) => {
  try {
    console.log("like product", req.params.productid);
    const productid = req.params.productid;
    const userid = req.params.userid;
    const removeLikes = await product.updateOne(
      { _id: productid, likes: userid },
      {
        $pull: {
          likes: userid,
        },
      }
    );
    console.log(removeLikes.nModified);
    if (removeLikes.nModified) {
      console.log("removed");
      const newProduct = await product.findById(productid);
      res.status(200).send(newProduct);
    } else {
      console.log("added");

      const newProduct = await product.findOneAndUpdate(
        { _id: productid },
        { $push: { likes: userid } },
        { new: true }
      );
      res.status(200).send(newProduct);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

module.exports = {
  addProduct,
  getProduct,
  getProducts,
  getRec,
  getMyProducts,
  updateProduct,
  getSearchedProducts,
  getFilter,
  likeProduct,
};
