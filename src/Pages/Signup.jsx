import Template from "../components/core/auth/Template";
import LoginSignupAndImg from "../components/common/LoginSignupAndImg"; // Keep this for the background
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Grid */}
      <div className="absolute inset-0 z-0">
        <LoginSignupAndImg />
      </div>

      {/* Overlay for readability on top of images (optional, but good practice) */}
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

      {/* Centered Signup Box */}
      <div className="relative z-20 bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="text-xl font-bold text-gray-800 relative group" // Added relative and group
          >
            PosterWeb
            {/* Underline element */}
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
        </div>
        <Template title="Create an Account" formType="signup" />
      </div>
    </div>
  );
}

export default Signup;