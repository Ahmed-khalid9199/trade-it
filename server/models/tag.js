const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  label: String,
  value: String,
});

module.exports = mongoose.model("Tag", tagSchema);
