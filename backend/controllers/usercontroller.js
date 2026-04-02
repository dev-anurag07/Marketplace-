import User from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req,res)=>{
    try{
        const{name,email,password,role}=req.body;

       const existingUser = await User.findOne({email});
       if(existingUser){
        return res.send("User already exists");
       }

       const hashedPassword =await bcrypt.hash(password,10);


        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();
        res.send("User saved in database");
    }
    catch(error){
        console.log(error);
        res.send("error in saving user")
    }
};

export const loginUser = async (req,res)=>{
    try{
        const {email,password}=req.body;

        const user= await User.findOne({email});

        if(!user){
            return res.send("user not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.send("Invalid Password");
        }

        const token =jwt.sign({id:user._id, role: user.role}, "secretkey",{expiresIn:"1d"});

        res.json({
            message: "Login successful",
            token
        })
    }
    catch(error){
        console.log(error);
        res.send("Error in Login");
    }
}