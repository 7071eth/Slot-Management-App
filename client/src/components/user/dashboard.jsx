import React, { useEffect } from 'react'
import { Fragment } from 'react'
import { useState } from 'react';
import RegForm from './modals/regForm';
import instance from '../../connections/axios';
function Dashboard() {
 
const [tabledata, settabledata] = useState([]);  
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
    console.log("wokrin")
    console.log(slotrequest);

    if(slotrequest){
      setBookStatus(true);
      settabledata(slotrequest);
      setSlotStatus('pending');
    }else{
      setBookStatus(false);
      setSlotStatus('Accepted');
    }

  })
  
},[])
 
  return (
    <Fragment>
      
        <div className='flex items-center justify-center rounded-lg h-full bg-gray-400'>
          {bookStatus ? <ReqDetails tabledata={tabledata}/> : <button onClick={() => {
          setRegModal(true)
          setBookStatus(true)  
          }} className='bg-gray-600 text-white p-2 px-4 text-lg rounded-lg'>Book a slot</button> }
        </div>
      
      {regModal &&< RegForm setRegModal={setRegModal}/>}
    </Fragment>
  )
}


// function Status({slotStatus}) {
//   console.log(slotStatus);
//   return (
//     <div className='bg-gray-800 shadow-sm shadow-white p-4 rounded-lg text-white'>
//     <div className='uppercase text-lg'>{`Status: ${slotStatus}`}</div>
//     </div>


//   )
// }

function ReqDetails({tabledata}){
  return(
    <div class="relative w-9/12 mt-5 overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  Email
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-3 h-3 ml-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  Company
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-3 h-3 ml-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  Status
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-3 h-3 ml-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                    </svg>
                  </a>
                </div>
              </th>
              
            </tr>
          </thead>
          <tbody>
            
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {tabledata.name}
                      </th>
                      <td class="px-6 py-4">{tabledata.email}</td>
                      <td class="px-6 py-4">{tabledata.company}</td>
                      <td class="px-6 py-4">{tabledata.status}</td>
                      
                    </tr>
          </tbody>
        </table>
      </div>
  )
}


export default Dashboard