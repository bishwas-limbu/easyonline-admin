import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const UnauthorizedAccess = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    localStorage.removeItem('token');
 //   navigate('/login');

  }


  return (
    <div className="min-h-screen flex  flex-col items-center justify-center w-full text-red-800 text-3xl  font-extrabold">
        <p>Unauthorized Access !!!</p> 
        <div className='mt-10'>
          <button onClick = {goToLogin} className="bg-black text-white px-16 py-3 text-sm rounded hover:bg-red-700"> 
            Go to Login  
          </button>
        </div>
    </div>
  )
}

export default UnauthorizedAccess
