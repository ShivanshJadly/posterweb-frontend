import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "../../../font/font.css";

import { login } from "../../../services/operations/authAPI";

// Receive isLoading prop
function LoginForm({ isLoading }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      toast.error("Password cannot be empty!");
      return;
    }

    try {
      // Dispatch action and let Redux handle loading state
      const response = await dispatch(login(email, password, navigate));
      if (response && response.error) {
        toast.error("Incorrect email or password!");
      }
    } catch (error) {
      // Error handling is often managed by the authAPI service itself,
      // but you can add more specific client-side toasts if needed.
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-5">
      <label className="w-full">
        <p className="mb-2 text-sm font-medium text-gray-700">
          E-mail <sup className="text-red-500">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 outline-none transition-all duration-200 shadow-sm bg-gray-100 text-gray-800"
          disabled={isLoading} // Disable input when loading
        />
      </label>
      <label className="relative w-full">
        <p className="mb-2 text-sm font-medium text-gray-700">
          Password <sup className="text-red-500">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 outline-none transition-all duration-200 shadow-sm bg-gray-100 text-gray-800"
          disabled={isLoading} // Disable input when loading
        />
        {password && (
          <span
            onClick={() => !isLoading && setShowPassword((prev) => !prev)} // Disable click when loading
            className={`absolute right-3 top-[38px] z-[10] cursor-pointer text-gray-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700'}`}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} />
            ) : (
              <AiOutlineEye fontSize={24} />
            )}
          </span>
        )}
      </label>
      <div className="flex items-center justify-center w-full mt-4">
        {/* <Link
          to="/forgot-password"
          className={`${isLoading ? 'pointer-events-none opacity-50' : ''}`} // Disable link when loading
        >
          <p className="text-sm text-gray-600 hover:underline transition-colors duration-200">
            forgot password?
          </p>
        </Link> */}

        <button
          type="submit"
          className="rounded-md bg-gray-800 text-white py-2.5 px-6 font-semibold shadow-md hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
          disabled={isLoading} // Disable button when loading
        >
          LOGIN
        </button>
      </div>
    </form>
  );
}

export default LoginForm;