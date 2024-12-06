import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../models/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getKategori,
  getProductById,
  updateDataProduct,
} from "../../services/restfulApi";

function EditProduct() {
  const { vendorId, refreshToken } = useAuth();
  const [namaBarang, setNamaBarang] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategori, setKategori] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    refreshToken();
    fetchFunction();
    getProduct();
  }, []);

  const fetchFunction = async () => {
    try {
      const responseKategori = await getKategori();
      setCategories(responseKategori.map((item) => item.kategori) || []);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const getProduct = async () => {
    const data = await getProductById(id);
    setNamaBarang(data[0].namaBarang);
    setHarga(data[0].harga);
    setDeskripsi(data[0].deskripsi);
    setKategori(data[0].kategori);
    setFilePreview(data[0].url);
  };
  const updateProduct = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("vendorId", vendorId);
    formData.append("namaBarang", namaBarang);
    formData.append("harga", harga);
    formData.append("deskripsi", deskripsi);
    formData.append("kategori", kategori);
    formData.append("file", file);

    try {
      await updateDataProduct(id, formData);
      navigate("/dashboard"); // Redirect after successful submission
    } catch (error) {
      console.error("Error adding product:", error.message);
      toast.error(error.response.data[0].msg);
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={updateProduct}>
            <div className="mb-3">
              <label htmlFor="formNamaBarang" className="form-label">
                Nama Barang
              </label>
              <input
                type="text"
                className="form-control"
                id="formNamaBarang"
                placeholder="Enter product name"
                value={namaBarang}
                onChange={(e) => setNamaBarang(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formHarga" className="form-label">
                Harga
              </label>
              <input
                type="number"
                className="form-control"
                id="formHarga"
                placeholder="Enter price"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
              />
            </div>
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
                onChange={handleFileChange}
              />
            </div>
            {filePreview && (
              <div>
                <img
                  src={filePreview}
                  alt="Product"
                  className="img-thumbnail mt-2"
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}
            <div className="mt-3">
              <button type="submit" className="btn btn-primary me-2">
                save
              </button>
              <Link to="/dashboard" type="button" className="btn btn-danger">
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

export default EditProduct;
