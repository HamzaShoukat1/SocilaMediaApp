import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex flex-col flex-1">
        <section>
            <Outlet />
        </section>
        

    </div>
  )
}
