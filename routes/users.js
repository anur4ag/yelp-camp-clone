const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const userController = require("../controllers/user");

router
  .route("/register")
  .get(userController.registerForm)
  .post(catchAsync(userController.register));

router
  .route("/login")
  .get(userController.loginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    userController.login
  );

router.get("/logout", userController.logout);
module.exports = router;
