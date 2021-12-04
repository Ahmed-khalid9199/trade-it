const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    productPictures: [String],
    tags: [String],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    activityStatus: {
      type: String,
      required: true,
      enum: ["active", "deactive", "traded"],
      default: "active",
    },
    tradeInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    category: {
      type: String,
      enum: ["Electorincs", "Households", "Miscellaneous"],
      default: "Miscellaneous",
    },
    yearOfManufacture: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
