const User = require("../models/user");

const registerUser = async (req, res, next) => {
  try {
    console.log("register user", req.body);
    const result = await User.create(req.body);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

const getUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await User.find(req.body);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    console.log("update user:", req.body);
    User.findByIdAndUpdate(
      req.body.id,
      {
        $set: req.body,
      },
      { new: true }
    ).then((result) => {
      console.log(result);
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res, next) => {
  try {
    console.log("login", req);
    const result = await User.find(req.body).select("username password -_id");
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

module.exports = {
  registerUser,
  getUser,
  login,
  updateUser,
};
