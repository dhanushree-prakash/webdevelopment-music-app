import React from 'react'
import { NavLink } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { BsFillFileEarmarkMusicFill } from "react-icons/bs";


const AdminSidebar = () => {
  return (
    <div className="h-[calc(100vh-70px)] w-[20%] bg-[#0e0e0e] px-6 py-10 sticky top-[70px] shadow-lg shrink-0">
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `py-3 px-4 flex items-center gap-2 w-full rounded-lg transition-all ${
                isActive
                  ? "bg-[#FF1493] text-white shadow-lg"
                  : "text-gray-300 hover:bg-[#FF1493]/30 hover:text-white"
              }`
            }
          >
            <MdDashboardCustomize /> Admin Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/add-album"
            className={({ isActive }) =>
              `py-3 px-4 flex items-center gap-2 w-full rounded-lg transition-all ${
                isActive
                  ? "bg-[#FF1493] text-white shadow-lg"
                  : "text-gray-300 hover:bg-[#FF1493]/30 hover:text-white"
              }`
            }
          >
            <BsFillFileEarmarkMusicFill /> Add albums
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar