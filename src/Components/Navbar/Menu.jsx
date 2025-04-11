import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContextAPI } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { __AUTH } from "../../backend/firebaseconfig";
import { FiLogOut } from "react-icons/fi";
import Spinner from "../../helpers/Spinner";
import { UserContextAPI } from "../../context/UserContext";


const Menu = () => {
  let {authUser} = useContext(AuthContextAPI);
  let { userProfile, isLoading } = useContext(UserContextAPI);
  let navigate = useNavigate();
 
  //  console.log(userProfile.role);

 
  const logout = async () => {
    try {
      await signOut(__AUTH);
      toast.success("Logged out successfully!");
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <aside>
      <ul className="flex gap-3 font-semibold items-center">
      {userProfile?.role ==="admin" && authUser && (
  <li>
    <NavLink
      to="/admin"
      className={({ isActive }) =>
        `hover:bg-[#BB86FC] py-2 px-4 rounded-lg cursor-pointer ${
          isActive ? "bg-[#FF007F]" : ""
        }`
      }
    >
      Admin
    </NavLink>
  </li>
)}

        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:bg-[#BB86FC] py-2 px-4 rounded-lg cursor-pointer ${
                isActive ? "bg-[#FF007F]" : ""
              }`
            }
          >
            Home
          </NavLink>
        </li>

        {authUser ? (
          <>
            <li>
              <button onClick={logout} className="py-2 px-3 rounded-lg cursor-pointer text-center">
                <FiLogOut className="text-[#FF007F] h-8 hover:text-white" />
              </button>
            </li>

            <li>
              <NavLink to="/user-profile">
                <img
                  src={authUser?.photoURL || "/default-profile.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  `hover:bg-[#BB86FC] py-2 px-4 rounded-lg cursor-pointer ${
                    isActive ? "bg-[#FF007F]" : ""
                  }`
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/auth/register"
                className={({ isActive }) =>
                  `hover:bg-[#BB86FC] py-2 px-4 rounded-lg cursor-pointer ${
                    isActive ? "bg-[#FF007F]" : ""
                  }`
                }
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Menu;
