import React from "react";
import UserSideBar from "./UserSideBar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex bg-[#1A1A1A] h-[calc(100vh-70px)] ">
         <UserSideBar />
      
          <Outlet />
      
    </div>
  );
};

export default UserLayout;
