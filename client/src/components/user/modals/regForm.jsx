import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("* required field"),
  email: yup
    .string()
    .required("* required field")
    .email("Email is not valid"),
  comapany: yup.string().required("Company is a required field").length(3,"Min 3 char required"),
  city: yup.string().required("* required field").min(3,"Min 3 char required"),
  phone: yup.string().required("* required field").min(10,"Invalid number"),
  zip: yup.string().required("* required field").min(6,"Invalid zip code"),
});
function RegForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (values) => {
    
    console.log(values);
  };

  return (
    <div className="transition rounded-lg bg-zinc-600 opacity-90 fixed inset-0 z-50 flex justify-center items-center ">
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
    </div>
  );
}

export default RegForm;
