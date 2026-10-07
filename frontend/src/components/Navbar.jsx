import { useState } from "react";
import { logout } from "../api/authApi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [login, setLogin] = useState(false);

  const submitHandler = async () => {
    try {
      const data = await logout();
      setLogin(true)
      if (!data.user.isLoggedIn) ;
      toast.success("User loggedOut successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong, please try again",
      );
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-blue-500/30 bg-blue-600 shadow-md">
      <div className="mx-auto flex h-19 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-10">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">


          <div className="leading-tight">
            <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl">
              Task Management System
            </h1>

            <p className="hidden text-[11px] font-medium text-blue-100 sm:block">
              Organize • Track • Complete
            </p>
          </div>
        </div>

        {/* Login / Logout */}
        {login ? (
          <button
            onClick={submitHandler}
            className="cursor-pointer rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md active:scale-95 sm:px-6"
          >
            Logout
          </button>
        ) : 
        (
          <Link to={"/login"}>
            <button className="cursor-pointer rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm transition-all duration-200 hover:bg-blue-50 hover:shadow-md active:scale-95 sm:px-6">
              Login
            </button>
          </Link>
        )
        }
      </div>
    </nav>
  );
};

export default Navbar;