const express = require('express');
const { applyJob, getApplicants, getAppliedJobs, updateStatus } = require('../controllers/applicationController');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router.get('/apply/:id',isLoggedIn,applyJob);
router.get('/get',isLoggedIn,getAppliedJobs);
router.get('/:id/applicants',getApplicants);
router.post('/status/:id/update',isLoggedIn,updateStatus);

module.exports = router