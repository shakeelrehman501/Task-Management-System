import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authApi";
import toast from "react-hot-toast";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      toast.success("User registered successfully");
      navigate("/login");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong, please try again",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-5">
      <div className="bg-white min-h-80 min-w-50 max-w-sm w-full rounded-md shadow border border-gray-200 px-4 py-5">
        <form onSubmit={submitHandler}>
          <h1 className="text-center font-semibold text-2xl mb-2">Signup</h1>
          <div className="flex flex-col gap-2 mb-3">
            <span className="font-medium">Full Name</span>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="h-8 px-4 py-4.5  border-2 border-gray-300 rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-2 mb-3">
            <span className="font-medium">Email</span>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="h-8 px-3 py-4.5  border-2 border-gray-300 rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col gap-2 mb-3">
            <span className="font-medium">Password</span>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="h-8 px-3 py-4.5 border-2 border-gray-300 rounded-lg w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 cursor-pointer text-white font-medium w-full h-10 rounded-lg mt-3 "
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
