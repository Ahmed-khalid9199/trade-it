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
    profile_picture: { data: Buffer, contentType: String },
    date_of_birth: {
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
    provice: String,
    city: String,
    cnic: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    reviews: {
      body_text: String,
      rating: Number,
      writer_id: mongoose.Schema.Types.ObjectId,
    },
    advertisements: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Advertisement",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
