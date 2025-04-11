import React from 'react'
import NavBarContainer from '../Components/Navbar/NavBarContainer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <NavBarContainer/>
        <Outlet/>
    </div>
  )
}

export default Layout