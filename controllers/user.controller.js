const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const hasPassword = await bcrypt.hash(password, 10);

  const user = userService.createUSer({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hasPassword,
  });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res.status(201).json({ user: { fullname, email }, token });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();

  res.status(200).json({ user, token });
};
