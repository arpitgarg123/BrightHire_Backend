import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { APPLICANT_END_POINT_API, JOBS_END_POINT_API } from '@/utils/Constant';
import axios from 'axios';
import store from '@/redux/store';
import { toast } from 'sonner';

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const {singleJob} = useSelector(store => store.job);
  const {user } = useSelector(store => store.auth);
  const isIntiallyApplied = singleJob?.application?.some(application => application.applicantId === user._id) || false;

  const [isApplied, setIsApplied] = useState(isIntiallyApplied)
  const dispatch = useDispatch()
  const applyJobHandler = async ()=>{
    try{
      const response = await axios.get(`${APPLICANT_END_POINT_API}/apply/${jobId}`,{withCredentials:true});
      if(response.data.success){
        setIsApplied(true)
        const updatedSingleJob = {...singleJob, application :[...singleJob.application,{applicantId : user?._id}]};
        dispatch(setSingleJob(updatedSingleJob))
        toast.success(response.data.message)
      }
    }
    catch(error) {
      console.error(error);
      toast.error(error.response?.data?.message)
    }
  }
  useEffect(()=>{
      const fetchsingleJob = async () => {
          try {
              const response = await axios.get(`${JOBS_END_POINT_API}/get/${jobId}`,{withCredentials:true});
              if(response.data.success){
                  dispatch(setSingleJob(response.data.job))
                  setIsApplied(response.data.job.application.some(application => application.applicantId === user?._id))                
              }
          } catch (error) {
              console.error(error)
          }
      }
      fetchsingleJob()
  },[jobId,dispatch,user?._id])


  return (
    <div className="max-w-7xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="text-center mb-6 flex justify-between">
   <div>
   <h1 className="text-3xl font-bold text-gray-800">{singleJob?.title}</h1>
        <div className='flex items-center gap-2 mt-4'>
        <Badge className="text-blue-700 font-bold" variant="ghost">{singleJob?.position} positions</Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">{singleJob?.jobtype}</Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">{singleJob?.salary} LPA</Badge>
        </div>
   </div>
        <div className="text-center mt-8">
           <Button 
          onClick={ isApplied ?null : applyJobHandler}
           disabled={isApplied} 
           className={`${isApplied ?"w-full bg-gray-500 cursor-not-allowed":"w-full bg-[#7209b7] hover:bg-[#5b267f]" }`}>
            {isApplied ? "Already Applied" : "Apply Now"}
           </Button>
      </div>
      </div>
        <h2 className=" py-4 font-medium border-b-2 border-b-gray-300">Job Description</h2>
<div className="my-4">
        <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span> </h1>
        <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span> </h1>
        <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span> </h1>
        <h1 className='font-bold my-1'>Type: <span className='pl-4 font-normal text-gray-800'>{singleJob?.jobtype}</span> </h1>
        <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span> </h1>
        <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span> </h1>
        <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.application?.length}</span> </h1>
        <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span> </h1>

      </div>

    </div>
  );
};

export default JobDescription;
