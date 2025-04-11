import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { ImFilePicture } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { TbLockPassword } from "react-icons/tb";

const UserSideBar = () => {
  return (
    <div className="h-full w-[20%] bg-[#191818] px-6 py-10 shadow-lg shrink-0">
      <ul className="space-y-4">
        <li>
          <NavLink
            to=""
            end //Changes the matching logic for the active and pending states to only match to the "end" of the NavLinkProps.to. If the URL is longer, it will no longer be considered active.
            className={({ isActive }) =>
              `py-3 px-4 flex items-center gap-2 w-full rounded-lg transition-all ${
                isActive
                  ? "bg-[#FF1493] text-white shadow-lg"
                  : "text-gray-300 hover:bg-[#FF1493]/30 hover:text-white"
              }`
            }
          >
            <MdOutlineSwitchAccount /> My Account
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-profile/update-picture"
            className={({ isActive }) =>
              `py-3 px-4 flex items-center gap-2 w-full rounded-lg transition-all ${
                isActive
                  ? "bg-[#FF1493] text-white shadow-lg"
                  : "text-gray-300 hover:bg-[#FF1493]/30 hover:text-white"
              }`
            }
          >
            <ImFilePicture /> Update Picture
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-profile/update-profile"
            className={({ isActive }) =>
              `py-3 px-4 flex items-center gap-2 w-full rounded-lg transition-all  ${
                isActive
                  ? "bg-[#FF1493] text-white shadow-lg"
                  : "text-gray-300 hover:bg-[#FF1493]/30 hover:text-white"
              }`
            }
          >
            <CgProfile /> Update Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-profile/update-password"
            className={({ isActive }) =>
              `py-3 px-4 flex items-center gap-2 w-full rounded-lg transition-all ${
                isActive
                  ? "bg-[#FF1493] text-white shadow-lg"
                  : "text-gray-300 hover:bg-[#FF1493]/30 hover:text-white"
              }`
            }
          >
            <TbLockPassword /> Update Password
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-profile/delete-user"
            className={({ isActive }) =>
              `py-3 px-4 flex items-center gap-2 w-full rounded-lg transition-all ${
                isActive
                  ? "bg-[#FF1493] text-white shadow-lg"
                  : "text-gray-300 hover:bg-[#FF1493]/30 hover:text-white"
              }`
            }
          >
            <TbLockPassword /> Delete User
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserSideBar;
