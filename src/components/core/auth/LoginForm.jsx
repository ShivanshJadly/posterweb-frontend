import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../../font/font.css";

import { login } from "../../../services/operations/authAPI";

function LoginForm() {
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-8 pl-12"> 
      <label className="w-[82%]">
        <p className="mb-1 text-[1.1rem] leading-[1.375rem] text-richblack-5 ">
          E-mail
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email"
          className="form-style w-full rounded-sm text-gray-700 p-2 border border-black focus:outline-none"
        />
      </label>
      <label className="w-[82%]">
        <p className="relative mb-1 text-[1.1rem] leading-[1.375rem] text-richblack-5">
          Password
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
            className="absolute right-3 top-[35px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        )}
      </label>
      <div className="flex items-center justify-between w-full mt-6 pl-2 lg:pr-12">
        <Link to="/forgot-password">
          <p className="text-base text-blue-700 hover:underline">
            forgot password?
          </p>
        </Link>

        <button
          type="submit"
          className="rounded-md bg-black text-white py-[0.6rem] px-[2rem] font-bold hover:scale-105 transition-transform duration-300"
        >
          LOGIN
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
