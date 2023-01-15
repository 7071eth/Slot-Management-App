import React from 'react'

function Navbar() {
  return (
    <div className='shadow-md shadow-teal-500 w-full '>
       <div className='md:flex bg-gray-800 py-4 md:px-10 px-7'>
        <div className='flex items-center font-bold text text-white text-lg cursor-pointer'>
            <span className='text-xl text-white mr-3 pt-2'>
            <ion-icon name="cube-outline"></ion-icon>
            </span>
            SLOTB
        </div>
       </div>
    </div>
  )
}

export default Navbar