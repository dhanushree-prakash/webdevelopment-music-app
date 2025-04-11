import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'


const AdminLayout = () => {
  return (
    <div className="flex bg-[#1A1A1A] min-h-[calc(100vh-70px)] ">
       <AdminSidebar/>
        <Outlet/>
    </div>
  )
}

export default AdminLayout