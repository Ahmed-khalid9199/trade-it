const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastText: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);
