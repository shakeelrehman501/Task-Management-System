import React, { useState } from "react";
import { logout } from "../api/authApi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [login, setLogin] = useState(true)
  const submitHandler = async (e) => {
    try {
      const data = await logout();
      if (!data.user.isLoggedIn) setLogin(false);
      toast.success("User loggedOut successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="w-full bg-blue-600 py-4 px-5">
      <div className="w-full max-w-[1020px] mx-auto text-white font-medium flex items-center justify-between ">
        <span className="text-xl">Logo</span>
        {login ? (
          <button
            onClick={submitHandler}
            className="bg-red-800 cursor-pointer hover:bg-red-700 px-6 py-3 rounded-lg font-medium"
          >
            Logout
          </button>
        ) : (
          <Link to={'/login'}>
          <button className="bg-red-800 cursor-pointer hover:bg-red-700 px-6 py-3 rounded-lg font-medium">
            Login
          </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
