/* eslint-disable react/prop-types */
import { createContext , useContext, useEffect, useState } from "react";
import { postReq , baseurl } from "../utils/ApiCalls";
import {ToastContainer, toast} from "react-toastify";

const Auth = createContext({
    user:null,
    token:null,
    register:()=>{},
    login:()=>{},
    logout:()=>{}
})

const useAuth = ()=>useContext(Auth)

const AuthProvider = ({children})=>{
    const [isLoading , setIsLoading] = useState(false);
    const [isError , setIsError] = useState(null);
    const [user , setUser] = useState(null);
    const [token , setToken] = useState(null);
    // const navigate = useNavigate();
    // console.log("the user form the context: " , user);
    // console.log("error from contextapi: " ,isError);
    const register = async(data)=>{
        try {
            setIsLoading(true);
            const response = await postReq(`${baseurl}/user/register` , data);
            const {user , token} = response;
            localStorage.setItem("User" , JSON.stringify(user));
            localStorage.setItem("Token" , token);
            setUser(user);
            setToken(token);
            // console.log("the user form the context: " , response);
            toast(response.message);
            // navigate("/");
        } catch (error) {
            console.error("error from register contextapi: " , error);
            console.log("error from register function: ",error.response.data.message);
            toast(error.response.data.message);
            setIsError(error);
            
        }finally{
            setIsLoading(false);
        }
    }
    const login = async(data)=>{
        try {
            setIsLoading(true);
            const response = await postReq(`${baseurl}/user/login` , data);
            const {user , token} = response;
            localStorage.setItem("User" , JSON.stringify(user));
            localStorage.setItem("Token" , token);
            setUser(user);
            setToken(token);
            // console.log("the response from the login:" , response);
            // console.log("the response from the login:" , response.message);
            toast(response.message)
        } catch (error) {
            console.error("error from login contextapi: ", error);
            toast(error.response.data.message);
            setIsError(error);
        } finally{
            setIsLoading(false);
        }
    }
    const logout = async()=>{
        try {
            setIsLoading(true);
            setUser(null);
            setToken(null);
            localStorage.clear();
            toast("logout Sucess");
        } catch (error) {
            console.error("error logout from contextapi :" , error);
            setIsError(error);
            toast("something went wrong")
        } finally{
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("Token");
        if(storedToken && storedUser){
            setUser(storedUser);
            setToken(storedToken);
        }
    } , [])
    return(
        <Auth.Provider value={{user , token , register , login , logout , isError , isLoading}}>
            {children}
            <ToastContainer />
        </Auth.Provider>
    )
}

export {Auth , useAuth , AuthProvider}