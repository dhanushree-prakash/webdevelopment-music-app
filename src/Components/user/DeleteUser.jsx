import { deleteUser } from 'firebase/auth'
import { deleteDoc, doc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { AuthContextAPI } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { __DB } from '../../backend/firebaseconfig'
import { MdOutlineDeleteSweep } from "react-icons/md";

const DeleteUser = () => {
  let [text, setText] = useState("")
  let { authUser } = useContext(AuthContextAPI)
  let navigate = useNavigate()

  let handleChange = (e) => {
    setText(e.target.value)
  }
  let handleSubmit = async (e) => {
    e.preventDefault()
    console.log(text.toLowerCase().trim());

    try {
      if (text.toLowerCase().trim() === "delete account") {
        let user_collection = doc(__DB, "user_profile", authUser?.uid)
        await deleteUser(authUser)
        await deleteDoc(user_collection)
        toast.success("Account deleted successfully")
        navigate("/auth/register")
      }

    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <section className='h-[100%] w-[100%] flex items-center justify-center bg-[#222222]'>
      <article className='min-h-[400px] w-[60%] bg-black rounded-xl p-4 '>
        <div className='flex flex-wrap items-center justify-center gap-3'><MdOutlineDeleteSweep className='text-2xl'/> <h2 className='text-center text-2xl text-gray-100 font-mono'>Delete Account</h2></div>
        
        <form className='mt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <h3 className='text-gray-100'>Are you sure you want to delete the account?</h3>
            <h3 className='text-gray-100'>If yes, enter "Delete account"</h3>
          </div>
          <input
            type='text'
            placeholder='delete account'
            className='outline-none w-full bg-gray-100 py-2 px-4 rounded-lg text-gray-900'
            name='text'
            onChange={handleChange}
          />
          <button className='py-2 rounded-lg cursor-pointer w-full mt-4  hover:bg-blue-500 bg-[#ff0a8d] text-gray-100'>Delete Account</button>
        </form>
      </article>
    </section>
  )
}

export default DeleteUser