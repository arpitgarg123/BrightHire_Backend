import React from 'react'
import {
Table,
TableBody,
TableCaption,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import store from '@/redux/store'

const ApplicationTable = () => {
  const {appliedJobs} = useSelector(store => store.applicant)
  return (
    <div>
        <Table>
  <TableCaption>A list of your applied jobs</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Date</TableHead>
      <TableHead>Job Role</TableHead>
      <TableHead>Company</TableHead>
      <TableHead className="text-right">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
   
    {
      appliedJobs?.length <=0 ? <span>you have not applied to any job yet</span> :  appliedJobs?.map((appliedJob, i) =>{
            return(
                <TableRow key={appliedJob?._id}>                  
                <TableCell className="font-medium">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedJob?.job?.title}</TableCell>
                <TableCell>{appliedJob?.job?.company?.companyName}</TableCell>
                <TableCell className="text-right">
                  <Badge className={
                    appliedJob?.status === "accepted" ? "bg-green-600" : appliedJob?.status === "rejected" ? "bg-red-600" : ""
                    }>
                  {
                    appliedJob?.status
                  }
                  </Badge></TableCell>
                </TableRow>
            )
        })
    }
 
  </TableBody>
</Table>
    </div>
  )
}

export default ApplicationTable