import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Navbar from '../shared/Navbar'
import { RadioGroup} from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import {USER_END_POINT_API} from '@/utils/Constant'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/userSlice'
import { Loader2 } from 'lucide-react'
import store from '@/redux/store.js'

const Login = () => {
  const [input,setInput] = useState({
    email: "",
    password: '',
    role : "",
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {Loading,user} = useSelector(store => store.auth);
  const eventHandlers = (event) => {
    setInput({...input, [event.target.name]: event.target.value })
  }
  const submitHandler = async (e) => {
    e.preventDefault()
  
   try{
    dispatch(setLoading(true));
    const res = await axios.post(`${USER_END_POINT_API}/login`, input,{
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    if(res.data.success){
      dispatch(setUser(res.data.user));
      toast.success(res.data.message);
      navigate('/');
      setInput({email: '', password: '', role: ''})
    }
  
   }
   catch(error){
    toast.error(error.response?.data?.message || "Something went wrong");
   }
    finally{
      dispatch(setLoading(false));
    }
  }
  useEffect(()=>{
    if(user){
      navigate('/');
    }
  })
  return (
    <div>
      <Navbar/>
     <div className='flex items-center justify-center max-w-7xl mx-auto'>
     <form onSubmit={submitHandler} className='w-1/2 border border-grey-200 p-4 rounded-md my-10'>
      <h1 className='text-xl font-bold mb-5'>Login</h1>
        <div className='my-2'>
          <Label>Email</Label>
          <Input
          type="email"
          name="email"
          value={input.email}
          onChange={eventHandlers}
          placeholder="Enter your email"       
          />
        </div>
        <div className='my-2'>
          <Label>Password</Label>
          <Input
          type="password"
          name="password"
          value={input.password}
          onChange={eventHandlers}
          placeholder="Enter your email"       
          />
        </div>
        <div className='my-2 flex items-center justify-between mt-4'>
        <RadioGroup className="flex items-center gap-6">
  <div className="flex items-center space-x-2">
    <Input type="radio"
     name="role" 
     value="student"
     checked={input.role === "student"}
     onChange={eventHandlers}
      className="cursor-pointer" />
    <Label htmlFor="option-one">Student</Label>
  </div>
  <div className="flex items-center space-x-2">
  <Input type="radio"
   name="role"
    value="recruiter" 
    checked={input.role === "recruiter"}
    onChange={eventHandlers}
    className="cursor-pointer" />
    <Label htmlFor="option-two">Recruiter</Label>
  </div>
</RadioGroup>
        </div>
        {
          Loading ? <Button type="submit" className="w-full my-5"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> please wait</Button> :  <Button type="submit" className="w-full my-5">Login</Button>
        }
       
        <span className='text-sm'>Dont't have an account? <Link to="/signup" className='text-blue-600'>Sign up</Link></span>
      </form>
     </div>
    </div>
  )
}
export default Login;