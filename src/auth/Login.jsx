import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { __AUTH } from "../backend/firebaseconfig";
import Spinner from "../helpers/Spinner";
import { AuthContextAPI } from "../context/AuthContext";

const Login = () => {
  const [togglePassword, setTogglePassword] = useState(false);

  let [data, setData] = useState({
    email: "",
    password: "",
  });
  let { email, password } = data;

  let navigate = useNavigate();

  let {setAuthUser}=useContext(AuthContextAPI)
  //destructuring

  let handlechange = (e) => {
    let value = e.target.value;
    let key = e.target.name;
    setData({ ...data, [key]: value });
  };

  let [isLoading, setIsLoading] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //for loading the spinner
    console.log(data);
    try {
      let userCredential = await signInWithEmailAndPassword(
        __AUTH,
        email,
        password
      );
      // console.log(obj);
      let user = userCredential.user;
      console.log(user);
      if (user.emailVerified === true) {
        toast.success("login succesfull");
        setAuthUser(user)
        navigate("/");
      } else {
        toast.error("verify your mail");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="h-[calc(100vh-70px)] w-full bg-[#121212] flex justify-center items-center">
      <div className="p-4 w-[30%] rounded-md shadow-2xl bg-[#1A1A1A]">
        <header className="text-center text-2xl text-[#FF007F] font-serif">
          Login
        </header>
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
                value={email}
              />
            </div>
            <div className="relative">
              <label htmlFor="pass" className="block text-[#E0E0E0]">
                Password
              </label>
              <input
                id="pass"
                placeholder="Enter password"
                className="outline-none p-2 text-md border border-[#BB86FC] bg-[#1A1A1A] text-white rounded-md my-2 w-full"
                type={togglePassword ? "text" : "password"}
                onChange={handlechange}
                name="password"
                value={password}
              />
              {togglePassword ? (
                <FaEye
                  className="absolute top-10 right-3 cursor-pointer text-[#BB86FC]"
                  onClick={() => setTogglePassword(!togglePassword)}
                />
              ) : (
                <FaRegEyeSlash
                  className="absolute top-10 right-3 cursor-pointer text-[#BB86FC]"
                  onClick={() => setTogglePassword(!togglePassword)}
                />
              )}
            </div>

            <div className="text-center">
              <button className="h-10 bg-[#FF007F] text-white w-full rounded-md cursor-pointer hover:bg-[#BB86FC] transition-all">
                Login
              </button>
            </div>

            <div className="mt-2 text-center text-[#E0E0E0]">
              <span>New Here?</span>
              <br></br>
              <NavLink
                to="/auth/Register"
                className="text-[#FF007F] underline hover:text-[#BB86FC]"
              >
                Register
              </NavLink>{" "}
              to continue..
            </div>

            <div className="mb-2 text-center ">
              <NavLink
                to="/auth/forget-password"
                className="text-[#FF007F] underline hover:text-[#BB86FC]"
              >
                Forget password ?
              </NavLink>
            </div>
          </form>
        </main>
      </div>
      {isLoading && <Spinner />}
    </section>
  );
};

export default Login;
