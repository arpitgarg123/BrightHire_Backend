import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'

const AdminCompanies = () => {
  useGetAllCompanies()
  const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() =>{
      dispatch(setSearchCompanyByText(searchTerm));
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
            <Button onClick={()=> navigate("/admin/company/register")} >New Company</Button>
            </div>
            <CompaniesTable/>
        </div>
    </div>
  )
}

export default AdminCompanies