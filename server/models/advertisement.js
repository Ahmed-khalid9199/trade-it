const mongoose = require("mongoose");

const adSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    productPictures: [{ data: Buffer, contentType: String }],
    tags: [String],
    likes: Number,
    activityStatus: {
      type: String,
      required: true,
      enum: ["active", "deactive", "traded"],
    },
    tradeInfo: { customer1: {}, customer2: {} },
    category: {
      type: String,
      enum: ["Electorincs", "Households"],
      default: "Miscellaneous",
    },
    yearOfManufacture: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Advertisement", adSchema);
