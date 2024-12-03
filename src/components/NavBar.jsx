
import { useNavigate } from "react-router-dom"
import {assets}  from "../assets/admin_assets/assets"
import { toast } from "react-toastify";

const NavBar = ({setToken}) => {
  const navigate = useNavigate();

  const removeToken = () => {
    localStorage.removeItem('token')
    setToken('');
    //navigate('/login');
    toast.success('Logout Successfully !')

  }

  return (
    <div 
        className="flex items-center py-2 px-[4%] justify-between "
    >
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
        <button 
            onClick ={removeToken}
            className=' bg-gray-600 text-white px-5 py-2 sm:px-7
            sm:py-2 rounded-full text-xs sm:text-sm
        '>Logout
        </button>
    </div>
  )
}

export default NavBar
