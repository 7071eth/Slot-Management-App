import React from 'react'
import { useNavigate } from "react-router-dom";
function Navbar() {
  const Navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("admin");
    Navigate('/admin/signin')
  }
  return (
    <div className='shadow-md shadow-teal-500 w-full '>
       <div className='md:flex justify-between bg-gray-800 py-4 md:px-10 px-7'>
        <div className='flex items-center font-bold text text-white text-lg cursor-pointer'>
            <span className='text-xl text-white mr-3 pt-2'>
            <ion-icon name="cube-outline"></ion-icon>
            </span>
            SLOTB
        </div>
        <div>
          <button onClick={handleLogout} className='bg-red-500 p-1 px-3 rounded-lg uppercase font-bold text-white '>Logout</button>
        </div>
       </div>
    </div>
  )
}

export default Navbar