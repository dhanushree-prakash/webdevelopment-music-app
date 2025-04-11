import { onAuthStateChanged } from "firebase/auth";
import { createContext,useEffect,useState } from "react";
import { __AUTH } from "../backend/firebaseconfig";


const AuthContextAPI=createContext()
const AuthProvider=(props)=>{
let [authUser,setAuthUser]=useState(null);

useEffect(()=>{
    onAuthStateChanged(__AUTH,(userInfo)=>{
        console.log(userInfo);
        if (userInfo?.emailVerified === true) { //optional chaining [?](if its null do not proceed)
            setAuthUser(userInfo)
            window.localStorage.setItem("TOKEN",userInfo.accessToken);
        }
        else{
            setAuthUser(null)
            window.localStorage.removeItem("TOKEN");
        }
    })
// eslint-disable-next-line react-hooks/exhaustive-deps
},[__AUTH])


return <AuthContextAPI.Provider value={{authUser,setAuthUser}}>
	{props.children}
</AuthContextAPI.Provider>

}
export default AuthProvider;
export {AuthContextAPI}




