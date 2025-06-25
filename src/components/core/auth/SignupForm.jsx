import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { setSignupData } from "../../../slices/authSlice";
import {signUp} from "../../../services/operations/authAPI";

import { FaArrowRight } from "react-icons/fa";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { fullName, email, password} = formData;

  const {
    formState: { errors },
  } = useForm();


  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const signupData = {
      ...formData,
    };

    dispatch(setSignupData(signupData));
    dispatch(signUp(formData.fullName, formData.email, formData.password, navigate)).then((response) => {
            if (response.error) {
                toast.error("Incorrect email or password!");
            }
        })

    // Reset
    setFormData({
      fullName: "",
      email: "",
      password: "",
    });
  };

  return (<>
      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-[18rem] lg:w-full max-w-md flex-col gap-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Full Name <sup className="text-black">*</sup>
            </p>
            <input
              required
              type="text"
              name="fullName"
              value={fullName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="form-style w-full rounded-sm text-gray-700 p-2 border border-black focus:outline-none"
            />
          </label>
          {/* <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-black">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="form-style w-full rounded-sm text-gray-700 p-2 border border-black focus:outline-none"
            />
          </label> */}
        </div>

        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-black">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="form-style w-full rounded-sm text-gray-700 p-2 border border-black focus:outline-none"
          />
        </label>
        <div className="gap-x-4">
          <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-black">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="form-style w-full rounded-sm text-gray-700 p-2 border border-black focus:outline-none"
            />
            {password && (
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[2.2rem] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            )}
          </label>
        </div>
        {/* <div> */}
          {/* <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-black">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="form-style w-full rounded-sm text-gray-700 p-2 border border-black focus:outline-none"
            />
            {password && (
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[2.2rem] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            )}
          </label> */}
        {/* </div> */}
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-black py-[8px] px-[12px] font-medium text-white flex items-center justify-center space-x-2 w-full sm:w-auto"
        >
          <span>Sign up</span>
          <FaArrowRight />
        </button>
      </form>
      </>
  );
}

export default SignupForm;
