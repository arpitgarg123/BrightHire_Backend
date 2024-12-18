import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage} from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { LogOut, MenuIcon, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_END_POINT_API } from '@/utils/Constant'
import { setUser } from '@/redux/userSlice'
import { Input } from "@/components/ui/input"
import { Label } from '../ui/label'


const Navbar = () => {
  const {user } = useSelector(store => store.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = async (e) => {
   try{
     const res = await axios.get(`${USER_END_POINT_API}/logout`,{withCredentials:true});
     if(res.data.success){
       dispatch(setUser(null));
       navigate("/")
       toast.success(res.data.message);
     }
   }
   catch(err){
     console.error(err)
     toast.error(err.response.data.message)
   }
  }
  return (
    <div className='w-full bg-white py-10 max-w-7xl mx-auto  flex items-end justify-between'>
      <div className='hidden md:flex items-center justify-between w-full'>
      <div className='flex items-center justify-between' >
      <h1 className='text-2xl font-bold'>Bright<span className='text-[#F83002]'>Hire</span> </h1>
      </div>
      <div className='flex items-center gap-12'>
        <ul className='flex font-medium gap-5 items-center'>
          {
            user && user.role === "recruiter" ? (
              <>
              <li>      <NavLink
              style={(e)=>e.isActive ? {textDecoration : "underline"} : {}}
              className={(e)=>(e.isActive? "text-red-900" : "")}
              to="/admin/companies">Companies</NavLink></li>
                <li>      <NavLink
              style={(e)=>e.isActive ? {textDecoration : "underline"} : {}}
              className={(e)=>(
                e.isActive? "text-red-900" : ""
              )}
              to="/admin/jobs">Jobs</NavLink></li>
                   </>
            ) : (
              <>
              <li>      <NavLink
              style={(e)=>e.isActive ? {textDecoration : "underline"} : {}}
              className={(e)=>(e.isActive? "text-red-900" : "")}
              to="/">Home</NavLink></li>
                <li>      <NavLink
              style={(e)=>e.isActive ? {textDecoration : "underline"} : {}}
              className={(e)=>(
                e.isActive? "text-red-900" : ""
              )}
              to="/jobs">Jobs</NavLink></li>
                <li>      <NavLink
              style={(e)=>e.isActive ? {textDecoration : "underline"} : {}}
              className={(e)=>(
                e.isActive? "text-red-900" : ""
              )}
              to="/browse">Browse</NavLink></li>
            </>
            )
          }
     
        </ul>
        {
          !user ? (
            <div className='flex gap-2 items-center'>
              <Link to="/Login"><Button variant="outline">Login</Button></Link>
          <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#572e9d]" >Sign up</Button></Link>
          
            </div>
          ) : (
        <Popover>
          <PopoverTrigger>
          <Avatar className="cursor-pointer">
      <AvatarImage src={user?.profile?.image}  alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className='flex gap-5 items-center'>
            <Avatar className="cursor-pointer">
      <AvatarImage src={user?.profile?.image} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <div>
      <h2 className='font-semibold'>{user?.fullname}</h2>
      <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
    </div>
            </div>
            <div className='flex flex-col mt-5'>
              {
                user && user.role === "student" && (
                  <div className='flex items-center'>
                  <User2 className='w-5' />
                  <Button variant="link" ><Link to="/profile">view profile</Link> </Button>
                </div>
                )
              }
              <div className='flex items-center ml-1'>
                <LogOut className='w-4 text-red-500'/>
                <Button onClick={logoutHandler} variant="link" className="text-red-500">Logout</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
          )
        }
      </div>
      </div>
     
      {
        <div className='flex md:hidden items-center justify-between h-full w-full px-4'> 
                <h1 className='text-xl font-bold'>Bright<span className='text-[#F83002]'>Hire</span> </h1>
          <MobileNav  user={user} logoutHandler={logoutHandler}  />
          </div>

      }
    </div>

  )
}

export default Navbar;


const MobileNav = ( {user, logoutHandler }) => {
  return (
    <div className={"flex items-center gap-5"}>
         {
        !user ? (
          <div className='flex gap-2 items-center'>
            <Link to="/Login"><Button variant="outline">Login</Button></Link>
          </div>
        ) : (
      <Popover>
        <PopoverTrigger>
        <Avatar className="cursor-pointer">
    <AvatarImage src={user?.profile?.image}  alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className='flex gap-5 items-center'>
          <Avatar className="cursor-pointer">
    <AvatarImage src={user?.profile?.image} alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <div>
    <h2 className='font-semibold'>{user?.fullname}</h2>
    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
  </div>
          </div>
          <div className='flex flex-col mt-5'>
            {
              user && user.role === "student" && (
                <div className='flex items-center'>
                <User2 className='w-5' />
                <Button variant="link" ><Link to="/profile">view profile</Link> </Button>
              </div>
              )
            }
            <div className='flex items-center ml-1'>
              <LogOut className='w-4 text-red-500'/>
              <Button onClick={logoutHandler} variant="link" className="text-red-500">Logout</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
        )
      }
    <Popover>
    <PopoverTrigger>
      <MenuIcon/>
    </PopoverTrigger>
    <PopoverContent>
    <ul className='flex font-medium gap-5 flex-col'>
          {
            user && user.role === "recruiter" ? (
              <>
              <li>      <NavLink
              style={(e)=>e.isActive ? {textDecoration : "underline"} : {}}
              className={(e)=>(e.isActive? "text-red-900" : "")}
              to="/admin/companies">Companies</NavLink></li>
                <li>      <NavLink
              style={(e)=>e.isActive ? {textDecoration : "underline"} : {}}
              className={(e)=>(
                e.isActive? "text-red-900" : ""
              )}
              to="/admin/jobs">Jobs</NavLink></li>
                   </>
            ) : (
              <>
              <li>      <NavLink
              style={(e)=>e.isActive ? {textDecoration : "underline"} : {}}
              className={(e)=>(e.isActive? "text-red-900" : "")}
              to="/">Home</NavLink></li>
                <li>      <NavLink
              style={(e)=>e.isActive ? {textDecoration : "underline"} : {}}
              className={(e)=>(
                e.isActive? "text-red-900" : ""
              )}
              to="/jobs">Jobs</NavLink></li>
                <li>      <NavLink
              style={(e)=>e.isActive ? {textDecoration : "underline"} : {}}
              className={(e)=>(
                e.isActive? "text-red-900" : ""
              )}
              to="/browse">Browse</NavLink></li>
            </>
            )
          }
     
        </ul>
    </PopoverContent>
  </Popover>
   
     </div>
  
  )
}