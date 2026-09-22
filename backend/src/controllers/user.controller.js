import bcrypt from "bcryptjs"
import User from "../models/user.schema";

const registerUser = async()=>{
    try {
       const {name, email, password} = req.body;
        //    All fields required
       if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
       }
        //  Check if user already exist
       const existingUser = await User.findOne({email})
       if(existingUser){
        return res.status(409).json({
            success:false,
            message:"User already exists"
        })
        }
        // Hash password
        const hashPassword = await bcrypt.hash(password, 10)
        
        // Create new user
        const newUser = await User.create({
            name,
            email,
            password:hashPassword,
        })
        return res.status(201).json({
            success: true,
            message:"User registered successfully",
            user:newUser
        })
     
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })    
    }
}

export {registerUser}