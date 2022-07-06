const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    images: [String],
    tags: [String],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    seen: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    activityStatus: {
      type: String,
      required: true,
      enum: ["active", "removed", "banned", "traded"],
      default: "active",
    },
    category: {
      type: String,
      enum: ["Electorincs", "Households", "Miscellaneous"],
      default: "Miscellaneous",
    },
    tags: [String],
    city: {
      type: String,
      enum: ["lahore", "karachi", "islamabad", "quetta"],
      default: "lahore",
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tradedWith: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    tradedAt: Date,
    yearOfManufacture: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
