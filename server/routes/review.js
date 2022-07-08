const express = require("express");
const {
  createReview,
  updateReview,
  listReviews,
  getReview,
  reviewsBarchart,
} = require("../controllers/reviews");

const router = express.Router();

router.post("/", createReview);
router.get("/barchart/:id", reviewsBarchart);
router.put("/:id", updateReview);
router.get("/:id", getReview);
router.post("/:limit/:offset", listReviews);

module.exports = router;
