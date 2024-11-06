import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { APPLICANT_END_POINT_API } from "@/utils/Constant";
import { toast } from "sonner";
import axios from "axios";

const shortListedStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  const {applicants} = useSelector(store => store.applicant)
  const statusHandler = async (status,id)=>{
    try{     
      const res = await axios.post(`${APPLICANT_END_POINT_API}/status/${id}/update`,{status},{
        withCredentials: true
      })
      if(res.data.success){
        toast.success(res.data.message)
      }

    }
    catch(error){
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <div>
      <Table>
        <TableCaption>A list of Applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact No.</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            applicants && applicants?.application?.map((applicant) =>{
              return(
                <TableRow>
                <TableCell>{applicant?.applicantId?.fullname}</TableCell>
                <TableCell>{applicant?.applicantId?.email}</TableCell>
                <TableCell>{applicant?.applicantId?.phonenumber}</TableCell>
                <TableCell className="cursor-pointer text-blue-600"><a target="blank" href={applicant?.applicantId?.profile?.resume}>{applicant?.applicantId?.profile?.resumeoriginalname || <span className="text-black">NA</span> }</a></TableCell>
                <TableCell>{applicant?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal/>
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                    {shortListedStatus.map((status, index) => {
                    return <div key={index}>
                      <Button
                      onClick={()=>statusHandler(status, applicant?._id)}
                        className={` w-full text-[#${index % 2 === 0? "4CAF50" : "F44336"}] text-white px-4 py-2 rounded-md ${status === "Accepted"? "bg-green-500" : "bg-red-500"} hover:bg-[#${index % 2 === 0? "4CAF50" : "F44336"}] mb-2 hover:text-white`}
                      >
                        {
                          status === "Accepted" ? "Accept" : "Reject"
                        }
                      </Button>
      
                    </div>;
                  })}
                    </PopoverContent>
                  </Popover>
    
                </TableCell>
              </TableRow>
              )
            })
          }
        
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
