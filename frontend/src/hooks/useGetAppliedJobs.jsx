import { setAppliedJobs } from "@/redux/applicantSlice";
import { APPLICANT_END_POINT_API } from "@/utils/Constant";
import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    useEffect(() =>{
        const fetchAppliedJobs = async () =>{
                 try{
                   const res = await  axios.get(`${APPLICANT_END_POINT_API}/get`,{
                     withCredentials: true,
                   })
                   if(res.data.success){
                     dispatch(setAppliedJobs(res.data.applications));
                   }
                 }
                 catch(error){
                     console.error(error);
                 }
        }
        fetchAppliedJobs();
    },[]);
}

export default useGetAppliedJobs