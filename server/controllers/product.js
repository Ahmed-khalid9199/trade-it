const product = require("../models/product");
const User = require("../models/user");
const Chat = require("../models/chat");
const mongoose = require("mongoose");

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
      .findByIdAndUpdate(req.params._id, req.body, { new: true })
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
    const limit = parseInt(req.params.limit);
    const { search } = req.body;

    const products = await product
      .find({
        ...req.query,
        $or: [{ title: { $regex: search, $options: "i" } }],
      })
      .populate("owner")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset);

    const allProducts = await product.find();

    response = {
      products,
      totalProducts: allProducts.length,
      remainingProducts: allProducts.length - offset - products.length,
    };
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

const getAnonProducts = async (req, res, next) => {
  try {
    console.log("get products", req.params.offset);
    const offset = parseInt(req.params.offset);
    const limit = parseInt(req.params.limit);

    const products = await product
      .find({
        activityStatus: "active",
      })
      .populate("owner")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset);

    const allProducts = await product.find({
      activityStatus: "active",
    });

    response = {
      products,
      totalProducts: allProducts.length,
      remainingProducts: allProducts.length - offset - products.length,
    };
    res.status(200).send(response);
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
    const limit = 10;

    var user = await User.findOne({
      _id: userId,
      preferences: { $exists: true },
    });
    console.log(user);

    if (user) {
      const pref = user.preferences;
      const allRec = await product.aggregate([
        { $match: { tags: { $in: pref }, activityStatus: "active" } },
        { $unwind: "$tags" },
        { $match: { tags: { $in: pref } } },
        { $group: { _id: "$_id" } },
        { $sort: { matches: -1 } },
      ]);
      const rec = await product
        .aggregate([
          { $match: { activityStatus: "active" } },
          { $match: { tags: { $in: pref } } },
          { $unwind: "$tags" },
          { $match: { tags: { $in: pref } } },
          {
            $group: {
              _id: "$_id",
              title: { $first: "$title" },
              images: { $first: "$images" },
              tags: { $first: "$tags" },
              description: { $first: "$description" },
              likes: { $first: "$likes" },
              city: { $first: "$city" },
              owner: { $first: "$owner" },
              createdAt: { $first: "$createdAt" },
              count: { $sum: 1 },
            },
          },
          { $sort: { matches: -1 } },
        ])
        .limit(limit)
        .skip(offset);
      User.populate(rec, { path: "owner" });

      let products = [];

      if (rec.length < limit) {
        console.log(
          "rec.length",
          parseInt(rec.length) === 0,
          "all rec",
          allRec.length
        );
        let skip = rec.length === 0 ? offset - allRec.length : 0;
        console.log("skip", skip);
        const recIdList = allRec.map((item) => item._id);
        console.log("recIdList", recIdList);
        products = await product
          .find({ _id: { $nin: recIdList }, activityStatus: "active" })
          .populate("owner")
          .sort({ createdAt: -1 })
          .limit(limit - rec.length)
          .skip(skip);
      }
      const bothProducts = [...rec, ...products];
      const allProducts = await product.find({ activityStatus: "active" });
      const remainingProducts =
        allProducts.length - offset - bothProducts.length;
      res.status(200).send({ products: bothProducts, remainingProducts });
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
          activityStatus: "active",
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
          activityStatus: "active",
        })
        .populate("owner")
        .sort({ createdAt: -1 });
    } else {
      filteredProducts = await product
        .find({
          city: req.params.city,
          activityStatus: "active",
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
    var query = require("url").parse(req.url, true).query;

    const myProducts = await product
      .find({ owner: req.params._id, ...query })
      .populate("owner tradedWith")
      .sort({ createdAt: -1 });
    console.log("my Products", { myProducts });
    res.status(200).send(myProducts);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

const getProductsInChats = async (req, res, next) => {
  try {
    console.log("get Products in chats", req.params._id);

    const userId = req.params._id;

    const chats = await Chat.find({
      members: userId,
    });

    let userProducts = await product.find({ owner: userId }).distinct("_id");
    userProducts = userProducts.map((up) => up.toString());

    let allProductsInChats = [];
    chats.map((c) => {
      allProductsInChats.push(...c.products);
    });

    let difference = allProductsInChats.filter(
      (x) => !userProducts.includes(x.toString())
    );

    const products = await product
      .find({ _id: { $in: difference } })
      .populate("owner")
      .sort({ createdAt: -1 });

    res.status(200).send(products);
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

const getLikes = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log("Get Likes", userId);
    const result = await product
      .find({ likes: userId, activityStatus: "active" })
      .populate("owner");
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

const getTotal = async (req, res, next) => {
  try {
    console.log("get total");
    const products = await product.find();

    res.status(200).send({ total: products.length });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

module.exports = {
  addProduct,
  getProduct,
  getProducts,
  getLikes,
  getRec,
  getMyProducts,
  updateProduct,
  getSearchedProducts,
  getFilter,
  likeProduct,
  getTotal,
  getProductsInChats,
  getAnonProducts,
};
