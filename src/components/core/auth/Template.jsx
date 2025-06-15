import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({ title, formType }) {
  const { loading } = useSelector((state) => state.auth);
  return (
    <div className="lg:pt-16 py-6">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="flex flex-col justify-center items-center lg:gap-y-12 gap-y-4">
          <h1 className="text-[2rem] lg:text-[2.6rem] font-semibold leading-[2.375rem] text-black text-center">
            {title}
          </h1>
          {formType === "signup" ? <SignupForm /> : <LoginForm />}
        </div>
      )}
    </div>
  );
}

export default Template;
