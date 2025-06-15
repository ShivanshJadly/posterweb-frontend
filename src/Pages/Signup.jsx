import LoginSignupAndImg from "../components/common/LoginSignupAndImg"
import Template from "../components/core/auth/Template"

function Signup() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 relative">
      {/* LoginSignupAndImg Component */}
      <div className="md:col-span-3 lg:col-span-2">
        <LoginSignupAndImg />
        {/* Template Overlay for Mobile Screens */}
      <div className="absolute top-16 left-0 right-0 flex justify-center lg:hidden ">
        <div className="bg-white rounded-2xl shadow-xl p-2 w-11/12 max-w-md">
        <Template title="Create an Account" formType="signup" />
        </div>
      </div>
      </div>
      {/* Template Component for Large Screens */}
      <div className="hidden lg:block p-2 border-2 border-red-600">
        <Template title="Create an Account" formType="signup" />
      </div>

      
    </div>
  )
}

export default Signup
