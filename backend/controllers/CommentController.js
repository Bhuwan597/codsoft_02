const asyncHandler = require("express-async-handler");
const Comment = require("../models/CommentModel");

const postComment = asyncHandler(async (req, res) => {
    console.log(req.body)
  const { comment, commentedIn } = req.body;
  try {
    const savedComment = await Comment.create({
      comment,
      commentedIn,
      commentedBy: req.user._id,
    })
      .populate("commentedIn")
      .populate("commentedBy", "fullName profile");
    return res.json({
      success: true,
      message: "Comment Added!",
      data: savedComment,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Some error occured!",
    });
  }
});

const viewComments = asyncHandler(async (req, res) => {
    console.log(req.params.id)
  try {
    const comments = await Comment.find({
      commentedIn: req.params.id,
    }).populate("commentedBy", "fullName profile").sort({updatedAt:-1});
    return res.json({
      success: true,
      message: "ALl Comments!",
      data: comments,
    });
  } catch (error) {
    console.log(error.message)
    return res.json({
      success: false,
      message: "Some error occured!",
      data: [],
    });
  }
});

module.exports = { postComment, viewComments };
