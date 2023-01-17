import React from "react";
import { useEffect } from "react";
import instance from "../../connections/axios";
import { useState } from "react";

function AdminDashboard() {
  const [tabledata, settabledata] = useState([]);
  const [reload, setreload] = useState(true);
  const [empty, setEmpty] = useState(true);

  const accept = (id) => {
    instance.get(`/admin/acceptrequest?userid=${id}`);
    setreload(!reload);
  };
  const reject = (id) => {
    instance.get(`/admin/rejectrequest?userid=${id}`);
    setreload(!reload);
  };

  useEffect(() => {
    const response = instance({
      method: "get",
      url: `/admin/getrequests`,
    }).then((data) => {
      let requests = data.data.user;
      let key = "status";
      let value = "pending";
      let result = requests.find((obj) => obj[key] === value);
      if (result) setEmpty(false);
      settabledata(requests);
    });
  }, [setreload]);

  return (
    <div>
      <div className="mt-5 pl-2 uppercase text-xll text-white text">
        <h1>Requests</h1>
      </div>
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
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Accept/Reject</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {tabledata
              .slice(0)
              .reverse()
              .map((val, key) => {
                console.log(val);
                if (val.status == "Pending") {
                  return (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {val.name}
                      </th>
                      <td class="px-6 py-4">{val.email}</td>
                      <td class="px-6 py-4">{val.company}</td>
                      <td class="px-6 py-4">{val.status}</td>
                      <td class="px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            accept(val._id);
                          }}
                          className="mr-3 
                     bg-green-400 p-1 px-3 rounded-lg text-black"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => {
                            reject(val._id);
                          }}
                          className="mr-3 
                     bg-red-400 p-1 px-3 rounded-lg text-black"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center text-white">
        {empty ? <div className="m-9">New requests not found !</div> : ""}
      </div>
    </div>
  );
}

export default AdminDashboard;
