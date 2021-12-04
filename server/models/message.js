const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    text: { type: String, required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blocked: Boolean,
    tag: String,
    read: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
