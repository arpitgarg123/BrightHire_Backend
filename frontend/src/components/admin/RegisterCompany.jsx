import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { COMPANY_END_POINT_API } from '@/utils/Constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const RegisterCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const RegisterCompany = async () =>{
    try{
    const res = await axios.post(`${COMPANY_END_POINT_API}/register`,{companyName},{
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    })
    if(res.data.success){
      dispatch(setSingleCompany(res.data.company));
      toast.success('Company registered successfully')
      const companyId = res?.data?.company?._id 
      navigate(`/admin/company/${companyId}`);
    }
    }
    catch(error){
      toast.error('Failed to register company')
    }
  }
   return (
    <div>
      <Navbar/>
      <div className='max-w-4xl mx-auto'>
        <div className='my-10'>
        <h1 className='text-2xl font-bold mb-1 capitalize'>Your company name</h1>
        <p className='text-gray-600 text-sm'>
          Register your company here. This will help us connect with potential job seekers and help you build your profile.
        </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type='text'
          name='companyName'
          placeholder='Enter your company name'
          className='my-2'
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className='flex items-center gap-2 my-10'>
        <Button onClick={()=> navigate("/admin/companies")} variant="outline">Cancel</Button>
        <Button onClick={RegisterCompany} >Continue</Button>
        </div>
      </div>
    </div>
  )
}

export default RegisterCompany