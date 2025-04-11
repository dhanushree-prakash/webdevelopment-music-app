import React, { useState } from 'react'
import Spinner from '../helpers/Spinner'
import { NavLink,useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';
import { sendPasswordResetEmail } from 'firebase/auth';
import { __AUTH } from '../backend/firebaseconfig';
const ForgetPassword = () => {
    let[Email,setEmail]=useState("")
     let [isLoading, setIsLoading] = useState(false);
     let navigate = useNavigate();

    const handlechange=(e)=>{
        setEmail(e.target.value)
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
       try{ 
      await  sendPasswordResetEmail(__AUTH,Email)
      toast.success("Reset link sent to mail")
      navigate("/auth/Login")
    }catch(error){
        toast.success(error.message)
    }

        finally {
            setIsLoading(false);
          }
      };

return (
    <div>    
        <section className="h-[calc(100vh-70px)] w-full bg-[#121212] flex justify-center items-center">
            <div className="p-4 w-[30%] rounded-md shadow-2xl bg-[#1A1A1A]">
                <header className="text-center text-2xl text-[#FF007F] font-serif">Reset Password</header>
                <main className="p-2">
                    <form className="flex flex-col gap-3" onSubmit={handlesubmit}>
                        <div>
                            <label htmlFor="email" className="block text-[#E0E0E0]">
                                Email
                            </label>
                            <input
                                id="email"
                                placeholder="Enter email"
                                className="outline-none p-2 text-md border border-[#BB86FC] bg-[#1A1A1A] text-white w-full rounded-md my-2"
                                type="email"
                                onChange={handlechange}
                                name="email"
                                value={Email}
                            />
                        </div>

                        <div className="text-center">
                            <button className="h-10 bg-[#FF007F] text-white w-full rounded-md cursor-pointer hover:bg-[#BB86FC] transition-all">
                                Reset Password
                            </button>
                        </div>

                     
                        <div className="mt-1 text-center text-[#E0E0E0]">
                                <NavLink
                                    to="/auth/Login"
                                    className="bg-[#FF007F] text-white block h-10 rounded-md text-center hover:bg-[#BB86FC] transitiion-all leading-10">
                                    Cancel
                                </NavLink>
                            </div>
                    {/* navlink is inline so cannot give style so make it block */}
                    
                    </form>
                </main>
            </div>
            {isLoading && <Spinner/>}
        </section>
    </div>
)
}

export default ForgetPassword