const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const post = await Post.create({ ...req.body, userId: req.user._id });
  res.status(201).json(post);
};

exports.getMyPosts = async (req, res) => {
  const posts = await Post.find({ userId: req.user._id });
  res.json(posts);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  );
  res.json(post);
};

exports.deletePost = async (req, res) => {
  await Post.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  res.json({ message: "Post deleted" });
};
