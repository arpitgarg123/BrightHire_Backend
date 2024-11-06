import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import AdminCompanies from './components/admin/AdminCompanies'
import RegisterCompany from './components/admin/RegisterCompany'
import CompanySetUp from './components/admin/CompanySetUp'
import AdminJobs from './components/admin/AdminJobs'
import PostJobs from './components/admin/PostJobs'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectRoute'
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
  path: '/login',
    element: <Login/>,
  },
  {
    path: '/signup',
    element: <Signup/>,
  },
  {
    path: '/jobs',
    element: <Jobs/>
  },
  {
 path :"/description/:id",
 element: <JobDescription/>,
  },
  {
    path: '/browse',
    element: <Browse/>,
  },
  {
    path : "/profile",
    element: <Profile/>,
  },
  // admin 
  {
    path : '/admin/companies',
    element:  <ProtectedRoute><AdminCompanies/></ProtectedRoute> ,
  },
  {
    path : "/admin/company/register",
    element :<ProtectedRoute><RegisterCompany/></ProtectedRoute> 
  },
{
    path : "/admin/company/:id",
  element : <ProtectedRoute><CompanySetUp/></ProtectedRoute>
},
{
  path : "/admin/jobs",
  element : <ProtectedRoute><AdminJobs/></ProtectedRoute>
},
{
  path : "/admin/job/create",
  element : <ProtectedRoute><PostJobs/></ProtectedRoute>
},
{
  path : "/admin/job/:id/applicant",
  element : <ProtectedRoute><Applicants/></ProtectedRoute>
}
])
const App = () => {
  return (
    <>
    <RouterProvider router={appRouter} />
    </>
  )
}

export default App