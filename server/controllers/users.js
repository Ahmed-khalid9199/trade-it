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

const login = async (req, res, next) => {
  try {
    console.log("login", req.body);
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
};
