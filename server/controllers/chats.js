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
// get chats for ibox sidebar
// {$or:[{region: "NA"},{sector:"Some Sector"}]}
const getChats = async (req, res, next) => {
  try {
    console.log("get chats");
    const result = await Chat.find({
      members: req.params.user,
    }).populate("members");
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

// get chat and its messages
const getChat = async (req, res, next) => {
  try {
    const chatId = req.params.chatid;
    console.log("get chat", chatId);
    var chat = await Chat.findById(chatId).populate("members", {
      username: 1,
    });
    const messages = await Message.find({ chat: chatId })
      .sort({
        createdAt: -1,
      })
      .limit(50)
      .skip(0);
    messages.reverse();
    res.status(200).send({ chat, messages });
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

module.exports = { newChat, newMessage, getChats, getChat };
