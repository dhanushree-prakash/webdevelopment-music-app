import { createContext,useContext,useEffect,useState } from "react";
import { __DB } from "../backend/firebaseconfig";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContextAPI } from "./AuthContext";


 let UserContextAPI = createContext();

let UserProvider=(props)=>{
 let {authUser}=useContext(AuthContextAPI)
    let [userProfile,setUserProfile]=useState(null)
    let [Isloading,setIsLoading]=useState(true)

    useEffect(() => {
        let fetchProfile = () => {
          let user_collection = doc(__DB, "user_profile", authUser?.uid);
          onSnapshot(user_collection, (data) => {
            setUserProfile(data.data());
          });
        };
      
        if (authUser) {
          fetchProfile();
          setIsLoading(false); 
        }
      }, [authUser]);     

    return(
        <UserContextAPI.Provider value={({userProfile,Isloading})}>
            {props.children}
        </UserContextAPI.Provider>
    )
}

export default UserProvider
export {UserContextAPI}