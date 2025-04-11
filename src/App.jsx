import React from 'react'
// import NavBarContainer from './Components/Navbar/NavBarContainer'
import { RouterProvider } from 'react-router-dom'
import routes from '../src/routes/Routes' 
import {Toaster} from 'react-hot-toast'

const App = () => {
    return (
        <>
        <Toaster/>
        <RouterProvider router={routes}/>
        </>
    )
}

export default App