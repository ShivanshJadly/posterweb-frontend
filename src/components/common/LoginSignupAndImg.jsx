import React from "react";
import leftImage from "../../additionalFile/collage2.jpg"; // Assuming this path is correct

const LoginSignupAndImg = () => {
  return (
    <div className="relative w-full h-full"> {/* Ensure it fills its parent container */}
      {/* Background Image */}
      <img
        src={leftImage}
        alt="Collage"
        className="w-full h-full object-cover" // Removed blur classes here, as opacity is handled by overlay in Login.jsx
      />
    </div>
  );
};

export default LoginSignupAndImg;