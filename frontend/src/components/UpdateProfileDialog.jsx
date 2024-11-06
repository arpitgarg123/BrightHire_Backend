    import {
        Dialog,
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
    } from "@/components/ui/dialog"
    import { Label } from "./ui/label"
    import { Input } from "./ui/input"
    import { useState } from "react"
    import { Button } from "./ui/button"
    import { Loader2 } from "lucide-react"
    import { useDispatch, useSelector } from "react-redux"
    import axios from "axios"
    import { USER_END_POINT_API } from "@/utils/Constant"
    import { toast } from "sonner"
    import { setUser } from "@/redux/userSlice"
    import store from "@/redux/store"

    const UpdateProfileDialog = ({open,setOpen}) => {
        const [loading,setLoading] = useState(false);
        const {user} = useSelector(store => store.auth);

        const dispatch = useDispatch()
        const [input, setInput] = useState({
            fullname : user?.fullname || "",
            email : user?.email || "",
            phonenumber : user?.phonenumber || "",
            bio : user?.profile?.bio || "",
            skills : user?.profile?.skills?.map(skill => skill) || "",
            file : user?.profile?.resume || ""
        })
        const eventHandlers = (event) => {
            setInput({...input, [event.target.name]: event.target.value })
        }
        const fileEventHandlers = (event) => {
            setInput({...input, file: event.target.files?.[0]})
        }
        const submitHandler =async (e)=>{
            e.preventDefault()
                        
            const formData =  new FormData();
            formData.append('fullname', input.fullname);
            formData.append('email', input.email);
            formData.append('phonenumber', input.phonenumber);
            formData.append('bio', input.bio);
            formData.append('skills', input.skills);
            if(input.file){
                formData.append('file', input.file);
            }
            try{
                setLoading(true)
                const res = await axios.post(`${USER_END_POINT_API}/profile/update`, formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                })
                if(res.data.success){
                    dispatch(setUser(res.data.user));
                    toast.success(res.data.message);
                    
                }
    
            } 
            catch(error){
                toast.error(error.response?.data?.message)
            }
            finally{
                setLoading(false)
            }
            setOpen(false);
            
        }
    return (
        <div>
            <Dialog open={open}>
    <DialogTrigger>Open</DialogTrigger>
    <DialogContent className="sm:max-w-[425px]" onInteractOutside={()=> setOpen(false)}>
        <DialogHeader>
        <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler} >
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input
                    type="text"
                    name="fullname"
                    id="name"
                    value={input?.fullname}
                    onChange={eventHandlers}
                    className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">Email</Label>
                    <Input
                    type="email"
                    name="email"
                    id="email"
                    value={input?.email}
                    onChange={eventHandlers}
                    className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">Bio</Label>
                    <Input
                    type="text"
                    name="bio"
                    id="bio"
                    value={input?.bio}
                    onChange={eventHandlers}
                    className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">Number</Label>
                    <Input
                    type="text"
                    name="phonenumber"
                    id="phonenumber"
                    value={input?.phonenumber}
                    onChange={eventHandlers}
                    className="col-span-3" />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="skills" className="text-right">Skill</Label>
                    <Input
                    type="text"
                    name="skills"
                    id="skills"
                    value={input?.skills}
                    onChange={eventHandlers}
                    className="col-span-3" />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="file" className="text-right">Resume</Label>
                    <Input
                    type="file"
                    name="file"
                    id="file"
                    accept="application/pdf"
                    onChange={fileEventHandlers}
                    className="col-span-3" />
                </div>
            </div>
            <DialogFooter>
            {
            loading ? <Button type="submit" className="w-full my-5"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> please wait</Button> :  <Button type="submit" className="w-full my-5">Update</Button>
            }
        
            </DialogFooter>
        </form>
    </DialogContent>
    </Dialog>

        </div>
    )
    }

    export default UpdateProfileDialog