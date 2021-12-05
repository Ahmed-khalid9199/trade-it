const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    images: [String],
    tags: [String],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    activityStatus: {
      type: String,
      required: true,
      enum: ["active", "deactive", "traded"],
      default: "active",
    },
    category: {
      type: String,
      enum: ["Electorincs", "Households", "Miscellaneous"],
      default: "Miscellaneous",
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tradedWith: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    yearOfManufacture: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
