import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormInput from "../FormInput";
function UbahPassword() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cnfrmPassword, setCnfrmPassword] = useState("");
  const navigate = useNavigate();
  const ubahPassword = async (event) => {
    event.preventDefault();
    if (!oldPassword || !newPassword || !cnfrmPassword)
      return toast.warning("form tidak boleh kosong");
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirm", cnfrmPassword);

    try {
      // Submit the form data to your API
      await axios.patch(`${BASE_URL}/gantipassword/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/profile"); // Redirect after successful submission
    } catch (error) {
      console.error("Error adding product:", error.message);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={ubahPassword}>
            <FormInput
              label="password lama"
              type="text"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <FormInput
              label="password baru"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <FormInput
              label="Konfirmasi password"
              type="password"
              value={cnfrmPassword}
              onChange={(e) => setCnfrmPassword(e.target.value)}
            />

            <div className="mt-3">
              <button type="submit" className="btn btn-primary me-2">
                save
              </button>
              <Link to="/profile" type="button" className="btn btn-danger">
                Cancel
              </Link>
            </div>
            <ToastContainer position="top-center" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default UbahPassword;
