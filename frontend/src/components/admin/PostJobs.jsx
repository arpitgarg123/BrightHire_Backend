import{ useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { toast } from 'sonner'
import axios from 'axios'
import { JOBS_END_POINT_API } from '@/utils/Constant'
import { useNavigate } from 'react-router-dom'

const PostJobs = () => {
    const [input,setInput] = useState({
        title : "",
        description: "",
        requirements : "",
        jobtype : "",
        salary: "",
        location: "",
        company: "",
        experience: "",
        position : 0,

    })
    const [loading,setLoading] = useState(false);
    const {companies} = useSelector(store => store.company);
    const navigate = useNavigate()
    
    const handleInputChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }
    const handleSelectChange = (value) => {
        
        const selectedCompany = companies.find((company) => company.companyName.toLowerCase() === value?.toLowerCase());
        setInput({...input, company: selectedCompany?._id})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Send the data to your API endpoint here
        
        const formData = new FormData();
        formData.append('title', input.title);
        formData.append('description', input.description);
        formData.append('requirements', input.requirements);
        formData.append('jobtype', input.jobtype);
        formData.append('salary', input.salary);
        formData.append('location', input.location);
        formData.append('company', input.company);
        formData.append('experience', input.experience);
        formData.append('position', input.position);
        try{
            setLoading(true)
            const res = await axios.post(`${JOBS_END_POINT_API}/post`, formData,{
                headers: {
                    'Content-Type':'application/json'
                },
                withCredentials: true
            });
            if(res.data.success){
                toast.success('Job posted successfully')
                navigate(`/admin/jobs`);
            }
        }
        catch(error){
            console.error(error);
            toast.error(error?.response?.data?.message)
        }
        finally{
            setLoading(false)
        }
    }
  return (
    <div>
        <Navbar/>
        <div className='w-screen flex items-center justify-center  my-5'>
         <form onSubmit={handleSubmit} className='p-8 max-w-4xl border border-gray-200 shadow-md rounded-md'>
            <div className='grid grid-cols-2 gap-2'>
            <div>
                <Label>Title</Label>
                <Input
                type="text"
                placeholder="Enter title"
                name = "title"
                value={input.title}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"

                />
            </div>
            <div>
                <Label>Description</Label>
                <Input
                type="text"
                placeholder="Enter description"
                name = "description"
                value={input.description}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
                <Label>Requirements</Label>
                <Input
                type="text"
                placeholder="Enter requirements"
                name = "requirements"
                value={input.requirements}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
                <Label>Salary</Label>
                <Input
                type="text"
                placeholder="Enter salary"
                name = "salary"
                value={input.salary}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
                <Label>Location</Label>
                <Input
                type="text"
                placeholder="Enter location"
                name = "location"
                value={input.location}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
                <Label>Experience</Label>
                <Input
                type="number"
                placeholder="Enter experience"
                name = "experience"
                value={input.experience}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
                <Label>No. of Position</Label>
                <Input
                type="number"
                placeholder="Enter position"
                name = "position"
                value={input.position}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
                <Label>Job Type</Label>
                <Input
                type="text"
                placeholder="type"
                name = "jobtype"
                value={input.jobtype}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            </div>
            <div className='w-full my-4'>
            {
                companies?.length > 0 && (
                    <Select
                    onValueChange={handleSelectChange}
                    >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="select a Company" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                   {
                    companies?.map((company) =>{
                        return <SelectItem key={company?._id} value={company?.companyName}>{company?.companyName}</SelectItem>
                    })
                   }
                   </SelectGroup>
                    </SelectContent>
                  </Select>
                )
            }
            </div>
            {
          loading ? <Button type="submit" className="w-full my-5"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> please wait</Button> :  <Button type="submit" className="w-full my-5">Post New Job</Button>
        }
            {
         companies?.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*please register a commpany first, before  posting a job</p>
            }
            </form>
        </div>

    </div>
  )
}

export default PostJobs