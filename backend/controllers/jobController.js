const jobModel = require("../models/jobModel");

const postJob = async (req,res)=>{
    try{
        const {title, description,requirements, jobtype,experience,company,position, location, salary} = req.body;
                
        if(!title ||!description ||!jobtype ||!company ||!position ||!location ||!salary){
            return res.status(400).json({message: 'something is missing', success: false});
        }
        const user = req.user;
        const job = await jobModel.create({
            title,
            description,
            requirements : requirements.split(","),
            jobtype,
            experience,
            company,
            position,
            location,
            salary : Number(salary),
            created_By: user
        })
        res.status(200).json({job, success: true});
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const getAllJobs = async (req, res) => {
    try{
        const keyword = req.query.keyword || "";
        const query =  {
            $or :[
                {title: {$regex: keyword, $options: 'i'}},
                {description: {$regex: keyword, $options: 'i'}},
            ]
        }
        const jobs = await jobModel.find(query).populate({
            path: 'company',
        }).sort({
            createdAt: -1,
        })
        // if(jobs.length === 0){
        //     return res.status(404).json({message: 'No jobs found', success: false});
        // }

       return res.status(200).json({jobs,success : true}); 
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const getJobById = async (req, res) => {
    try{
        const jobId = req.params.id;
        const job = await jobModel.findById(jobId).populate({
            path: 'application',
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

const getAdminJob = async (req, res) => {
    try{
        const admin = req.user
        if(!admin){
            return res.status(403).json({message: 'You are not authorized to view this information', success: false});
        }
        const jobs = await jobModel.find({created_By : admin}).populate({
            path: 'company',
            createdAt : -1
        })
        if(jobs.length === 0){
            return res.status(404).json({message: 'No jobs found', success: false});
        }
        return res.status(200).json({jobs, success: true});
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}
module.exports = {
    postJob,
    getAllJobs,
    getJobById,
    getAdminJob
}