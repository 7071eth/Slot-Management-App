import React from 'react'
import { Fragment } from 'react'
import { useState } from 'react';
import RegForm from './modals/regForm';
function Dashboard() {
 
const [bookStatus,setBookStatus] = useState(false);
const [regModal,setRegModal] = useState(false);
 
  return (
    <Fragment>
      
        <div className='flex items-center justify-center rounded-lg h-full bg-gray-400'>
          {bookStatus ? <h1>Working</h1> : <button onClick={() => {
          setRegModal(true)
          setBookStatus(true)  
          }} className='bg-gray-600 text-white p-2 px-4 text-lg rounded-lg'>Book a slot</button> }
        </div>
      {regModal &&< RegForm/>}
    </Fragment>
  )
}

export default Dashboard