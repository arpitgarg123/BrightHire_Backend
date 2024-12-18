import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query,setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const searchJobHandler = ()=>{
 dispatch(setSearchedQuery(query));
 navigate("/browse")
  }
  return (
    <div className='text-center max:sm:px-5'>
<div className='flex flex-col gap-5 my-10'> 
<span className='mx-auto text-[#F83002] font-medium bg-gray-100 py-2 px-4 rounded-full capitalize'>no. 1 job hunt website</span>
<h1 className='text-5xl font-bold mt-10'>Explore, Apply & <br /> get your <span className='text-[#6A38C2]'>dream job</span></h1>
<p>A gateway to your future career, bridging talent and opportunity in one platform.</p>
<div className='flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto overflow-hidden max-sm:w-full'>
  <input
   type="text"
   placeholder='Find your dream jobs'
   onChange={(e) => setQuery(e.target.value)}
   className='outline-none border-none w-full py-2 px-4'
    />
    <Button onClick={searchJobHandler} className="rounded-r-full">
      <Search className='w-5 h-5'/>
      </Button>
</div>
</div>
    </div>
  )
}

export default HeroSection