const applicationModel = require("../models/applicationModel");
const jobModel = require("../models/jobModel");

const applyJob = async (req,res) =>{
    try{
        const user = req.user;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({message: 'Invalid job id', success: false});
        }
        const application = await applicationModel.findOne({job : jobId, applicantId : user});
        if(application){
            return res.status(409).json({message: 'you have already applied for this job', success: false});
        }
        const job = await jobModel.findById(jobId);
        if(!job){
            return res.status(404).json({message: 'Job not found', success: false});
        }
       const newApplication = await applicationModel.create({
            job : jobId,
            applicantId : user
        });
           job.application.push(newApplication._id);
           await job.save();
        return res.status(200).json({message: 'successfully applied', success: true});
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const getAppliedJobs = async (req,res) =>{
    try{
        const user = req.user;
        const applications = await applicationModel.find({applicantId : user}).sort({createdAt : -1}).populate({
            path: 'job',
            Options : {sort : {createdAt: -1}},
            populate: { path: 'company',  Options : {sort : {createdAt: -1}}, }
        })
        if(applications.length === 0){
            return res.status(404).json({message: 'No applications found', success: false});
        }
        return res.status(200).json({applications, success: true});
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const getApplicants = async (req,res) =>{
 try{
const jobId = req.params.id;
const job = await jobModel.findById(jobId).populate({
    path: 'application',
    Options : {sort : {createdAt: -1}},
    populate: { path: 'applicantId',  Options : {sort : {createdAt: -1}}, }
})
 if(!job){
 return res.status(404).json({message: 'Job not found', success: false});
 }
 return res.status(200).json({job, success: true});
 }
 catch(error){
 res.status(500).json({message: error.message})
 } 
}

const  updateStatus = async (req, res) => {
    try{
        const {status } = req.body;        
        const applicationId = req.params.id;
        if(!status) {
            return res.status(400).json({message: 'Invalid status', success: false});
        }
        const application = await applicationModel.findOne({_id : applicationId});
        if(!application){
            return res.status(404).json({message: 'Application not found', success: false});
        }
        
        application.status = status.toLowerCase();
        await application.save();                
        return res.status(200).json({message: 'Status updated successfully', success: true}); 
    }
    catch(error){
        res.status(500).json({message: error.message ,success: false});
    }
}

module.exports = {
    applyJob,
    getAppliedJobs,
    getApplicants,
    updateStatus,
} 