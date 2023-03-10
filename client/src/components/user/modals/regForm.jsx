import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import instance from "../../../connections/axios";
import { json, useNavigate } from "react-router-dom";
const schema = yup.object({
  name: yup.string().required("* required field"),
  email: yup.string().required("* required field").email("Email is not valid"),
  company: yup
    .string()
    .required("* required field")
    .min(3, "Min 3 char required"),
  city: yup.string().required("* required field").min(3, "Min 3 char required"),
  phone: yup.string().required("* required field").min(10, "Invalid number"),
  zip: yup.string().required("* required field").min(6, "Invalid zip code"),
});
function RegForm({setRegModal}) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (values) => {
    
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
    <div className="bg-[#343434ed] fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-blur-primary z-50 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        class="text-base w-full max-w-lg bg-white p-5 rounded-lg opacity-100"
      >
        <div class="flex flex-wrap -mx-3 ">
          <div class="w-full md:w-1/2 px-3 mb-4 md:mb-4">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Name
            </label>
            <input
              {...register("name", { minLength: 3 })}
              class="appearance-none  block h-6 w-full bg-gray-200 text-gray-700 border rounded py-3 px-4  leading-tight  focus:border-gray-500 focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              name="name"
            />
            <span className="error-message">{errors.name?.message}</span>
          </div>

          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 "
              for="grid-last-name"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              class="h-6 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="email"
              name="email"
            />
            <span className="error-message">{errors.email?.message}</span>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-3">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Company Name
            </label>
            <input
              {...register("company", { required: true })}
              class="h-6 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              name="company"
            />
            <span className="error-message">{errors.company?.message}</span>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-city"
            >
              City
            </label>
            <input
              {...register("city", { required: true })}
              class="h-6 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              name="city"
            />
            <span className="error-message">{errors.city?.message}</span>
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-city"
            >
              Phone
            </label>
            <input
              {...register("phone", { required: true })}
              class="h-6 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              name="phone"
            />
            <span className="error-message">{errors.phone?.message}</span>
          </div>

          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-zip"
            >
              Zip
            </label>
            <input
              {...register("zip", { required: true })}
              class="h-6 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              name="zip"
            />
            <span className="error-message">{errors.zip?.message}</span>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button className="bg-gray-400 p-2 px-4 rounded-lg">
            Request Slot
          </button>
        </div>
      </form>
      <button onClick={()=>{
            setRegModal(false)
        }} className="bg-gray-900 p-2 rounded-md text-base text-red-500 absolute bottom-10 px-5">Close</button>
    </div>
  );
}

export default RegForm;
