import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../models/useAuth";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegPenToSquare, FaRegRectangleXmark } from "react-icons/fa6";
import DetailProducts from "../DetailProducts";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

function ProductList() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { token, vendorId, refreshToken } = useAuth();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [length, setLength] = useState(8);

  useEffect(() => {
    refreshToken();
    getProduct();
  }, [token]);

  const getProduct = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/product/${vendorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.data.reverse());
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/product/${productToDelete.id}`
      );
      if (response) {
        getProduct();
        handleCloseDeleteConfirm();
      }
    } catch (error) {
      console.log(error.response.data.data);
    }
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedProduct(null);
  };

  const handleShowDeleteConfirm = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const showAllProduct = () => {
    setShowAll((prevState) => !prevState);
    setLength(showAll ? 8 : products.length);
  };
  return (
    <div className="container mt-5 min-vh-100 ">
      <div className="row">
        {Array.isArray(products) && products.length > 0 ? (
          products.slice(0, length).map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
              <div className="card h-100">
                <div
                  onClick={() => handleViewDetails(product)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={product.url}
                    className="card-img-top product-image"
                    alt={product.namaBarang}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                      {truncateText(product.namaBarang, 20)}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Harga: Rp {Number(product.harga).toLocaleString()}
                    </h6>
                  </div>
                </div>
                <div className="card-footer">
                  <Link
                    className="btn btn-primary mr-2 me-1"
                    to={`editproduct/${product.id}`}
                  >
                    <FaRegPenToSquare />
                  </Link>
                  <button
                    className="btn btn-danger mr-2 me-1"
                    onClick={() => handleShowDeleteConfirm(product)}
                  >
                    <FaRegRectangleXmark />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      {products.length > 8 && (
        <p
          onClick={showAllProduct}
          className="text-center fs-3"
          style={{ cursor: "pointer" }}
        >
          {showAll ? <FaChevronCircleUp /> : <FaChevronCircleDown />}
        </p>
      )}
      {selectedProduct && (
        <DetailProducts
          show={showDetail}
          handleClose={handleCloseDetail}
          product={selectedProduct}
        />
      )}
      <Modal show={showDeleteConfirm} onHide={handleCloseDeleteConfirm}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>apakah anda yakin menghapus data ini?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteConfirm}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductList;
