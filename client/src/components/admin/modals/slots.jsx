import React, { Fragment } from "react";
import instance from "../../../connections/axios";
import { json, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import SelectSlot from "./SelectSlot";
function Assign({setRegModal,setModal}) {
  const navigate = useNavigate();
  
  const [tabledata, settabledata] = useState([]);
  const [slotnummber, setslotnumber] = useState(0);
  const [selectslot, setslot] = useState(false);
  const totalseat = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
  ];
  
  const selectuser = (slot) => {
    setslot(true);
    setslotnumber(slot);
  };

  const [reload,setreload] = useState(true)
  useEffect(() => {
    
    const response = instance({
        method: "get",
        url: `/admin/getrequests`,
      }).then((data) => {
        let requests = data.data.user;
        settabledata(requests)
      })
},[reload])

  const assignSlot= async (values) => {
    
    const user = JSON.parse(localStorage.getItem("user")).userId;
    values.user = user;
    console.log(user);
    try {
      const response = await instance({
        method: "POST",
        url: "/request",
        data: values,
      });
      console.log(response.data.success);
      console.log(setRegModal(false));
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>

    <div className="transition rounded-lg bg-[#343434ed] fixed inset-0 z-50 flex justify-center items-center ">
      <div className="container mx-auto mt-12 px-10">
        <div className="grid grid-cols-8 gap-4 text-white">
          { totalseat.map((val) => {
            let flag = false;
            console.log("ergie");
            tabledata.map((data) => {

              if (val === data.seat) flag = true;
            });

            return (
              <div
                onClick={
                  flag
                    ? ""
                    : () => {
                        selectuser(val);
                      }
                }
              >
                <div
                  className={
                    flag
                      ? "flex justify-center  items-center box-border h-20 w-20 p-4 border-2 shadow-sm shadow-blue-100  border-gray-400 rounded-lg bg-orange-400 "
                      : "flex justify-center cursor-pointer items-center box-border h-20 w-20 p-4 border-2 shadow-sm shadow-blue-100  border-gray-400 rounded-lg bg-gray-900 ..."
                  }
                >
                  {val}
                </div>
              </div>
            );
          })}
        </div>
       
      </div>
      {selectslot && (
          <SelectSlot
            slot={setslot}
            slotnumber={slotnummber}
            tabledata={tabledata}
          />
        )}

        <button onClick={()=>{
            setModal(false)
        }} className="bg-gray-900 p-2 rounded-md text-base text-red-500 absolute bottom-10 px-5">Close</button>
    </div>

   
    </Fragment>
  );
}

export default Assign;
