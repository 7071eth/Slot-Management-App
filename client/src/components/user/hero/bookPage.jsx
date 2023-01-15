import React, { Fragment } from "react";
import { Outlet } from "react-router";
import Navbar from "../navbar";
import Sidebar from "../sidebar";

function BookPage() {
  return (
    <Fragment>
      <Navbar/>
      <div className="flex">
        <Sidebar />
        <div className="p-7 bg-gray-900 text-2xl font-semibold flex-1 h-screen ">
          <Outlet/>
        </div>
      </div>
    </Fragment>
  );
}

export default BookPage;
