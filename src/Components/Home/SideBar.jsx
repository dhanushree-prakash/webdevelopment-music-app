import React from 'react'
import { GiMusicalNotes } from "react-icons/gi";
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className="h-[calc(100vh-70px)] w-[20%] bg-[#0e0e0e] px-6 py-10 sticky top-[70px] shadow-lg shrink-0">
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `py-3 px-4 flex items-center gap-5 w-full rounded-lg transition-all ${
                isActive
                  ? "bg-[#FF1493] text-white shadow-lg"
                  : "text-gray-300 hover:bg-[#FF1493]/30 hover:text-white "
              }`
            }
          >
            <GiMusicalNotes className='font-bold text-white  text-xl mt-1 ' /> Dashboard
          </NavLink>
        </li>
        
      </ul>
    </div>
  )
}

export default SideBar