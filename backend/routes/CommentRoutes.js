const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { postComment, viewComments } = require("../controllers/CommentController");

const router = express.Router();

router.route('/').post(protect, postComment );
router.route('/:id').get(protect, viewComments)

module.exports = router
