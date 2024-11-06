import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect( () =>{
    if(user && user.role === 'recruiter'){
      navigate("/admin/companies");
    }
  },[])
  useGetAllJobs();
  return (
    <div>
        <Navbar user={true}/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home