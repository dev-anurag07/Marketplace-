import React from 'react'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate("/")
    }
  return (
    <div className='flex justify-between items-center bg-gray-800 text-white p-4'>
    <h1 className='text-lg font-bold'>Service App</h1>

   <button onClick={handleLogout} className='bg-red-500 px-3 py-1 rounded'>Logout</button>

    </div>

  )
}

export default Navbar