import { useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { useDispatch } from "react-redux";
import { logout } from "../services/operations/authAPI";
import { useState } from "react";

const Dashboard = () => {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    setConfirmationModal({
      text1: "Are you sure?",
      text2: "You will be logged out of your account.",
      btn1Text: "Logout",
      btn2Text: "Cancel",
      btn1Handler: () => {
        dispatch(logout(navigate));
        setConfirmationModal(null);
      },
      btn2Handler: () => setConfirmationModal(null),
    });
  };
  return (
    <div>
      <button
        onClick={handleLogout}
        className="absolute rounded-full bg-red-500 p-2 right-2 lg:right-5 top-24 text-sm lg:text-3xl text-white hover:scale-[1.1] z-50"
      >
        <MdOutlineLogout />
      </button>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};
export default Dashboard;
