const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phonenumber :{
        type  : Number
    },
    role: {type: String, enum: ['student', 'recruiter'], default: 'student', required: true},
    profile :  {
        bio : {
            type: String,
        },
        image : {
            type: String,
        },
        skills : [{type : String}],
        resume: {type : String}, 
        resumeoriginalname : {type: String},
        company : {type : mongoose.Schema.Types.ObjectId}, 
    }
},{timestamps : true});

module.exports = mongoose.model('User', userSchema);