import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function FoodPartnerRegisterForm() {
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Cast e.currentTarget to HTMLFormElement
    const form = e.currentTarget;

    // Access inputs using form.elements.namedItem
    const fullNameInput = form.elements.namedItem("fullName") as HTMLInputElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const passwordInput = form.elements.namedItem("password") as HTMLInputElement;

    const fullName = fullNameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;


    const deee = await axios.post("http://localhost:8020/api/v1/users/register", {
      fullName,
      email,
      password

    },{
      withCredentials:true
    })
    console.log(deee.data)
    navigate("/")


  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full mx-auto max-w-lg bg-white rounded-3xl shadow-xl p-10 sm:p-12">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            User Registration<Link to={"/food-partner/register"}><span className="text-sm">Register as partner</span></Link> 
          </h1>
          <p className="text-sm text-slate-500 mt-2"></p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Full Name"
              className="w-full h-12 rounded-xl border border-slate-300 bg-slate-50 px-4 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              className="w-full h-12 rounded-xl border border-slate-300 bg-slate-50 px-4 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full h-12 rounded-xl border border-slate-300 bg-slate-50 px-4 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-80 mx-auto mt-4 h-12 rounded-2xl bg-blue-700 text-white text-lg font-semibold hover:bg-blue-800 transition block"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="px-4 text-xs text-slate-400">OR</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Register as Food Partner */}
        <p className="text-center text-sm text-slate-600">
          Already have a account?{" "}
          <Link to={"/user/login"}>
            <span className="font-semibold text-blue-700 hover:underline">
              Login here
            </span>
          </Link>
        </p>

      </div>
    </div>
  );
}
