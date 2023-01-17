import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import instance from "../../../connections/axios";

function SelectSlot({ slot,slotnumber,tabledata }) {
  const [name,setname]=useState('')
  const [errmsg,seterr]=useState('')
  const config={Headers:{
  'content-type':"application/json"
  }}
  const handleCancelClick = () => {

    slot(false);
  };
  


  const selectedName =(event)=>
{

setname(event.target.value)


}

const handleSave = () => {


  if(name)
  {
    instance.post(`/admin/bookslot `,{name,slotnumber},config).then(()=>
    {
      slot(false);
    }).catch((err)=>
    {
   
    })
  

  }
  else{
seterr('select name to assign')
  }
};
useEffect(()=>
{
seterr('')

},[name])

 
 

  return (
    
    <div className="mt-10    opacity-100 fixed inset-0 z-50   ">
      <div className="flex h-screen justify-center items-center ">
        <div class="flex items-center justify-between">
          <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full min-w-[400px] bg-white outline-none focus:outline-none">
            <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 class="text-3xl font-semibold">Assign Slot</h3>
             
              <button onClick={handleCancelClick} class="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                < span  class="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            
            <div className= "flex justify-center text-red-500">{errmsg}</div>

            <div class="relative p-6 flex justify-center">
              <select onChange={selectedName} label="Select Version border-solid border-2 border-gray ">
                <option hidden="">Select</option>
                
                {tabledata.filter((val)=>
                val.status==="accepted"&&!val.seat).map(filtered=>(
              
 <option value={filtered._id}>{filtered.name}</option>
                ))}
             
             

              </select>
            </div>
            <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button onClick={handleCancelClick}
                class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Close
              </button>
              <button onClick={handleSave}
                class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectSlot;
