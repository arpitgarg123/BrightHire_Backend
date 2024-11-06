const express = require('express');
const { registerCompany, getCompany, getCompanyById, updateCompany } = require('../controllers/companyController');
const isLoggedIn = require('../middlewares/isLoggedIn');
const upload = require('../middlewares/multer');

const router = express.Router();

router.post("/register",isLoggedIn,registerCompany);
router.get("/get",isLoggedIn,getCompany);
router.get("/get/:id",isLoggedIn,getCompanyById);
router.put("/update/:id",isLoggedIn,upload.single("file"),updateCompany);

module.exports = router;