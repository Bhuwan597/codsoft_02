const asyncHandler = require("express-async-handler");
const Project = require("../models/ProjectModel");

const createProject = asyncHandler(async (req, res) => {
  try {
    const { title, description, members, deadline, category } =
      await req.body;
    const project = await Project.create({
      title,
      description,
      createdBy: req.user._id,
      members,
      deadline,
      category,
    });
    if (project) {
      return res.json({
        success: true,
        message: "Project Created Successfully!",
        data: project,
      });
    }
    return res.json({
      success: false,
      message: "Some Error Occured!",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
});

const viewProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ createdBy: req.user._id }, { members: req.user._id }],
    })
      .populate("createdBy", "fullName -_id")
      .populate("members", "fullName profile -_id");

    return res.json({ projects });
  } catch (error) {
    return res.json({ projects: [] });
  }
});

const viewProject = asyncHandler(async (req, res) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug
    })
      .populate("createdBy", "fullName -_id")
      .populate("members", "fullName profile -_id");
    return res.json(project);
  } catch (error) {
    return res.json({ 
      success: false,
      message: error.message
     });
  }
});

const updateProjects = asyncHandler(async (req, res) => {
  try {
    const checkProject = await Project.findById(req.params.id)
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        status: checkProject.status==="completed"?"incompleted":"completed",
      },
      {
        returnOriginal: false,
      }
    )
      .populate("createdBy", "fullName -_id")
      .populate("members", "fullName profile -_id");
    if (project) {
      return res.json({
        success: true,
        message: "Successfully Updated!",
        data: project,
      });
    } else {
      return res.json({
        success: false,
        message: "Failed to update!",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = { createProject, viewProjects, updateProjects, viewProject };
