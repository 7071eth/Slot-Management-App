import React, { Fragment } from "react";
import {json, useNavigate} from "react-router-dom"
import { useForm } from "react-hook-form";
import instance from "../../connections/axios";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import '../../assets/user/style.css';
const schema = yup.object({
    name:yup.string().required("Name is a required field"),
    email:yup.string().required("Email is a required field").email("Email is not valid"),
    password:yup.string().min(6,"Password must be at least 6 characters"),
    ConfirmPassword: yup.string().oneOf([yup.ref("password")],"Password do not match")
    
})

function SignupUser() {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(schema)
  });

  console.log(errors);

  const onSubmit = async (values,e) => {
    e.preventDefault();
    try {
        const response = await instance({
          method: "POST",
          url: "/signup",
          data: values,
        });
        console.log(response);
        navigate('/login');
      } catch (err) {
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
            Register
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="Name">Name</label>
            <input
              {...register("name", {  minLength: 3})}
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
            />
            <span className="error-message">{errors.name?.message}</span>

          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input
              {...register("email", { required: true })}
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
            />
            <span className="error-message">{errors.email?.message}</span>
            
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              {...register("password", { required: true })}
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
            />
            <span className="error-message">{errors.password?.message}</span>
            
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Confirm Password</label>
            <input
              {...register("ConfirmPassword", { required: true })}
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
            />
            <span className="error-message">{errors.ConfirmPassword?.message}</span>
            
          </div>
          <div className="flex justify-between text-gray-400 py-2">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" />
              Remember Me
            </p>
            <p>Forgot Password</p>
          </div>
          <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/15 hover:shadow-teal-500/30 text-white font-semibold rounded-lg">
            Register
          </button>
          
          <div className="w-full flex justify-center">
           <span className="text-blue-400">Already a member?</span> <a href="/login" className="pl-2 underline text-white cursor">Login</a>
          </div>
        </form>
        
      </div>
    </Fragment>
  );
}

export default SignupUser;
