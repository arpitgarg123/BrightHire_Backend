import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICANT_END_POINT_API } from '@/utils/Constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setApplicants } from '@/redux/applicantSlice'

const Applicants = () => {
  const params = useParams();
  const { applicants } = useSelector(store => store.applicant)
  const dispatch = useDispatch();
  useEffect(()=>{
    const FetchAllApplicants = async () =>{
      try{
        const res = await axios.get(`${APPLICANT_END_POINT_API}/${params.id}/applicants`);
        if(res.data.success){
          dispatch(setApplicants(res.data.job));
        }
      }
      catch(error){
        console.error(error)
        toast.error(error?.response?.data?.message);
      }
    }
    FetchAllApplicants();
  },[])
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto '>
            <h1>Applicants ({applicants?.application?.length})</h1>
            <ApplicantsTable/>
        </div>
    </div>
  )
}

export default Applicants