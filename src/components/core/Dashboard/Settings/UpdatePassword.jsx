import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changePassword } from "../../../../services/operations/settingsAPI";
import IconBtn from "../../../common/IconBtn";

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const oldPasswordValue = watch("oldPassword", "");
  const newPasswordValue = watch("newPassword", "");

  const submitPasswordForm = async (data) => {
    try {
      await changePassword(token, data);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitPasswordForm)}
      className="w-full max-w-lg mx-auto p-4 space-y-6"
    >
      <h2 className="font-bold text-lg lg:text-xl">Update Password</h2>

      {/* Password Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current Password */}
        <div className="relative flex flex-col">
          <label htmlFor="oldPassword" className="font-semibold text-sm lg:text-base">
            Current Password
          </label>
          <input
            type={showOldPassword ? "text" : "password"}
            id="oldPassword"
            placeholder="Enter Current Password"
            className=" bg-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            {...register("oldPassword", { required: true })}
          />
          {oldPasswordValue && (
            <span
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 cursor-pointer"
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={22} fill="#555" />
              ) : (
                <AiOutlineEye fontSize={22} fill="#555" />
              )}
            </span>
          )}
          {errors.oldPassword && (
            <span className="text-sm text-red-500">Please enter your Current Password.</span>
          )}
        </div>

        {/* New Password */}
        <div className="relative flex flex-col">
          <label htmlFor="newPassword" className="font-semibold text-sm lg:text-base">
            New Password
          </label>
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            placeholder="Enter New Password"
            className="bg-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            {...register("newPassword", { required: true })}
          />
          {newPasswordValue && (
            <span
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 cursor-pointer"
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible fontSize={22} fill="#555" />
              ) : (
                <AiOutlineEye fontSize={22} fill="#555" />
              )}
            </span>
          )}
          {errors.newPassword && (
            <span className="text-sm text-red-500">Please enter your New Password.</span>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Update" />
      </div>
    </form>
  );
}
