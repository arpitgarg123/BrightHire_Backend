import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const CategoryCarousel = () => {
    const Category = [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Mobile Developer",
        "Data Scientist",
        "Product Manager",
        "UX/UI Designer",
        "QA/Tester",
        "Project Manager",
        "Content Writer",
        "Marketing Specialist",
        "Finance Analyst",
        "Business Analyst",
        "Digital Marketer",
        "Social Media Manager",
        "Product Designer",
        "Software Engineer",
        "Cybersecurity Specialist",
    ]
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const searchJobHandler = (query)=>{
   dispatch(setSearchedQuery(query));
   navigate("/browse")
}
  return (
    <div>
        <Carousel className="w-full max-w-xl mx-auto my-20 max-sm:w-[30%]">
            <CarouselContent >
                    {Category.map((category, index) => ( 
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Button onClick={() => searchJobHandler(category)}
                     variant="outline" className="rounded-full">{category}</Button>
                </CarouselItem>
                    ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
    </div>
  )
}

export default CategoryCarousel