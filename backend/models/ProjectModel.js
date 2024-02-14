const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)
const projectModel = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    deadline: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, default: "incompleted" },
    slug: { type: String, slug: "title"}
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectModel);

module.exports = Project;
