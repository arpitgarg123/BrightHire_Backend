const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    companyName:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
    },
    logo:{
        type: String,
    },
    website:{
        type: String,
    },
    location:{
        type: String,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps : true})

module.exports = mongoose.model('Company', companySchema);