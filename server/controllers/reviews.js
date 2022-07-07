const asyncHandler = require("express-async-handler");

const ReviewModal = require("../models/review");

// Access: Admin
// Method: POST
// route: /reviews
const createReview = asyncHandler(async (req, res) => {
  try {
    let createdReview = await (
      await ReviewModal.create(req.body)
    ).populate("user");

    res.status(201);

    res.json(createdReview);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

// Access: Private
// Method: GET
// route: /reviews/:id
const getReview = asyncHandler(async (req, res) => {
  try {
    let review = await ReviewModal.findById(req.params.id).populate("user");

    res.status(200);

    res.json(review);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

// Access: Private
// Method: PUT
// route: /reviews/:id
const updateReview = asyncHandler(async (req, res) => {
  try {
    let updatedReview = await ReviewModal.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, upsert: true }
    );

    res.status(200);

    res.json(updatedReview);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

// Access: Admin
// Method: DELETE
// route: /reviews/:id
const deleteReview = asyncHandler(async (req, res) => {
  try {
    // delete review
    // delete related projects
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

// Access: Admin
// Method: GET
// route: /reviews/:limit/:offset
const listReviews = asyncHandler(async (req, res) => {
  try {
    console.log("listReviews", req.params.offset);
    const offset = parseInt(req.params.offset);
    const limit = parseInt(req.params.limit);
    const {} = req.body;
    let filter = {};

    const reviews = await ReviewModal.find(filter)
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset);

    const totalReviews = await ReviewModal.find(filter);

    res.status(200).json({ data: reviews, length: totalReviews.length });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

// Access: user
// Method: GET
// route: /reviews/barchart
const reviewsBarchart = asyncHandler(async (req, res) => {
  try {
    console.log("reviewsBarchart");
    const data = await ReviewModal.aggregate([
      { $group: { _id: "$rating", count: { $count: {} } } },
      { $project: { _id: 0, rating: "$_id", count: "$count" } },
      { $sort: { rating: -1 } },
    ]);
    const response = [0, 0, 0, 0, 0];
    data.map((d) => {
      response[5 - d.rating] = d.count;
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

module.exports = {
  getReview,
  createReview,
  updateReview,
  listReviews,
  reviewsBarchart,
};
