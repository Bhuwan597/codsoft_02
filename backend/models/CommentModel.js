const mongoose = require("mongoose");

const commentModel = mongoose.Schema(
  {
    comment: { type: String, required: true },
    commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    commentedIn: { type: mongoose.Schema.Types.ObjectId, ref: "Project"  },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentModel);

module.exports = Comment;