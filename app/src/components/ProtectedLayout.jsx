import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import Header from './Header'
// import Footer from './Footer'
const ProtectedLayout = () => {
  const token=localStorage.getItem("token");
  if(!token){
    return <Navigate to={"/"} />
  }
  return (
    <div className='flex flex-col h-screen ml-1 mr-1'>
      <Header />
      <div className='flex'>

        <div className='flex-1 pb-10 bg-rose-100 h-screen'>
          <Outlet/>
        </div>
        
      </div>
   
    </div>
  )
}

export default ProtectedLayout;

