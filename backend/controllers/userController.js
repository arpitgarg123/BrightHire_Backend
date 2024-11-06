const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/DataUri");
const cloudinary = require("../utils/Cloudinary");

const register = async (req,res) =>{
try{
    const {fullname,email,password,phonenumber,role} = req.body;
    if(!fullname || !email || !password || !phonenumber || !role){
        return res.status(400).json({message: 'something is missing', success: false});
    }
    const file = req.file;
    let cloudResponse;
    if(file){
        const fileUri = getDataUri(file);
     cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    const user = await userModel.findOne({email});
    if(user){
        return res.status(400).json({message: 'User already exists', success: false});
    }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await userModel.create({
    fullname,
    email,
    phonenumber,
    password: hashedPassword,
    role,
    profile :  {
        image : cloudResponse.secure_url
    }
  });
    res.status(201).json({message: 'Account registered successfully', success: true});
}
 catch(error){
 res.status(500).json({message: error.message})
 }
}

const login = async (req, res) => {
    try{
        const {email, password,role} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404)
            .json({message: 'email or password is incorrect', success: false});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'email or password is incorrect', success: false});
        }
        if(role && user.role!== role){
            return res.status(403)
            .json({message: "account doesn't exist for the current role ", success: false});
        }
        const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET,{expiresIn : "1d"});
        res
        .cookie("token", token,{maxAge : 1*24*60 * 60*1000, httpsOnly: true, samesite : "strict"})
        .json({user,message: `welcome back ${user.fullname}`, success: true});
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const logout = async (req, res) => {
    try{
        return res.status(200).cookie("token","",{maxAge : 0}).json({message: "you have logged out successfully", success: true});
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const updateProfile = async (req,res)=>{
    try{
        const {fullname, email,phonenumber,bio,skills} = req.body;
        const file = req.file;
        let cloudResponse;
        if(file){

            const fileUri = getDataUri(file);          
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }
        
        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        let user = await userModel.findOne({_id : req.user});
        if(!user){
            return res.status(404).json({message: 'User not found', success: false});
        }
        
        if (email && user.email !== email) {
            const emailExists = await userModel.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already in use', success: false });
            }
            user.email = email;
        }
        if(fullname) user.fullname = fullname;
        if(phonenumber) user.phonenumber = phonenumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray;
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeoriginalname = file.originalname
        }
        await user.save();
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
         profile : { 
             bio: user.profile.bio,
            skills: user.profile.skills,
            resume: user.profile.resume,
            resumeoriginalname: user.profile.resumeoriginalname,
        }
        }
        res.json({user, message: 'Profile updated successfully', success: true});
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {register, login, logout, updateProfile};