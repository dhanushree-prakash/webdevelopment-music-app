import React, { useContext, useState } from "react";
import { RiMusicAiLine } from "react-icons/ri";
import { AuthContextAPI } from "../../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { __DB } from "../../backend/firebaseconfig";
import { UserContextAPI } from "../../context/UserContext";
import Spinner from "../../helpers/Spinner";
import { useNavigate } from "react-router-dom";


const UpdateProfile = () => {
  let navigate=useNavigate()
  let [Isloading,setIsLoading]=useState(false)
  let { authUser } = useContext(AuthContextAPI);
  let { userProfile } = useContext(UserContextAPI);
  let [data, setData] = useState({
    phoneno: userProfile?.phoneno ,
    dob: userProfile?.dateofbirth ,
    language: userProfile?.language ,
    gender: userProfile?.gender,
    address: userProfile?.address ,
  });

  let { phoneno, dob, gender, language, address } = data;

  let handleChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setData({ ...data, [key]: value });
  };

  let handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true)
    let { displayName, email, photoURL, uid } = authUser;
    // console.log(data);
    let payload = {
      name: displayName,
      email: email,
      photo: photoURL,
      id: uid,
      phoneno: phoneno,
      dateofbirth: dob,
      language: language,
      gender: gender,
      address: address,
      role: "admin",
    };
    // console.log(payload);
    try {
      let user_collection = doc(__DB, "user_profile", uid);
     await setDoc(user_collection, payload);
    console.log(payload);
    toast.success("data added successfully");
    navigate("/user-profile")
    
    } catch (error) {
      toast.error(error.message);
    }
    finally {
      setIsLoading(false)

    }
  
  };

  return (
    <section className="h-[100%] w-[100%] bg-[#222222] flex items-center justify-center">
      <article className="min-h-[400px] w-[600px] bg-[#1A1A1A] rounded-xl p-4">
        <h2 className="text-center text-2xl"> Upload Profile data</h2>
        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <article className="flex gap-2">
            <div className="flex gap-2 flex-col w-[48%]">
              <label
                htmlFor="phoneno"
                className=" text-[18px] flex items-center gap-2"
              >
                <RiMusicAiLine />
                Phone number
              </label>
              <input
                type="tel"
                id="phoneno"
                placeholder="Enter phone number"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                onChange={handleChange}
                name="phoneno"
                value={phoneno}
              ></input>
            </div>
            <div className="flex gap-2 flex-col w-[48%]">
              <label
                htmlFor="dob"
                className=" text-[18px] flex items-center gap-2"
              >
                <RiMusicAiLine /> Date of birth
              </label>
              <input
                type="date"
                id="dob"
                placeholder="Enter date of birth"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                onChange={handleChange}
                name="dob"
                value={dob}
              ></input>
            </div>
          </article>

          <article className="flex gap-2">
            <div className="flex gap-2 flex-col w-[48%]">
              <label
                htmlFor="language"
                className="text-[18px] flex items-center gap-2 "
              >
                <RiMusicAiLine /> Language
              </label>
              <input
                type="text"
                id="language"
                placeholder="Enter language"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                onChange={handleChange}
                name="language"
                value={language}
              ></input>
            </div>
            <div className="flex gap-2 flex-col w-[48%]">
              <label className="text-[18px] flex items-center gap-2 ">
                {" "}
                <RiMusicAiLine /> Gender
              </label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="radio"
                  id="male"
                  onChange={handleChange}
                  value="male"
                  name="gender"
                  checked={ gender==="male"}
                />
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="female"
                  onChange={handleChange}
                  value="female"
                  name="gender"
                  checked={ gender==="female"}

                />
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="others"
                  onChange={handleChange}
                  value="others"
                  name="gender"
                  checked={ gender==="others"}
                />
                <label htmlFor="others">Others</label>
              </div>
            </div>
          </article>

          <article className="flex gap-2">
            <div className="gap-2">
              <label
                htmlFor="address"
                className="text-[18px] flex items-center gap-2 "
              >
                <RiMusicAiLine /> Address
              </label>
              <textarea
                placeholder="Enter Address"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black h-25 w-140"
                onChange={handleChange}
                name="address"
                value={address}
              ></textarea>
            </div>
          </article>
          <button className="bg-[#ff0a8d] rounded h-10 hover:bg-blue-500">
            Submit
          </button>
        </form>
      </article>
      {Isloading&&<Spinner/>}
    </section>
  );
};

export default UpdateProfile;
