import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_END_POINT_API } from '@/utils/Constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch()
useEffect(()=>{
    const fetchCompanyById = async () => {
        try{
            const res = await axios.get(`${COMPANY_END_POINT_API}/get/${companyId}`,{withCredentials:true});
            if(res.data.success){
                dispatch(setSingleCompany(res.data.company))
            }
        }
        catch(error){
            console.error(error)
            toast.error('Failed to fetch company details');
        }
    }
    fetchCompanyById()
},[companyId,dispatch])

}

export default useGetCompanyById