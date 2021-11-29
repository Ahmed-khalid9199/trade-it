const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    read: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
