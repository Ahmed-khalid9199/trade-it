const Chat = require("../models/chat");
const Message = require("../models/message");

const newChat = async (req, res, next) => {
  try {
    const result = await Chat.create(req.body);
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

module.exports = { newChat };
