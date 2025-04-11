import { updateProfile } from "firebase/auth";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { CgCloseO } from "react-icons/cg";
import { AuthContextAPI } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../../helpers/Spinner";


const UpdatePicture = () => {
  let [picture, setPicture] = useState(null);
  let [preview, setPreview] = useState(null);
  let {authUser}=useContext(AuthContextAPI)
  let navigate=useNavigate();
let [isLoading, setisLoading] = useState(false);

  const handleChange = (e) => {
    // console.dir(e.target.files[0]);
    let file = e.target.files[0];
    setPicture(file);

    if (file) {
      let url = URL.createObjectURL(file);
      console.log(url);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!picture) {
        toast.error("select a photo");
        return;
      } else {
        setisLoading(true)
        const data = new FormData();
        data.append("file", picture);
        data.append("upload_preset", "innovators hub music");
        let response = await fetch(
          "https://api.cloudinary.com/v1_1/duco4w8im/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        let result = await response.json();
        console.log(result);
      await  updateProfile( authUser,{
          photoURL:result.url
        })
        toast.success("photo updated succesfully")
        navigate("/user-profile")

      } 
    } catch (error) {
      toast.error(error.message);
    }finally{
      setisLoading(false)
    }
  };

  const clearPicture = (e) => {
    e.preventDefault();
    setPicture(null);
    setPreview(null);
  };
  return (
    <section className="h-[100%] w-[100%] bg-[#222222] flex items-center justify-center">
      <article className="min-h-[300px] w-[40%] bg-[#1A1A1A] rounded-xl p-4 relative">
        <h2 className="text-center text-2xl">Upload profile picture</h2>
        <CgCloseO
          onClick={clearPicture}
          className="absolute top-4 right-4 text-xl cursor-pointer hover:text-red-500"
        />
        <form className="flex flex-col gap-2 mt-4" onSubmit={handleSubmit}>
          <div className="h-32 w-32 m-auto rounded-full bg-gray-700">
            {preview ? (
              <img
                src={preview}
                alt="img"
                className="h-[100%] w-[100%] rounded-full"
              />
            ) : (
              <div className="h-[100%] w-[100%] flex items-center justify-center">
                No file selected
              </div>
            )}
          </div>
          <label
            htmlFor="picture"
            className="block py-2 w-[100%] text-center rounded-lg border-2"
            accept="image/*"
          >
            Select a photo
          </label>
          <input
            type="file"
            id="picture"
            className="hidden"
            onChange={handleChange}
            name="picture"
          />
          <button className="py-2 w-[100%] rounded-lg cursor-pointer hover:bg-blue-500 bg-[#ff0a8d]">
            Upload picture
          </button>
        </form>
      </article>
      {isLoading && <Spinner />}
    </section>
  );
};

export default UpdatePicture;
