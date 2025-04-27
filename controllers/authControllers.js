const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/tokenUtils");
const User = require("../models/User");
const _ = require("lodash");

exports.register = async (req, res) => {
  const { name, email, password } = _.pick(req.body, [
    "name",
    "email",
    "password",
  ]);

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  res.status(201).json({ token: generateToken(user._id) });
};

exports.login = async (req, res) => {
  const { email, password } = _.pick(req.body, ["email", "password"]);

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  res.json({ token: generateToken(user._id) });
};
