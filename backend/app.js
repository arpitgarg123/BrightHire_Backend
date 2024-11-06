const path = require('path');
require("dotenv").config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cors = require('cors');
const db = require("./utils/mongoDb")


const _dirname = path.resolve()

const userRouter = require('./routes/userRouter');
const companyRouter = require('./routes/companyRouter');
const jobRouter = require('./routes/jobRouter');
const applicantsRouter = require('./routes/applicantRouter');
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(expressSession({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false
})); 
app.use(cookieParser());


const corsOptions = {  
    origin: 'https://brighthire-backend.onrender.com',
    credentials: true
}

app.use(cors(corsOptions));

// routes
app.use("/user", userRouter);
app.use("/company", companyRouter);
app.use("/job", jobRouter);
app.use("/applicant", applicantsRouter);

app.use(express.static(path.join(_dirname ,"/frontend/dist")));
app.get("*", (_,res)=>{
    res.sendFile(path.join(_dirname, "frontend","dist","index.html"));
})

app.listen(process.env.PORT || 3000 ,()=>{
    console.log("Server is running on port 3000");
})