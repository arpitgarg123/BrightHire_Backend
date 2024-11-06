import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    useGetAllCompanies()
    const {companies,searchCompanyBytext} = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate()
    useEffect(() =>{
        const filteredCompany = companies.length >= 0 && companies.filter((company) =>{
            if(!searchCompanyBytext){
                return true;
            }
            return company?.companyName?.toLowerCase().includes(searchCompanyBytext.toLowerCase())
        });
        setFilterCompany(filteredCompany)

    },[companies,searchCompanyBytext])
  return (
    <div>
        <Table>
            <TableCaption>
                A list of recent registered companies
            </TableCaption>
            <TableHeader>
                  <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className ="text-right">Action</TableHead>
                  </TableRow>
            </TableHeader>
            <TableBody>
                {
                    companies?.length <= 0 ? <span>You haven't registered any company yet.</span> : (
                        filterCompany?.map((company) =>{
                            return(
                                <tr key={company._id}>
                                <TableCell>
                    <Avatar>
                    <AvatarImage src={`${company?.logo}`}/>
                    </Avatar>
                </TableCell>
                <TableCell>{company?.companyName}</TableCell>
                <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                    <Popover>
                        <PopoverTrigger>
                            <MoreHorizontal/>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit">
                            <div onClick={()=>navigate(`/admin/company/${company._id}`)} className='flex items-center gap-2 cursor-pointer'>
                                <Edit2 className='w-4'/>
                                <span>Edit</span>
                            </div>
                        </PopoverContent>
                    </Popover>
                </TableCell>
                </tr>
                            )
                        })
                    )
                }
                
            </TableBody>
        </Table>
    </div>
  )
}

export default CompaniesTable