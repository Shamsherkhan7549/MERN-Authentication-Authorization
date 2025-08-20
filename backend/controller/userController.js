const USERMODEL = require('../model/userModel')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
const bcrypt = require('bcryptjs')

dotenv.config()


const generateToken = (id) => {
    return jwt.sign({id: id},process.env.SECRET_KEY,{expiresIn:"1h"})
}

const createUser = async(req, res) => {

    try{

    const {name,username, age, email, password} = req.body;
   
    const existUser = await USERMODEL.findOne({email:email});
    if(existUser != null){
       return res.status(400).json({success:false, message:"User already registered with this email"})
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new USERMODEL({name, username, age, email, password:hashedPassword});
    const savedUser = await newUser.save();

    if(!savedUser){        
        return res.json({success:false, message:"User Signup Failed."})
    }

    const token = generateToken(savedUser._id)

      // set cookie (optional)
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true in production (HTTPS)
      sameSite: "strict"
    });

    res.json({success:true, message:"User Signup Successfully.", token})
   }catch(e){
    res.status(500).json({success:false, message:e.message})
   }

}

// login
const login = async(req, res) => {
    try{
        
        const {username, password} = req.body;

        const existUser = await USERMODEL.findOne({username:username});
        
        if(!existUser) return res.status(4000).json({success:false, message:"user not found"})
          const isMatch = await bcrypt.compare(password, existUser.password)
        
        if(!isMatch) return res.status(400).json({success:false, message:"user not found"})

            const token = generateToken(existUser._id);

            

        // create cookies
        res.cookie("token", token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict"
        })

        res.status(200).json({success:true, message:"Login successfully", token})

    }catch(e){
        res.status(500).json({success:false, message:e.message})
    }
}

const readUsers = async(req, res) => {
    const users = await USERMODEL.find()
    if(users == null){
        return res.json({success:false, message:"User not available"})
    }
    return res.json({success:true, data:users})
}

const user = async(req, res) => {
    const {_id} = req.params;
    const existUser = await USERMODEL.findById(_id);
    if(existUser == null){
        return res.json({success:false, message:"User not available with this id"})
    }

    return res.json({success:true, data:existUser});
}

const updateUser = async(req, res) => {
    const {id}= req.id
    const{_id, username, name, age, email} = req.body
    if(id === _id){
        const existUser = await USERMODEL.findById(_id);

        if(!existUser) return res.status(404).json({success:true, message:"User not found"})

        existUser.name = name;
        existUser.username = username
        existUser.age = age;
        existUser.email = email;

        const savedUser = await existUser.save() ;
        if(savedUser === null){
            return res.json({success:true, message:"user not saved"})
        }

        res.json({success:true, message:"user updated"})
    }else{
        res.json({success:false, message:"You are not authorized"})

    }
}

const deleteUser = async(req, res) => {
    try{


    const {id} = req.id
    const {_id} = req.params

    if(id === _id){
         const deletedUser = await USERMODEL.findByIdAndDelete(_id)

        if(deletedUser === null){
            return res.json({success:false, message:"user not available with this id"})
        }
        return res.json({success:true, message:"user deleted"})
        }
        return res.json({success:false, message:"You are not authorized"})
        }catch(e){
        return res.json({success:false, message:e.message})

    }

}

module.exports = {createUser, readUsers, user, updateUser, deleteUser, login}
