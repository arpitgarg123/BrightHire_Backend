import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import store from '@/redux/store'

import { useNavigate } from 'react-router-dom'

const JobsTable = () => {
 
    const {companies,searchCompanyBytext} = useSelector(store => store.company);
    const {AllAdminJobs,searchJobBytext} = useSelector(store => store.job);
    
    const [filterJobs, setFilterJobs] = useState(AllAdminJobs);
    const navigate = useNavigate()
    useEffect(() =>{
        const filteredJobs = AllAdminJobs.length >= 0 && AllAdminJobs.filter((job) =>{
            if(!searchJobBytext){
                return true;
            }
            return job?.company?.companyName?.toLowerCase().includes(searchJobBytext.toLowerCase()) || job?.title.toLowerCase().includes(searchJobBytext.toLowerCase()) 
        });
        setFilterJobs(filteredJobs)

    },[AllAdminJobs,searchJobBytext])
  return (
    <div>
        <Table>
            <TableCaption>
                A list of recent post jobs
            </TableCaption>
            <TableHeader>
                  <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className ="text-right">Action</TableHead>
                  </TableRow>
            </TableHeader>
            <TableBody>
                {
                    AllAdminJobs?.length <= 0 ? <span>You haven't post any job yet.</span> : (
                        filterJobs?.map((job) =>{
                            return(
                                <tr key={job._id}>
                                <TableCell>{job?.company?.companyName}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                    <Popover>
                        <PopoverTrigger>
                            <MoreHorizontal/>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit">
                            <div onClick={()=>navigate(`/job/get/${job._id}`)} className='flex items-center gap-2 cursor-pointer'>
                                <Edit2 className='w-4'/>
                                <span>Edit</span>
                            </div>
                            <div onClick={()=>navigate(`/admin/job/${job._id}/applicant`)} className='flex items-center gap-2 mt-2 cursor-pointer'>
                                <Eye className='w-4'/>
                                <span>Applicants</span>
                            </div>
                        </PopoverContent>
                    </Popover>
                </TableCell>
                </tr>
                            )
                        })
                    )
                }
                
            </TableBody>
        </Table>
    </div>
  )
}

export default JobsTable