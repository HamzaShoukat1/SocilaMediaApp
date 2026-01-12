
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function FoodPartnerRegisterForm() {
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Cast e.currentTarget to HTMLFormElement
    const form = e.currentTarget;

    // Access inputs using form.elements.namedItem
    const fullNameInput = form.elements.namedItem("name") as HTMLInputElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const passwordInput = form.elements.namedItem("password") as HTMLInputElement;
    const PhoneInput = form.elements.namedItem("phone") as HTMLInputElement;
    const AddressInput = form.elements.namedItem("address") as HTMLInputElement;



    const name = fullNameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const phone = PhoneInput.value
    const address = AddressInput.value


    const resposne = await axios.post("http://localhost:8020/api/v1/partner/register", {
      name,
      email,
      password,
      phone,
      address

    }, {
      withCredentials: true
    })
    console.log(resposne.data)
    navigate("/create-food")


  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 px-4">
      <div className="w-full mx-auto max-w-lg bg-white rounded-3xl shadow-xl p-10 sm:p-12">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Food Partner Registration
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Register your business and start receiving orders
          </p>
        </div>

        {/* Form */}
        <form className="" onSubmit={handleSubmit}>

          {/* Name */}
          <div className="">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Restaurant or Owner Name"
              className="w-full  h-12 rounded-xl border  border-slate-300 bg-slate-50  text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@email.com"
              className="w-full h-12 rounded-xl border border-slate-300 bg-slate-50 px-5 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="w-full h-12 rounded-xl border border-slate-300 bg-slate-50 px-5 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+92 300 1234567"
              className="w-full h-12 rounded-xl border border-slate-300 bg-slate-50 px-5 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Address
            </label>
            <textarea
              rows={3}
              id="address"
              name="address"
              placeholder="Full business address"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mx-auto mt-4 h-12 rounded-2xl bg-blue-700 text-white text-lg font-semibold hover:bg-blue-800 transition block"
          >
            Register as Food Partner
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="px-4 text-xs text-slate-400">OR</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Register as User */}
        <p className="text-center text-sm text-slate-600">
          Looking to order food instead?{" "}
          <Link to={"/user/login"}>
            <span className="font-semibold text-blue-700 hover:underline">
              Register as User


            </span>
          </Link>
        </p>

      </div>
    </div>
  );
}
