const companyModel = require('../models/companyModel');
const getDataUri = require('../utils/DataUri');
const cloudinary = require('../utils/Cloudinary');

const registerCompany = async (req,res)=>{
    try{
        const {companyName} = req.body;
        const company = await companyModel.findOne({companyName});
        if(company){
            return res.status(409).json({message: 'Company already exists', success: false});
        }
       let newCompany =  await companyModel.create({
            companyName,
            userId : req.user
        });
        return res
        .status(201)
        .json({company : newCompany,message: 'Company registered successfully', success: true});
    }
    catch(error){
        res.status(500).json({message: error.essage})
    }

}

const getCompany = async (req, res) => {
    try{
        const userId = req.user;
        const companies = await companyModel.find({userId});
        if (companies.length === 0) {
            return res.status(404).json({ message: 'No companies found', success: false });
        }
        return res.json({companies, success: true});
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const getCompanyById = async (req, res) => {
    try{
        const companyId = req.params.id;
        const company = await companyModel.findById(companyId);
        if(!company){
            return res.status(404).json({message: 'Company not found', success: false});
        }
        return res.json({company, success: true});
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const updateCompany = async (req, res) => {
    try{
        const {companyName,description,website,location} = req.body;
        const file = req.file 
        // cloudnary part which is kept for later
        let logo;
        if (req.file) {
            const fileUri = getDataUri(req.file); // Ensure this function works as expected
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
        }

        const updateData ={companyName,description,website,location};
        if (logo) updateData.logo = logo;
        const company = await companyModel.findByIdAndUpdate(req.params.id,updateData,{new : true});
        if(!company){
            return res.status(404).json({message: 'Company not found', success: false});
        }
        return res.json({message : 'company update successfully', success: true});

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    registerCompany,
    getCompany,
    getCompanyById,
    updateCompany,
 };
