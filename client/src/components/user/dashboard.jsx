import React, { useEffect } from 'react'
import { Fragment } from 'react'
import { useState } from 'react';
import RegForm from './modals/regForm';
import instance from '../../connections/axios';
function Dashboard() {
 
const [bookStatus,setBookStatus] = useState(false);
const [regModal,setRegModal] = useState(false);
const [slotStatus,setSlotStatus] = useState('')

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = instance({
    method: "get",
    url: `/getrequest?userid=${user.userId}`,
  }).then((data) => {
    
    let {userId,slotrequest} = data.data;
    console.log(userId);
    console.log(slotrequest);
    if(slotrequest){
      setBookStatus(true);
      setSlotStatus('pending');
    }else{
      setBookStatus(false);
      setSlotStatus('Accepted');
    }
  })
  
})
 
  return (
    <Fragment>
      
        <div className='flex items-center justify-center rounded-lg h-full bg-gray-400'>
          {bookStatus ? <Status slotStatus={slotStatus}/> : <button onClick={() => {
          setRegModal(true)
          setBookStatus(true)  
          }} className='bg-gray-600 text-white p-2 px-4 text-lg rounded-lg'>Book a slot</button> }
        </div>
        <ProgressBar />
      {regModal &&< RegForm setRegModal={setRegModal}/>}
    </Fragment>
  )
}


function Status({slotStatus}) {
  console.log(slotStatus);
  return (
    <div className='bg-gray-800 shadow-md shadow-red-900 p-4 rounded-lg text-white'>
    <div className='uppercase text-lg'>{`Status: ${slotStatus}`}</div>
    </div>


  )
}

const ProgressBar = ({percentage}) => {
  return (
    <div className="bg-gray-300 h-4 rounded-full">
      <div className={`bg-green-500 h-4 rounded-full w-[50%] `}>
      </div>
    </div>
  );
};


export default Dashboard