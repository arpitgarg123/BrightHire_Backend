const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requiremests :[{
        type: String,
    }],
    salary : {
     type : Number,
     required: true
    },
    experience :{
        type: Number,
    },
    location: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
       ref: 'Company',
        required: true
    },
    jobtype :{
        type: String,
        required: true
    },
    position :{
        type: Number,
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    created_By : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    application :{
       type: [mongoose.Schema.Types.ObjectId],
        ref: 'Application'
    },
},{timestamps : true})

module.exports = mongoose.model('Job', jobSchema);