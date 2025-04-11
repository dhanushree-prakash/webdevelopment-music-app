import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContextAPI } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../../helpers/Spinner";

const UpdatePassword = () => {
  let { authUser } = useContext(AuthContextAPI);
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);
  let [togglePassword, setTogglePassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  let [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleVisibility = (field) => {
    setTogglePassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }

    try {
      setIsLoading(true);
      if (!authUser) throw new Error("User not found. Please log in again.");

      const credential = EmailAuthProvider.credential(authUser.email, formData.oldPassword);
      
     
      await reauthenticateWithCredential(authUser, credential);

      await updatePassword(authUser, formData.newPassword);
      toast.success("Password updated successfully!");

     
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      navigate("/user-profile");

    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleDeleteAccount = async () => {
  //   if (!authUser) {
  //     toast.error("User not found. Please log in again.");
  //     return;
  //   }

  //   const confirmDelete = window.confirm("Are you sure you want to delete your account? This action is irreversible.");

  //   if (!confirmDelete) {
  //     toast.error("Account deletion cancelled.");
  //     return;
  //   }

  //   try {
  //     setIsLoading(true);
  //     await deleteUser(authUser);
  //     toast.success("Account deleted successfully!");
  //     navigate("/signup");
  //   } catch (error) {
  //     toast.error("Error deleting account: " + error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <section className="min-[100px] w-full bg-[#222222] flex items-center justify-center p-1">
  <article className="max-w-lg w-full bg-[#1A1A1A] rounded-xl p-4 relative">
        <h2 className="text-center text-2xl text-white">Update Password</h2>

      

        <form className="flex flex-col gap-4 mt-4" onSubmit={handleUpdatePassword}>
          {/* Old Password */}
          <div>
            <p className="text-[#F7F7F7] text-lg">Enter Old Password:</p>
            <div className="relative">
              <input
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Enter old password"
                className="outline-none p-2 text-md border border-[#BB86FC] bg-[#1A1A1A] text-white rounded-md my-2 w-full"
                type={togglePassword.oldPassword ? "text" : "password"}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
                onClick={() => toggleVisibility("oldPassword")}
              >
                {togglePassword.oldPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* New Password */}
          <div>
            <p className="text-[#F7F7F7] text-lg">Enter New Password:</p>
            <div className="relative">
              <input
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="outline-none p-2 text-md border border-[#BB86FC] bg-[#1A1A1A] text-white rounded-md my-2 w-full"
                type={togglePassword.newPassword ? "text" : "password"}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
                onClick={() => toggleVisibility("newPassword")}
              >
                {togglePassword.newPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

      
          <div>
            <p className="text-[#F7F7F7] text-lg">Confirm Password:</p>
            <div className="relative">
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="outline-none p-2 text-md border border-[#BB86FC] bg-[#1A1A1A] text-white rounded-md my-2 w-full"
                type={togglePassword.confirmPassword ? "text" : "password"}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
                onClick={() => toggleVisibility("confirmPassword")}
              >
                {togglePassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button className="py-2 w-[100%] rounded-lg cursor-pointer hover:bg-blue-500 bg-[#ff0a8d]">
            Update Password
          </button>
        </form>

        {/* <button
          onClick={handleDeleteAccount}
          className="mt-4 py-2 w-[100%] rounded-lg cursor-pointer bg-red-600 text-white hover:bg-red-700"
        >
          Delete Account
        </button> */}
      </article>

      {isLoading && <Spinner />}
    </section>
  );
};

export default UpdatePassword;
