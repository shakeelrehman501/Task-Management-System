import { useState } from "react";
import { login } from "../api/authApi";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await login({
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", data.token);

      setFormData({
        email: "",
        password: "",
      });
      toast.success("User login successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-5">
      <div className="bg-white min-h-80 min-w-50 max-w-sm w-full rounded-md shadow border border-gray-200 px-4 py-5">
        <form onSubmit={submitHandler}>
          <h1 className="text-center font-semibold text-2xl mb-2">Login</h1>
          <div className="flex flex-col gap-2 mb-3">
            <span className="font-medium">Email</span>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              className="h-8 px-3 py-4.5  border-2 border-gray-300 rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-2 mb-3">
            <span className="font-medium">Password</span>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              className="h-8 px-3 py-4.5 border-2 border-gray-300 rounded-lg w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 cursor-pointer text-white font-medium w-full h-10 rounded-lg mt-3 "
          >
            Login
          </button>
          <div className="text-center mt-4">
            If you haven't signed up,{" "}
            <Link to="/signup" className="text-blue-600 font-bold underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
