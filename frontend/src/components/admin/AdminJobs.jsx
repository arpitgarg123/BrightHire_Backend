import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import JobsTable from './JobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
    useGetAllAdminJobs()
  const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() =>{
      dispatch(setSearchJobByText(searchTerm));
    },[searchTerm])
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between my-5'>
            <Input
            className="w-fit"
            placeholder="filter by name"
            onChange={(e)=>setSearchTerm(e.target.value)}
            />
            <Button onClick={()=> navigate("/admin/job/create")} >New Jobs</Button>
            </div>
            <JobsTable/>
        </div>
    </div>
  )
}

export default AdminJobs