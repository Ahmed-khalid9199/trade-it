const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    type: {
      type: String,
      require: true,
      enum: ["customer", "admin"],
    },
    imgSrc: String,
    dob: {
      type: Date,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    street: String,
    province: String,
    city: String,
    cnic: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    reviews: {
      body_text: String,
      rating: Number,
      writer_id: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
