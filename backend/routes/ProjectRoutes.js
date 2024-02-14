const express = require("express");
const { createProject, viewProjects, updateProjects, viewProject } = require("../controllers/ProjectController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();
router.route('/').get(protect, viewProjects)
router.route('/create').post(protect,createProject)
router.route('/update/:id').post(protect, updateProjects)
router.route('/:slug').get(protect, viewProject)


module.exports = router
