import bcrypt from "bcryptjs";
import User from "../models/user.schema.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //    All fields required
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //  Check if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // All fields required
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email });
    
    // Check user
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first, then login.",
      });
    }
    
    // Password validation
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }
    // Create access token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user.isLoggedIn = true;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "User login successfully",
      user: user,
      token: token
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    user.isLoggedIn = false;
    await user.save()
    return res.status(200).json({
      success: true,
      message: "User loggedOut successfully",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { registerUser, loginUser, logout };
