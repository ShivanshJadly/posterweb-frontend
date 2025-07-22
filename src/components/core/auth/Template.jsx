import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({ title, formType }) {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="w-full min-h-64 relative"> {/* Added relative for absolute positioning of overlay */}
      {/* Content always rendered */}
      <div className="flex flex-col items-center justify-center gap-y-8 w-full">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          {title}
        </h1>
        {formType === "signup" ? <SignupForm isLoading={loading} /> : <LoginForm isLoading={loading} />}
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-gray-50 bg-opacity-80 flex flex-col items-center justify-center rounded-2xl z-30">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-800 text-lg font-medium">Loading...</p>
        </div>
      )}
    </div>
  );
}

export default Template;