import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`description/${job?._id}`)} className='p-5 rounded-md shadow-lg bg-white border-gray-100 cursor-pointer'>
        <div>
            <h1 className='text-lg font-medium'>{job?.company?.companyName}</h1>
            <p className='text-sm text-gray-500 capitalize'>{job?.location}</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-600'> {job?.description?.split(" ").slice(0, 20).join(" ") +
            (job?.description?.split(" ").length > 20 ? "..." : "")}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} positions</Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobtype}</Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">{job.salary}LPA</Badge>
        </div>
    </div>
  )
}

export default LatestJobCards