import Template from "../components/core/auth/Template";
import LoginSignupAndImg from "../components/common/LoginSignupAndImg";

function Login() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 relative">
      {/* LoginSignupAndImg Component */}
      <div className="md:col-span-3 lg:col-span-2">
        <LoginSignupAndImg />
        {/* Template Overlay for Mobile Screens */}
      <div className="absolute top-40 left-0 right-0 flex items-center justify-center lg:hidden ">
        <div className="bg-white rounded-2xl shadow-xl p-2 w-11/12 max-w-md border-2 h-96">
          <Template title="Welcome Back!!" formType="login" />
        </div>
      </div>
      </div>

      {/* Template Component for Large Screens */}
      <div className="hidden lg:block">
        <Template title="Welcome Back!!" formType="login" />
      </div>
      

    </div>
  );
}

export default Login;
