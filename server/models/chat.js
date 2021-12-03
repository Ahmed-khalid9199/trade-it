const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    ad1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    ad2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    lastText: String,
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    unRead: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);
