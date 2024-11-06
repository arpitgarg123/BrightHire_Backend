const jwt = require('jsonwebtoken');
const isLoggedIn = async (req,res,next)=>{
try{
const token = req.cookies.token;
if(!token){
    return res.status(401).json({message:"You are not logged in"})
}

const decoded = jwt.verify(token,process.env.JWT_SECRET);
if(!decoded.user){
    return res.status(401).json({message:"You are not logged in"})
}
req.user = decoded.user;
next();

}
catch(err){
    console.error(err);
    res.status(500).json({message:"Server Error"})
}
}
module.exports = isLoggedIn;