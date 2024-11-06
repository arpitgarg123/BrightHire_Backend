import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import JobCard from './JobCard';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs()
    const {jobs,searchedQuery} = useSelector(store => store.job);
    const dispatch = useDispatch()
    useEffect(() =>{
       return ()=>{
        dispatch(setSearchedQuery(""))
       }
    },[])
  return (
    <div>
        <Navbar/>
    <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-4'>search result ({jobs?.length})</h1>
        <div className='grid grid-cols-3 gap-4'>
        {
          jobs?.length <=0 ? <span>No job found</span> :  jobs?.map((job, index) => {
                return (
                    <JobCard key={job?._id} job={job} />
                )
            })
        }
        </div>
    </div>
    </div>
  )
}

export default Browse