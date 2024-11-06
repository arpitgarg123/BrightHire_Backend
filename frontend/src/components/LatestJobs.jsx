import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import store from '@/redux/store'

const LatestJobs = () => {
  const {jobs} = useSelector(store => store.job)
  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & top </span>jobs openings</h1>
       <div className='grid grid-cols-3 gap-4 my-20'>
       {
      jobs.length <= 0 ? <span>no job available</span> : jobs.slice(0,6).map((job,index) =><LatestJobCards key={job?._id} job={job}/>) 
      }
       </div>
    </div>
  )
}

export default LatestJobs