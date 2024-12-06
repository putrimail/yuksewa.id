import { useState } from "react";
import { colors } from "../../utilities";
import { listImage } from "../../images";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../services/restfulApi";

export default function LoginVendor() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Form tidak boleh kosong");
      return;
    }

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg || "Terjadi kesalahan");
      }
    }
  };

  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: `${colors.lighBlue}` }}
    >
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
              <h1>Login</h1>
              <form onSubmit={handleSubmit}>
                <InputFormLogin
                  name="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="pt-1">Password</label>
                <div className="input-group mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="custom-input w-75"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                Belum punya akun?
                <Link to="/register" style={{ textDecoration: "none" }}>
                  daftar
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

function InputFormLogin({ name, type, value, onChange }) {
  return (
    <>
      <label className="pt-1">{name}</label>
      <input
        type={type}
        className="custom-input w-100"
        value={value}
        onChange={onChange}
      />
    </>
  );
}
