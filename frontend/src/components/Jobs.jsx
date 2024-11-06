import { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import JobCard from './JobCard';
import { SpaceIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import { motion } from 'framer-motion';

const Jobs = () => {
  const {jobs,searchedQuery} = useSelector(store => store.job);
  const [filteredQuery ,setFilteredQuery] = useState(jobs);

  useEffect(() =>{
    if(searchedQuery){
      const filteredJob = jobs.filter((job) =>{ 
       return job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
       job?.company?.companyName?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
       job?.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
       job?.salary?.toString().includes(searchedQuery.toLowerCase()) ||
       job?.requirements?.join(',').toLowerCase().includes(searchedQuery.toLowerCase()) ||
       job?.jobtype?.toLowerCase().includes(searchedQuery.toLowerCase())
      })
      setFilteredQuery(filteredJob);
    }
    else{
      setFilteredQuery(jobs);
    }
  },[jobs,searchedQuery]);

  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto'>
          <div className='flex gap-5'>
            <div className='w-[20%]'>
          <FilterCard/>
            </div>
        {
          filteredQuery?.length  <= 0 ? <span>Jobs not found</span> : (
            <div className='flex-1 h-[80vh] overflow-y-auto pb-5'>
             <div className='grid grid-cols-3 gap-4'>
             {filteredQuery?.map((job,index) =>{
              return <motion.div 
              initial={{opacity:0,x :100}}
              animate={{opacity:1,x:0}}
              exit={{opacity: 0}}
              transition={{duration:0.3}}
              key={job?._id} ><JobCard job={job} /></motion.div>})}
             </div>
            </div>
          )
        }
          </div>
        </div>
    </div>
  )
}

export default Jobs