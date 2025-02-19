const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captionControllers = require("../controllers/captain.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("fullname.firstname").notEmpty().withMessage("First name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color").isLength({ min: 3 }).withMessage("Invalid Color"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Vehicle plate must be at least 3"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Vehicle capacity must be at least 1"),
  ],
  captionControllers.registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Invalid Password"),
  ],
  captionControllers.loginCaptain
);

router.get(
  "/profile",
  authMiddleware.authCaptain,
  captionControllers.getCaptain
);

router.get(
  "/logout",
  authMiddleware.authCaptain,
  captionControllers.logoutCaptain
);

module.exports = router;
