import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOBS_END_POINT_API } from '@/utils/Constant';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner';

const useGetAllAdminJobs = () => {
const dispatch = useDispatch();

useEffect(()=>{
    const fetchAllAdminJobs = async () => {
        try{
        const res = await axios.get(`${JOBS_END_POINT_API}/adminjobs`,{withCredentials:true});
        if(res.data.success){
            dispatch(setAllAdminJobs(res?.data?.jobs))
        }
        }
        catch(error){
            console.error('Error fetching all jobs:', error?.message)
        }
    }
    fetchAllAdminJobs()
},[])

}

export default useGetAllAdminJobs