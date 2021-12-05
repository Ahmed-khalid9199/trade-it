const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    type: {
      type: String,
      require: true,
      enum: ["message"],
    },
    content: String,
    isRead: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
