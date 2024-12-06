import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../models/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormInput from "../FormInput";
import { addProduct, getKategori } from "../../services/restfulApi";

function AddProduct() {
  const { vendorId, refreshToken } = useAuth();
  const [namaBarang, setNamaBarang] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategori, setKategori] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    fetchFunction();
  }, []);

  const fetchFunction = async () => {
    try {
      const responseKategori = await getKategori();
      setCategories(responseKategori.map((items) => items.kategori));
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !vendorId ||
      !namaBarang ||
      !harga ||
      !deskripsi ||
      !kategori ||
      !file
    ) {
      return toast.warning("form tidak boleh kosong");
    }
    const formData = new FormData();
    formData.append("vendorId", vendorId);
    formData.append("namaBarang", namaBarang);
    formData.append("harga", harga);
    formData.append("deskripsi", deskripsi);
    formData.append("kategori", kategori);
    formData.append("file", file);

    try {
      await addProduct(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding product:", error.message);
      toast.error(error.response.data.msg);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard"); // Ganti dengan route dashboard Anda
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <FormInput
              label="NamaBarang"
              type="text"
              value={namaBarang}
              onChange={(e) => setNamaBarang(e.target.value)}
            />
            <FormInput
              label="Harga"
              type="number"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
            />
            <div className="mb-3">
              <label htmlFor="formDeskripsi" className="form-label">
                Deskripsi
              </label>
              <textarea
                className="form-control"
                id="formDeskripsi"
                rows="3"
                placeholder="Enter description"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="formKategori" className="form-label">
                Kategori
              </label>
              <select
                id="formKategori"
                className="form-control"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Upload Image
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            {file && (
              <div>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Product"
                  className="img-thumbnail mt-2"
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}
            <div className="mt-3">
              <button type="submit" className="btn btn-primary me-2">
                Add Product
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
            <ToastContainer position="top-center" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
