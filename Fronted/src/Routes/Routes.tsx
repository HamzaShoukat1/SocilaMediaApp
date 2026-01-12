import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import AuthLayout from "../Auth/AuthLayout"
import PartnerLogin from "../Auth/PartnerLogin"
import PartnerRegister from "../Auth/PartnerRegister"
import UserLogin from "../Auth/UserLogin"
import UserRegister from "../Auth/UserRegister"
import App from "../App"
import HomePage from "../Root/HomePage"
import CreateFood from "../Root/CreateFood"
import FoodPartnerProfilePage from "../Root/FoodPartnerStorePage/FoodPartnerProfilePage"


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/' element={<App />}>
      {/* //public route   */}
      <Route element={<AuthLayout />}>
        <Route path='user/register' element={<UserRegister />} />
        <Route path='user/login' element={<UserLogin />} />
        <Route path='food-partner/register' element={<PartnerRegister />} />
        <Route path='food-partner/login' element={<PartnerLogin />} />



      </Route>
      {/* privte Route   */}
      <Route index element={<HomePage />} />
      <Route path="/create-food" element={<CreateFood />} />


      {/* <Route element={<RootLayout />}> */}
      <Route index element={<HomePage />} />
            <Route path="/food-partner/:id" element={<FoodPartnerProfilePage />} />

      {/* <Route path="/profile" element={<ProfilePage />} /> */}
    </Route>

  )

)