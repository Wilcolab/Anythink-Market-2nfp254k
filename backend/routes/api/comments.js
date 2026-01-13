/**
 * Express router for handling comment operations in the application.
 * 
 * @module routes/api/comments
 * @requires express
 * @requires mongoose
 */

/**
 * GET / - Retrieve all comments
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Array of all comments with status 200, or error object with status 500
 */

/**
 * POST / - Create a new comment
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Comment data to be created
 * @param {Object} res - Express response object
 * @returns {Object} Created comment object with status 201, or error object with status 500
 */

/**
 * DELETE /:id - Delete a comment by ID
 * @async
 * @param {Object} req - Express request object
 * @param {string} req.params.id - The ID of the comment to delete
 * @param {Object} res - Express response object
 * @returns {Object} Success message with status 200, 404 if comment not found, or error object with status 500
 */
// Hey GitHub Copilot, please help me set up an Express router for handling comments in my application.

const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment" });
  }
});

// add another endpoint to deleting a comment
router.delete("/:id", async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});
module.exports = router;
