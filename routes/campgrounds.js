const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { storage } = require("../cloudinary");
const multer = require("multer");
const upload = multer({ storage });
const {
  isLoggedIn,
  validateCampground,
  isAuthor,
} = require("../middleware/middleware");
const campgroundController = require("../controllers/campground");

router
  .route("/")
  .get(catchAsync(campgroundController.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgroundController.createCampground)
  );

router.get("/new", isLoggedIn, campgroundController.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgroundController.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array('image'),
    validateCampground,
    catchAsync(campgroundController.editCampground)
  )
  .delete(isLoggedIn, catchAsync(campgroundController.delete));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgroundController.renderEditForm)
);

module.exports = router;
