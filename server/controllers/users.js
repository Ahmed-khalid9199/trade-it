const bcrypt = require("bcryptjs");
const Otp = require("../models/otp");
const User = require("../models/user");
const { sendVerificationEmail } = require("../util/email");

const registerUser = async (req, res, next) => {
  try {
    console.log("register user", req.body);
    const result = await User.create(req.body);
    res.status(200).send("User successfully created!");
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

const getUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.findOne(req.body);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

const getUsers = async (req, res, next) => {
  try {
    console.log(req.query, req.body);
    const offset = parseInt(req.params.offset);
    const limit = parseInt(req.params.limit);
    const { search } = req.body;
    const users = await User.find({
      ...req.query,
      $or: [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset);
    const allUsers = await User.find();

    response = {
      users,
      totalUsers: allUsers.length,
    };
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    console.log("update user:", req.body);
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(
      (result) => {
        console.log(result);
        res.status(200).send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res, next) => {
  try {
    console.log("login", req.body);
    const user = await User.findOne({ ...req.body }).select(
      "username password status -_id"
    );

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const sendEmail = async (req, res, next) => {
  try {
    console.log("send email", req.body);

    const { email } = req.body;

    const user = await checkUserInDb(email);

    if (!user) {
      // generate 4 digit random number
      const code = Math.floor(1000 + Math.random() * 9000);
      console.log("sending email");
      sendVerificationEmail(email, code);

      await Otp.findOneAndUpdate(
        { email },
        { code },
        { new: true, upsert: true }
      );
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const resetPassword = async (req, res, next) => {
  try {
    console.log("resetPassword", req.body);
    const { email } = req.body;

    var resetPassword = Math.random().toString(36).slice(-8);
    const hashPassword = await bcrypt.hash(resetPassword, 8);
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashPassword }
    );
    console.log(user);
    if (user) {
      console.log("sending email");
      sendVerificationEmail(email, resetPassword);
    }
    res.status(200).send({ user });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const checkUserInDb = async (email) => {
  var user = await User.findOne({ email });

  return user ? true : false;
};

const verify = async (req, res, next) => {
  try {
    console.log("send email", req.body);

    const { email, code } = req.body;

    const otp = await Otp.findOne({ email, code });
    if (otp) {
      await Otp.deleteOne({ email });
      res.status(200).send();
      return;
    }
    res.status(401).send("invalid");
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const getTotal = async (req, res, next) => {
  try {
    console.log("get total");
    const users = await User.find();

    res.status(200).send({ total: users.length });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

module.exports = {
  getTotal,
  registerUser,
  getUser,
  getUsers,
  login,
  updateUser,
  sendEmail,
  resetPassword,
  verify,
};
