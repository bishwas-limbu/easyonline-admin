import axios from "axios";
import { useEffect, useState } from "react";
//import { backendUrl } from "../App";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({isAdmin,setIsAdmin,setToken,token}) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

  const onSubmitHandler = async(e) =>{
   
    try{
        e.preventDefault();
       // console.log(email,password)
     //  console.log(backendUrl);
       const response = await axios.post('http://3.141.211.239:9000/api/v2/users/login/admin',{email,password});
       console.log(response.data);
       if(response.data.status === true){
        const jwtToken = response.data.data ;
      // navigate('/');
        try {
          const decoded = jwtDecode(jwtToken);
          console.log(decoded.isAdmin);
          let isAdmin = decoded.isAdmin;
          let token = jwtToken

          if(isAdmin === false){
            return toast.error("Unauthorized Access !!") 
          }else{
            setIsAdmin(isAdmin)
            setToken(token);
            toast.success(response.data.message)
          }


        } catch (error) {
          toast.error('Invalid token :' + error.message);
        }
       }else{
        toast.error('Invalid email or password');
       }


    }catch(error){
        console.error(error.message);
    }
  }


  return (
  
  
    <div className="  h-screen bg-black flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit = {onSubmitHandler} action="">
            <div className="mb-3 min-w-72">
                <p className="tex-sm font-medium text-gray-700 mb-2">Email Address</p>
                <input
                    onChange = {(e)=>setEmail(e.target.value)} 
                    value = {email}
                    className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:outline-none"
                    type="email" 
                    placeholder="Email Address"
                    required
                />
            </div>
            <div>
                <p className="tex-sm font-medium text-gray-700 mb-2">Password</p>
                <input
                    onChange = {(e)=>setPassword(e.target.value)}
                    value ={password}
                    className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:outline-none"
                    type="password" 
                    placeholder="Enter your password"
                    required
                />
            </div>
            <button
             className="mt-5 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-red-500"
                type="submit"
            >
                Login
            </button>
        </form>
      </div>
    </div>
 


  )
}

export default Login
