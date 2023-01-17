import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import instance from "../../connections/axios";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
function AdminLogin() {
  
  const [userErr,setUserErr] = useState('');
  const schema = yup.object({
    name: yup.string().required("Name is a required field"),
    password: yup
      .string()
      .required("Password is a required field")
      .min(6, "Password must be at least 6 characters"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const Navigate = useNavigate();

  const onSubmit = async (values, e) => {
    e.preventDefault();
    try {
      const response = await instance({
        method: "POST",
        url: "/admin/login",
        data: values,
      });
      

      console.log(response.data);
      if (response.data) {
        let jwt = response.data.accessToken;
        let refreshToken = response.data.refreshToken;
        localStorage.setItem("authToken", jwt);
        localStorage.setItem("admin", JSON.stringify(response.data));
        console.log("WOrking");
        Navigate("/admin/requests");
      }
    } catch (err) {

      setUserErr("Invalid credentials")
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className="bg-gray-400 flex items-center justify-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg"
        >
          <h2 className="text-4xl dark:text-white font-bold text-cente">
            Admin Login
          </h2>
          <span className="error-message">{userErr}</span>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Name</label>
            <input
              onClick={()=>{
                setUserErr('')
              }}
              {...register("name", { minLength: 3 })}
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
            />
            <span className="error-message">{errors.name?.message}</span>
            
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
            onClick={()=>{
              setUserErr('')
            }}
              {...register("password", { minLength: 6 })}
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
            />
            <span className="error-message">{errors.password?.message}</span>
          </div>
          <div className="flex justify-between text-gray-400 py-2">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" />
              Remember Me
            </p>
            <p>Forgot Password</p>
          </div>
          <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/15 hover:shadow-teal-500/30 text-white font-semibold rounded-lg">
            Sign In
          </button>
          
        </form>
      </div>
    </Fragment>
  );
}

export default AdminLogin;
