import { useState } from "react";
import { colors } from "../../utilities";
import { listImage } from "../../images";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "../../services/restfulApi";

export default function RegisterVendor() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const [namaVendor, setNamaVendor] = useState("");
  const [namaToko, setNamaToko] = useState("");
  const [alamatToko, setAlamatToko] = useState("");
  const [noWa, setNoWa] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleHidePassword = () => {
    setShowPassword(!showPassword);
    setPasswordType(showPassword ? "password" : "text");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !namaVendor ||
      !namaToko ||
      !alamatToko ||
      !noWa ||
      !email ||
      !password
    ) {
      toast.warning("Form tidak boleh kosong");
      return;
    } else if (password.length < 8) {
      toast.warning("Password minimal 8 karakter");
      return;
    } else if (noWa.length < 10) {
      toast.warning("No WhatsApp harus lebih dari 10 digit");
      return;
    }

    try {
      await register(namaVendor, namaToko, alamatToko, noWa, email, password);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg || "Terjadi kesalahan");
      }
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: "#d3d3e7" }}>
      <div className="row justify-content-center align-items-center min-vh-100 p-3">
        <div className="col-md-5">
          <div className="row">
            <div className="col">
              <Link to="/">
                <img
                  src={listImage.logoUnguYuksewa}
                  alt="yuksewa"
                  className="w-50"
                />
              </Link>
            </div>
          </div>
          <p></p>
          <div className="row">
            <div className="col p-4 bg-white rounded-3 shadow">
              <h1>Registrasi</h1>
              <form onSubmit={handleSubmit}>
                <InputForm
                  name="Nama Vendor"
                  type="text"
                  value={namaVendor}
                  placeholder="ex : samuel"
                  onChange={(e) => setNamaVendor(e.target.value)}
                />
                <InputForm
                  name="Nama Toko"
                  type="text"
                  value={namaToko}
                  placeholder="ex : samuel store"
                  onChange={(e) => setNamaToko(e.target.value)}
                />
                <InputForm
                  name="Alamat Toko"
                  type="text"
                  value={alamatToko}
                  placeholder="ex : jalan batu 02, kel. Jambu, kec. Jeruk, kab. Semangka"
                  onChange={(e) => setAlamatToko(e.target.value)}
                />

                <InputForm
                  name="No WhatsApp"
                  type="tel"
                  value={noWa}
                  placeholder="ex : 6280******"
                  onChange={(e) => setNoWa(e.target.value)}
                />
                <InputForm
                  name="Email"
                  type="email"
                  value={email}
                  placeholder="ex : samuel@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="pt-1">Password</label>
                <div className="input-group mb-3">
                  <input
                    type={passwordType}
                    className="custom-input w-75"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="ex : Samuel12#"
                  />
                  <span
                    onClick={handleHidePassword}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? (
                      <i className="bi bi-eye-fill"></i>
                    ) : (
                      <i className="bi bi-eye-slash-fill"></i>
                    )}
                  </span>
                </div>
                <button
                  type="submit"
                  className="btn text-white"
                  style={{ backgroundColor: `${colors.ungu}` }}
                >
                  Submit
                </button>
              </form>
              <p className="pt-3">
                Sudah punya akun?{" "}
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

function InputForm({ name, type, value, onChange, placeholder }) {
  return (
    <>
      <label className="pt-1">{name}</label>
      <input
        type={type}
        className="custom-input w-100"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
}
