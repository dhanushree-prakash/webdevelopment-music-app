import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContextAPI } from '../../context/UserContext';
import { AuthContextAPI } from '../../Context/AuthContext';
import { GoInfo } from "react-icons/go";
const UserAccount = () => {
  let { authUser } = useContext(AuthContextAPI);
  let { userProfile } = useContext(UserContextAPI);

  return (
    <section className='h-[100%] w-[100%] flex items-center bg-[#222222] justify-center '>
      <article className='min-h-[300px] w-[40%] bg-[#1A1A1A] rounded-xl p-4 shadow-lg'>
        <header className='h-[110px] w-[100%] bg-[#ff0a8d] rounded-t-xl flex flex-col items-center'>
          <img
            src={authUser?.photoURL}
            className='h-25 w-25 rounded-full -mt-16'
            alt="profile"
          />
          <h2 className='capitalize text-xl text-white'>{authUser?.displayName}</h2>
          <p className='text-xl text-gray-300'>{authUser?.email}</p>
        </header>
        {userProfile ? (
          <div>
            <div className='flex flex-wrap'>  <GoInfo className='mt-3 text-white' /><h2 className='text-[#BB86FC] font-mono mt-1 font-semibold ml-2 text-2xl'>Personal Info</h2></div>
            <article className='flex flex-wrap gap-4 justify-between mt-2'>
              <div className='h-300px w-[48%] bg-[#000000] rounded-lg p-3 flex flex-col '>
                <h3 className='text-slate-400 '>Phone Number</h3>
                <p className='text-gray-300'>{userProfile?.phoneno}</p>
              </div>
              <div className='h-300px w-[48%] bg-[#000000] rounded-xl p-4 flex flex-col '>
                <h3 className='text-slate-400'>Date Of Birth</h3>
                <p className='text-gray-300'>{userProfile?.dateofbirth}</p>
              </div>
              <div className='h-300px w-[48%] bg-[#000000] rounded-xl p-4 flex flex-col '>
                <h3 className='text-slate-400'>Languages</h3>
                <p className='text-gray-300'>{userProfile?.language}</p>
              </div>
              <div className='h-300px w-[48%] bg-[#000000] rounded-xl p-4 flex flex-col '>
                <h3 className='text-slate-400'>Gender</h3>
                <p className='text-gray-300'>{userProfile?.gender}</p>
              </div>
              <div className='h-300px w-[48%] bg-[#000000] rounded-xl p-4 flex flex-col '>
                <h3 className='text-slate-400'>Address</h3>
                <p className='text-gray-300'>{userProfile?.address}</p>
              </div>
            </article>
            
          </div>
        ) : (
          <div className='h-[150px] w-[100%] flex items-center justify-center flex-col gap-4'>
            <h2 className='text-lg text-gray-300'>User Data Not Found</h2>
            <NavLink
              to="/user-profile/update-profile"
              className="py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-800 text-white"
            >
              Add User Data
            </NavLink>
          </div>
        )}
      </article>
    </section>
  );
};

export default UserAccount;



