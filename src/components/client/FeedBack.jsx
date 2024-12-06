import { useEffect, useState } from "react";
import { colors } from "../../utilities";
import FormInput from "../FormInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function FeedBack() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  const [saran, setSaran] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllSaran();
  }, []);

  const getAllSaran = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/testimoni`);
      setSaran(response.data.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const handleTestimoni = async (event) => {
    event.preventDefault();

    // Validasi input
    if (!email || !pesan) {
      console.log("Email atau pesan kosong");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/testimoni`, {
        email: email,
        pesan: pesan,
      });
      console.log("Testimoni berhasil dikirim");
      navigate("/");
    } catch (error) {
      console.error("Error saat mengirim testimoni:", error);
    }
  };

  return (
    <div
      className="conatiner-fluid min-vh-100"
      style={{ backgroundColor: `${colors.lighBlue}` }}
    >
      <div className="container p-4">
        <div className="row justify-content-center">
          <div className="col-md-7 ">
            <h1>Saran & masukan</h1>
            <form onSubmit={handleTestimoni}>
              <FormInput
                label="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Pesan</label>
              <textarea
                className="w-100 h-50 form-control"
                placeholder="masukkan pesan pesan"
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
              ></textarea>

              <div className="mt-3">
                <Link to="/" type="button" className="btn btn-danger me-2">
                  Cancel
                </Link>
                <button type="submit" className="btn btn-primary ">
                  save
                </button>
              </div>
            </form>
            <hr />

            {saran.slice(0, 5).map((saran, index) => (
              <div key={index}>
                <hr />
                <p>emmail : {saran.email}</p>
                <p style={{ marginTop: "-15px" }}>pesan : {saran.pesan}</p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedBack;
