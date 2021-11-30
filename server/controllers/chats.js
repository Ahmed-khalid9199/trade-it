const Chat = require("../models/chat");
const Message = require("../models/message");

const { ObjectId } = require("mongodb");

const newChat = async (req, res, next) => {
  try {
    const result = await Chat.create(req.body);
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

const newMessage = async (req, res, next) => {
  try {
    const result = await Message.create(req.body);
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

const getChats = async (req, res, next) => {
  try {
    console.log("get chats");
    const result = await Chat.find({
      user1: req.params.user,
    })
      .populate("user1", { username: 1 })
      .populate("user2", { username: 1, imgSrc: 1, email: 1 });
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

module.exports = { newChat, newMessage, getChats };
