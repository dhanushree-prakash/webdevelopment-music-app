import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import {__AUTH} from "../backend/firebaseconfig";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "../helpers/Spinner";

const Register = () => {
  let [togglePassword, setTogglePassword] = useState(false);

  let [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  let [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  let navigate = useNavigate();
  let [isLoading, setisLoading] = useState(false);
  let { username, email, password, confirmpassword } = data;
  let handlechange = (e) => {
    let value = e.target.value;
    let key = e.target.name;
    setData({ ...data, [key]: value });
  };

  let handelsubmit = async (e) => {
    e.preventDefault();
    try {
      setisLoading(true);
      if (password !== confirmpassword) {
        toast.error("Password does not match");
        setData({ ...data, confirmpassword: "" });
        return;
      }
      let obj = await createUserWithEmailAndPassword(__AUTH, email, password);
      console.log(obj);
      let { user } = obj;
      console.log(user);
      await updateProfile(user, {
        displayName: username,
        photoURL:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX26Yrgn2Y3Jzt5Fsq2eFXyKHMIcpCjnWo1cgJyaXGknnIkeoutRiLm_kpgOIMbjsI-s4&usqp=CAU",
      });
      sendEmailVerification(user);
      toast("verification message sent");
      toast.success("user registered");
      navigate("/auth/Login");
       toast.success("Registration successful");
    } catch (error) {
      toast.error(error.message.slice(22, error.message.length - 2));
    } finally {
      setisLoading(false);
    }
  };

  return (
    <section className="h-[calc(100vh-70px)] bg-[#121212] flex justify-center items-center ">
      <div className=" w-[30%] bg-[#1A1A1A] rounded-lg shadow-2xl">
        <header className="text-center p-2 text-2xl text-[#FF007F] font-serif">
          Register
        </header>
        <main className="p-3">
          <form className="flex flex-col" onSubmit={handelsubmit}>
            <div>
              <label
                className="block text-md text-[#E0E0E0]"
                htmlFor="username"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handlechange}
                className="outline-none border border-[#BB86FC] bg-[#1A1A1A] text-white w-[100%] my-1 rounded-md p-2"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-md text-[#E0E0E0]" htmlFor="email">
                E-mail:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handlechange}
                className="outline-none border border-[#BB86FC] bg-[#1A1A1A] text-white w-[100%] my-1 rounded-md p-2"
                placeholder="Enter email"
              />
            </div>
            <div>
              <div className="relative">
                <label htmlFor="pass" className="block text-[#E0E0E0]">
                  Password
                </label>
                <input
                  id="pass"
                  name="password"
                  value={password}
                  onChange={handlechange}
                  placeholder="Enter password"
                  className="outline-none p-2 text-md border border-[#BB86FC] bg-[#1A1A1A] text-white rounded-md my-2 w-[100%]"
                  type={togglePassword ? "text" : "password"}
                />
                {togglePassword ? (
                  <FaEye
                    className="absolute top-10 right-3 text-[#BB86FC] cursor-pointer"
                    onClick={() => setTogglePassword(!togglePassword)}
                  />
                ) : (
                  <FaEyeSlash
                    className="absolute top-10 right-3 text-[#BB86FC] cursor-pointer"
                    onClick={() => setTogglePassword(!togglePassword)}
                  />
                )}
              </div>
            </div>
            <div>
              <div className="relative">
                <label htmlFor="passid" className="block text-[#E0E0E0]">
                  Confirm Password
                </label>
                <input
                  type={toggleConfirmPassword ? "text" : "password"}
                  id="passid"
                  name="confirmpassword"
                  value={confirmpassword}
                  onChange={handlechange}
                  placeholder="Confirm password"
                  className="outline-none p-2 text-md border border-[#BB86FC] bg-[#1A1A1A] text-white rounded-md my-2 w-[100%]"
                />
                {toggleConfirmPassword ? (
                  <FaEye
                    className="absolute top-10 right-3 text-[#BB86FC] cursor-pointer"
                    onClick={() =>
                      setToggleConfirmPassword(!toggleConfirmPassword)
                    }
                  />
                ) : (
                  <FaEyeSlash
                    className="absolute top-10 right-3 text-[#BB86FC] cursor-pointer"
                    onClick={() =>
                      setToggleConfirmPassword(!toggleConfirmPassword)
                    }
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 ">
              <button
                type="submit"
                className="w-full shadow-2xl my-4 rounded-md px-4 py-2 bg-[#FF007F] hover:bg-[#BB86FC] text-white cursor-pointer transition-all"
              >
                Submit
              </button>
            </div>

            <div className="mt-2 text-center text-[#E0E0E0]">
              <span>Already have an account?</span>
              <NavLink
                to="/auth/Login"
                className="text-[#FF007F] underline hover:text-[#BB86FC]"
              >
                Login
              </NavLink>
            </div>
          </form>
        </main>
      </div>
      {isLoading && <Spinner />}
    </section>
  );
};

export default Register;
