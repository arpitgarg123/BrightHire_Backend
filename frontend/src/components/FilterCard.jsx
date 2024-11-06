import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const FilterCard = () => {
  const filterData = [
    {
      type : "Location",
      options : ["Delhi","mp","Lucknow","mumbai"]
    },
    {
      type : "Job Type",
      options : ["Full-Time", "Part-Time", "Contract", "Internship","Remote"]
    },
    {
      type : "Job Role",
      options : ["Frontend Developer", "Backend developer", "Project Manager", "Product Manager", " UX/UI Designer", "Marketing Specialist", "Finance Manager", "Other"]
    },
    {
      type : "Salary Range",
      options : ["0 - 3 LPA", "5 LPA - 10 LPA", "20 LPA - 30 LPA"]
    },
    {
      type : "Experience",
      options : ["0 - 1 Year", "1 - 3 Years", "3 - 5 Years", "5+ Years"]
    },
    {
      type : "Company Size",
      options : ["1 - 50 Employees", "51 - 200 Employees", "201 - 500 Employees", "501+ Employees"]
    },
    {
      type : "Job Industry",
      options : ["Finance", "IT", "Marketing", "Healthcare", "Sales", "Engineering", "Education", "Other"]
    },
    {
      type : "Company Type",
      options : ["Public", "Private", "Government", "Non-Profit"]
    }
  ]
  const [selected , setSelected] = useState("");
  const dispatch = useDispatch()
  const handleSelect = (value) => {
    setSelected(value);
  }
  useEffect(() => {    
    dispatch(setSearchedQuery(selected));
  },[selected])
  return (
    <div className='h-[80vh] overflow-y-auto w-full bg-white p-3  rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup value={selected} onValueChange={handleSelect}>
        {
          filterData.map((data, index) =>(
            <div key={index}>
              <h3 className='font-bold text-lg'>{data.type}</h3>
              {
                data.options.map((option, idx) => {
                const itemId = `id${index} - ${idx}`
                  return (
                  <div className='flex items-center space-x-2 mt-2' key={idx}>
                    <RadioGroupItem value={option} id={itemId}/>
                    <Label htmlFor={itemId}>{option}</Label>
                  </div>
                )})
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard