import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function FoodPartnerRegisterForm() {

    const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Cast e.currentTarget to HTMLFormElement
    const form = e.currentTarget;

    // Access inputs using form.elements.namedItem
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const passwordInput = form.elements.namedItem("password") as HTMLInputElement;



    const email = emailInput.value;
    const password = passwordInput.value;


    const resposne = await axios.post("http://localhost:8020/api/v1/partner/login", {
      email,
      password,

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
            Food Partner Signin
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Register your business and start receiving orders
          </p>
        </div>

        {/* Form */}
        <form className="" onSubmit={handleSubmit}>
       

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
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
              name="password"
              id="password"
              placeholder="••••••••"
              className="w-full h-12 rounded-xl border border-slate-300 bg-slate-50 px-5 text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
            />
          </div>

         

          
   


           <button
  type="submit"
  className="w-full mx-auto mt-4 h-12 rounded-2xl bg-blue-700 text-white text-lg font-semibold hover:bg-blue-800 transition block"
>
  login
</button>
  </form>
 {/* Register as User */}
        <p className="text-center pt-2 text-sm text-slate-600">
          Looking to order food instead?{" "}
            <Link to={"/user/login"}>
           <span className="font-semibold text-blue-700 hover:underline">
   login as User
                       

           </span>
        </Link>
        </p>

      

      </div>
    </div>
  );
}
