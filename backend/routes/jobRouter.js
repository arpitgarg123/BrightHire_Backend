const express = require('express');
const { postJob, getAllJobs, getJobById, getAdminJob } = require('../controllers/jobController');
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

router.post('/post',isLoggedIn,postJob);
router.get('/get',isLoggedIn,getAllJobs);
router.get('/get/:id',isLoggedIn,getJobById);
router.get('/adminjobs',isLoggedIn,getAdminJob);
module.exports = router;