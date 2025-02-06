import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("loginSuccess") === "true") {
      toast.success("✅ Login successful!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("🚪 Logged out successfully!", { autoClose: 2000 });
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="container">
      <h2>Welcome to the Time Page!</h2>
      <p>This is your dashboard after login.</p>
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Logout
      </button>

      <ToastContainer />
    </div>
  );
};

export default SuccessPage;
