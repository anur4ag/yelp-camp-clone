const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review");
const Campground = require("../models/campground");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");
const reviewController = require("../controllers/review");
const { reviewSchema, campgroundSchema } = require("../schema");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware/middleware");
const campground = require("../models/campground");

router.post(
  "/",
  validateReview,
  isLoggedIn,
  catchAsync(reviewController.addReview)
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviewController.deleteReview)
);

module.exports = router;
