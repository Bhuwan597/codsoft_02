const express = require("express");
const { signupUser, loginUser, viewAllUsers } = require("../controllers/UserController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.route('/').get(protect, viewAllUsers)
router.route('/signup').post(signupUser)
router.route('/login').post(loginUser)


module.exports = router
