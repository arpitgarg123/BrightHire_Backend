import { setCompanies } from '@/redux/companySlice';
import { COMPANY_END_POINT_API } from '@/utils/Constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner';

const useGetAllCompanies = () => {
const dispatch = useDispatch();

useEffect(() => {
    const fetchAllCompanies = async () => {
        try {
            const res = await axios.get(`${COMPANY_END_POINT_API}/get`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setCompanies(res.data.companies));
            }
        } catch (error) {
            toast.error('Failed to fetch companies');
        }

    }
    fetchAllCompanies();
},[dispatch])

}

export default useGetAllCompanies