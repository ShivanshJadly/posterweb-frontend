import Template from "../components/core/auth/Template";
import LoginSignupAndImg from "../components/common/LoginSignupAndImg";
import { Link } from "react-router-dom";
import { useState } from "react"; // Import useState

function Login() {
  const [currentForm, setCurrentForm] = useState("login"); // State to manage which form is active

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Grid */}
      <div className="absolute inset-0 z-0">
        <LoginSignupAndImg />
      </div>

      {/* Overlay for readability on top of images */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div> {/* Reduced opacity to 50% */}

      {/* Centered Form Box */}
      <div className="relative z-20 bg-gray-50 rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 border border-gray-200"> {/* Changed box color to gray-50 */}
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="text-xl font-bold text-gray-800 relative group" // Added relative and group
          >
            PosterWeb
            {/* Underline element */}
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <div className="flex bg-gray-200 rounded-lg p-1"> {/* Container for login/signup tabs */}
            <button
              onClick={() => setCurrentForm("login")}
              className={`py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300
                ${currentForm === "login" ? "bg-gray-800 text-white shadow" : "text-gray-700 hover:bg-gray-300"}`}
            >
              Login
            </button>
            <button
              onClick={() => setCurrentForm("signup")}
              className={`py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300
                ${currentForm === "signup" ? "bg-gray-800 text-white shadow" : "text-gray-700 hover:bg-gray-300"}`}
            >
              Signup
            </button>
          </div>
        </div>

        {/* Render Template based on currentForm state */}
        {currentForm === "login" && <Template title="Welcome Back!!" formType="login" />}
        {currentForm === "signup" && <Template title="Create an Account" formType="signup" />}
      </div>
    </div>
  );
}

export default Login;