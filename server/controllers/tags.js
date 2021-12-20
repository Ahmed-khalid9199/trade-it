const Tag = require("../models/tag");

const postTag = async (req, res, next) => {
  try {
    console.log("postTag", req.body);
    const result = await Tag.create(req.body);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

const gatTags = async (req, res, next) => {
  try {
    console.log("gatTags");
    const result = await Tag.find().select("label value -_id");
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

module.exports = {
  postTag,
  gatTags,
};
