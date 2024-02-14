const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const generateToken = require("../utils/generate_token");

const signupUser = asyncHandler(async (req, res) => {
  try {
    const { fullName, email, password , profile} = await req.body;
    if (!fullName || !email || !password || !profile) {
      return res.json({
        success: false,
        message: "All fields are required!",
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({
        success: false,
        message: "User Already Exists!",
      });
    }
    const user = await User.create({
      fullName,
      email,
      password,
      profile,
    })
    if (user) {
      return res.json({
        success: true,
        message: "Account Created Successfully!",
        data: {
            fullName: user.fullName,
            email: user.email,
            profile: user.profile,
        }
      });
    }
    return res.json({
      success: false,
      message: "Some Error Occured!",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal Server Occured!",
      stackMessage: error.message
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = await req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.json({
                success: false,
                message: "Invalid Credentials",
              });
        }
        if (user && (await user.matchPassword(password))) {
          return res.json({
            success: true,
            message: "Login Successfull!",
            data: {
              _id: user._id,
              fullName: user.fullName,
              email: user.email,
              profile: user.profile,
              token: generateToken(user._id)
            }
          });
        } else {
            return res.json({
                success: false,
                message: "Invalid Credentials",
              });
        }
    } catch (error) {
        res.json({
            success: false,
            message: "Internal Server Occured!",
            stackMessage: error.message
          });
    }

  });

  const viewAllUsers = asyncHandler(async (req, res) => {
    try {
      const user = await User.find().where('_id').ne(req.user._id).select("fullName profile")
      return res.json(user);
    } catch (error) {
      return res.json({ 
        success: false,
        message: error.message
       });
    }
  });

module.exports = {signupUser , loginUser, viewAllUsers}