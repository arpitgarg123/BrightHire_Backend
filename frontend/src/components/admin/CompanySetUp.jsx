import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_END_POINT_API } from '@/utils/Constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetUp = () => {
    const params = useParams()
    useGetCompanyById(params.id)
    const [input,setInput] = useState({
        companyName: '',
        description : '',
        website: '',
        location: '',
        file : null,
    })
    const {singleCompany} = useSelector(store => store.company );

    const [loading,setLoading]= useState(false);
    const navigate = useNavigate()
    const handleInputChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value })
    }
    const handleFileUpload = (e) => {
        setInput({...input, file: e.target.files[0] })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('companyName', input.companyName);
        formData.append('description', input.description);
        formData.append('website', input.website);
        formData.append('location', input.location);
        if(input.file){
            formData.append('file', input.file);
        }
        try{
            setLoading(true);
             const res = await axios.put(`${COMPANY_END_POINT_API}/update/${params.id}`, formData,{
                headers: {
                    'Content-Type':'multipart/form-data'
                },
                withCredentials: true
             });
             if(res.data.success){
                 toast.success(res?.data?.message);
                 navigate(`/admin/companies`); 
             }
        }
        catch(error){
            console.error(error)
            toast.error(error?.response?.data?.message);
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(singleCompany){
            setInput({
                companyName: singleCompany.companyName || '',
                description : singleCompany.description || '',
                website: singleCompany.website || '',
                location: singleCompany.location || '',
                file : null,
            })
        }
        else{
            navigate(`/admin/companies`);
        }

    },[singleCompany])
  return (
    <div>
        <Navbar/>
        <div className='max-w-xl mx-auto my-10'>
            <form onSubmit={handleSubmit}>
                <div className='flex items-center gap-10'>
                <Button variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                    <ArrowLeft/>
                    <span>
                        back
                    </span>
                </Button>
                <h1 className='font-bold text-xl capitalize'>Company setup</h1>
                </div>
                <div className='grid grid-cols-2 gap-4 items-center my-10'>
                    <div>
                <Label>Company Name</Label>
                <Input
                type="text"
                name="companyName"
                placeholder="Enter your company name"
                value={input.companyName}
                onChange={handleInputChange}
                />
                </div>
                <div>
                    <Label>Company Description</Label>
                    <Input
                    type="text"
                    name="description"
                    placeholder="Enter your company description"
                    value={input.description}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <Label>Company Website</Label>
                    <Input
                    type="text"
                    name="website"
                    placeholder="Enter your company website"
                    value={input.website}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <Label>Company Location</Label>
                    <Input
                    type="text"
                    name="location"
                    placeholder="Enter your company location"
                    value={input.location}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <Label>Company Logo</Label>
                    <input type="file"
                     name="file"
                     accept="image/*"
                     onChange={handleFileUpload} />
                </div>
                    </div>
                    {
          loading ? <Button type="submit" className="w-full my-5"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> please wait</Button> :  <Button type="submit" className="w-full my-5">Update</Button>
        }
                   
            </form>

        </div>
    </div>
  )
}

export default CompanySetUp