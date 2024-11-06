import { setJobs } from '@/redux/jobSlice'
import store from '@/redux/store'
import { JOBS_END_POINT_API } from '@/utils/Constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch()
    const {searchedQuery} = useSelector(store => store.job)
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try{
            const res = await axios.get(`${JOBS_END_POINT_API}/get?keyword=${searchedQuery}`,{withCredentials:true});
            if(res.data.success){
                dispatch(setJobs(res.data.jobs))
            }
            }
            catch(error){
                console.error('Error fetching all jobs:', error)
            }
        }
        fetchAllJobs()
    },[])
}

export default useGetAllJobs