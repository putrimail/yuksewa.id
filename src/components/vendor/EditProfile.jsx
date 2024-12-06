import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../models/useAuth";
import FormInput from "../FormInput";
import { getVendorById, updateProfileVendor } from "../../services/restfulApi";

function EditProfile() {
  const [nama, setNama] = useState("");
  const [toko, setToko] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noWa, setNoWa] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();
  const { token, refreshToken } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    refreshToken();
    getProfile();
  }, [token]);
  const getProfile = async () => {
    try {
      const responseProfile = await getVendorById(id, token);
      const data = responseProfile;
      setNama(data.namaVendor);
      setToko(data.namaToko);
      setAlamat(data.alamatToko);
      setNoWa(data.noWa);
      setEmail(data.email);
    } catch (error) {
      console.error(error);
    }
  };
  const updateProfile = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("namaVendor", nama);
    formData.append("namaToko", toko);
    formData.append("alamatToko", alamat);
    formData.append("noWa", noWa);
    formData.append("email", email);

    try {
      await updateProfileVendor(id, formData);
      navigate("/profile");
    } catch (error) {
      console.error("Error adding product:", error.message);
      toast.error(error.responseProfile.data.msg);
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={updateProfile}>
            <FormInput
              label="Nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
            <FormInput
              label="Toko"
              type="text"
              value={toko}
              onChange={(e) => setToko(e.target.value)}
            />
            <FormInput
              label="Alamat"
              type="text"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
            <FormInput
              label="No wa"
              type="text"
              value={noWa}
              onChange={(e) => setNoWa(e.target.value)}
            />
            <FormInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

export default EditProfile;
