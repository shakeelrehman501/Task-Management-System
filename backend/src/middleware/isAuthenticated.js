import jwt from "jsonwebtoken"
import 'dotenv/config'
import User from "../models/user.schema.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("token "))
      return res.status(400).json({
        success: false,
        message: "Token is invalid or missing",
      });
      const token = authHeader.split(' ')[1]
      let tokenData;
      try {
        tokenData = jwt.verify(token, process.env.SECRET_KEY)
      } catch (error) {
        if(error.name === "TokenExpiredError"){
            return res.status(400).json({
                success:false,
                message:"Token has expired"
            })
        }
        return res.status(400).json({
            success:false,
            message:"Token is missing & verification failed"
        })
      }
      const user = await User.findById(tokenData.id)
      if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
      }
      req.id = user._id
      next()
  } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    })
  }
};

export default isAuthenticated;