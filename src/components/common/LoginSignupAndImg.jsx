import React from "react";
import leftImage from "../../additionalFile/collage2.jpg";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginSignupAndImg = () => {
  const { token } = useSelector((state) => state.auth || {});
  const location = useLocation();

  const vistcheck = location.pathname === "/login" ? "Login" : "Signup";

  return (
    <div className="relative">
      {!token && (
        <div className="relative w-full h-screen">
          {/* Background Image */}
          <img
            src={leftImage}
            alt="Collage"
            className="w-full h-full object-cover filter blur-sm sm:blur-sm md:blur-sm lg:filter-none"
          />

          {/* Buttons Overlay for Large Screens */}
          <div className="absolute top-1/4 right-0 flex-col gap-4 justify-center items-start pl-8 hidden sm:hidden md:hidden lg:flex">
            {/* Login Button */}
            <Link to="/login">
              <button
                className={`${
                  vistcheck === "Login" ? "bg-[#0000008e]" : ""
                } text-white px-5 w-[8rem] h-[3.5rem] rounded-l-full text-md font-bold hover:scale-105 transition-transform`}
              >
                Login
              </button>
            </Link>

            {/* Signup Button */}
            <Link to="/signup">
              <button
                className={`${
                  vistcheck === "Signup" ? "bg-[#0000008e]" : ""
                } text-white px-5 w-[8rem] h-[3.5rem] rounded-l-full text-md font-bold hover:scale-105 transition-transform`}
              >
                Signup
              </button>
            </Link>
          </div>

          {/* Buttons Overlay for Mobile Screens */}
          <div className="absolute left-0 right-0 top-4 lg:hidden z-10 flex justify-center gap-x-20">
            {/* Login Button */}
            <Link to="/login">
              <button
                className={`${
                  vistcheck === "Login" ? "bg-white text-black h-[50px]" : "bg-black text-white h-[50px]"
                }  px-4 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform`}
              >
                Login
              </button>
            </Link>

            {/* Signup Button */}
            <Link to="/signup">
              <button
                className={`${
                  vistcheck === "Signup" ? "bg-white text-black h-[50px]" : "bg-black text-white h-[50px]"
                } px-4 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform`}
              >
                Signup
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignupAndImg;
