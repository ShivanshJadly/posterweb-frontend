import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { setSignupData } from "../../../slices/authSlice";
import { signUp } from "../../../services/operations/authAPI";

import { FaArrowRight } from "react-icons/fa";

// Receive isLoading prop
function SignupForm({ isLoading }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { fullName, email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submission
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const signupData = {
      ...formData,
    };

    dispatch(setSignupData(signupData));
    try {
      // Dispatch action and let Redux handle loading state
      const response = await dispatch(signUp(formData.fullName, formData.email, formData.password, navigate));
      if (response && response.error) {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      // console.error("Signup API error:", error);
    }

    // Reset form after submission attempt
    setFormData({
      fullName: "",
      email: "",
      password: "",
    });
  };

  return (
    <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-5">
      <div className="grid gap-y-4">
        <label>
          <p className="mb-2 text-sm font-medium text-gray-700">
            Full Name <sup className="text-red-500">*</sup>
          </p>
          <input
            required
            type="text"
            name="fullName"
            value={fullName}
            onChange={handleOnChange}
            placeholder="Enter your full name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 outline-none transition-all duration-200 shadow-sm bg-gray-100 text-gray-800"
            disabled={isLoading} // Disable input when loading
          />
        </label>
      </div>

      <label className="w-full">
        <p className="mb-2 text-sm font-medium text-gray-700">
          Email Address <sup className="text-red-500">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 outline-none transition-all duration-200 shadow-sm bg-gray-100 text-gray-800"
          disabled={isLoading} // Disable input when loading
        />
      </label>
      <div>
        <label className="relative w-full">
          <p className="mb-2 text-sm font-medium text-gray-700">
            Create Password <sup className="text-red-500">*</sup>
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
      </div>
      <button
        type="submit"
        className="mt-4 rounded-md bg-gray-800 text-white py-2.5 px-6 font-semibold shadow-md flex items-center justify-center space-x-2 w-full hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
        disabled={isLoading} // Disable button when loading
      >
        <span>Sign up</span>
        <FaArrowRight />
      </button>
    </form>
  );
}

export default SignupForm;