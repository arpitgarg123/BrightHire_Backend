import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { CheckIcon, Contact, DownloadIcon, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import ApplicationTable from './ApplicationTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import store from '@/redux/store'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
  useGetAppliedJobs();
  const isResume = true;
  const [open,setOpen] = useState(false);
  const {user} = useSelector(store => store.auth);    
  return (
    <div>
      <Navbar/>
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-md'>
        <div className='flex justify-between'>
        <div className='flex items-center gap-4'>
   <Avatar className="h-24 w-24">
    <AvatarImage src={user?.profile?.image} alt="@shadcn" />
   </Avatar>
   <div>
   <h1 className='text-xl capitalize font-medium'>{user?.fullname}</h1>
   <p>{user?.profile?.bio}</p>
   </div>
        </div>
        <Button onClick={() => setOpen(true)}  className="text-right" variant="outline"><Pen/>Edit</Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail/>
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Contact/>
            <span>{user?.phonenumber}</span>
          </div>
        </div>
        <div className='my-5'>
          <h1>Skills</h1>
          <div className='flex items-center gap-2 my-2'>
          {
           user?.profile?.skills?.length !== 0 ? user?.profile?.skills?.map((skill, index) => (<Badge key={index} >{skill}</Badge>)) : <span>NA</span>
          }
              </div>
        </div>
        <div className='grid w-full max-x-sm items-center justify-start gap-1.5'>
            <Label className="text-md font-bold">Resume</Label>
            {
              isResume? (
                <a className="text-sm font-medium text-blue-500" target='blank' href={user?.profile?.resume}>{user?.profile?.resumeoriginalname}</a>
              ) : (
                <span>NA</span>
              )
            }
        </div>
      </div>
        <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
          <h1 className='font-bold text-lg my-5'>Applied job</h1>
          <ApplicationTable/>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile