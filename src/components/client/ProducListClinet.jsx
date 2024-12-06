import { useEffect, useState } from "react";
import { colors } from "../../utilities";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import { getKategori, getProductByKategori } from "../../services/restfulApi";
import DetailProducts from "../DetailProducts";
function ProductListClient() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [length, setLength] = useState(8);
  const [kategori, setKategori] = useState([]);
  const [kategoriNow, setKategoriNow] = useState("");

  useEffect(() => {
    fetchFunction();
  }, [kategoriNow, length]);

  const fetchFunction = async () => {
    try {
      const responseProduct = await getProductByKategori(kategoriNow);
      setProducts(responseProduct || []);
      setKategori((await getKategori()) || []);
    } catch (error) {
      console.error("Error fetching products:", error);
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

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const showAllProduct = () => {
    setShowAll((prevState) => !prevState);
    setLength(showAll ? 8 : products.length);
  };

  const handleKategori = (kategori) => {
    setKategoriNow(kategori);
  };

  return (
    <div
      id="list-product"
      className="container-fluid"
      style={{ backgroundColor: `${colors.lighBlue}` }}
    >
      <div className="container">
        <div className="row pt-5 pb-5 ">
          <h3 className="text-center pb-3">Terbaru</h3>
          <div
            className="overflow-x-auto d-flex flex-nowrap mb-3"
            style={{ overflowX: "auto", whiteSpace: "nowrap" }}
          >
            <button
              className="btn btn-primary m-2"
              onClick={() => setKategoriNow("")}
            >
              All
            </button>
            {kategori.map((item, index) => (
              <button
                className="btn btn-primary m-2"
                key={index}
                onClick={() => handleKategori(item.kategori)}
              >
                {item.kategori}
              </button>
            ))}
          </div>
          {Array.isArray(products) && products.length > 0 ? (
            products.slice(0, length).map((product) => (
              <div
                className="col-sm-6 col-md-4 col-lg-3 mb-4"
                key={product.id}
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="800"
              >
                <div
                  className="card h-100 shadow-lg"
                  style={{
                    backgroundColor: `${colors.lighBlue}`,
                    border: "none",
                  }}
                >
                  <div
                    onClick={() => handleViewDetails(product)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={product.url}
                      className="card-img-top product-image"
                      alt={product.namaBarang}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">
                        {truncateText(product.namaBarang, 20)}
                      </h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Harga: Rp {Number(product.harga).toLocaleString()}
                      </h6>
                      <p className="card-text mt-auto">
                        <small className="text-muted">
                          {product.vendor?.alamatToko ||
                            "Alamat tidak tersedia"}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}

          {products.length > 8 && (
            <p
              onClick={showAllProduct}
              className="text-center fs-3"
              style={{ cursor: "pointer" }}
            >
              {showAll ? (
                <FaChevronCircleUp />
              ) : (
                <FaChevronCircleDown className="blinking-text" />
              )}
            </p>
          )}
        </div>
        {selectedProduct && (
          <DetailProducts
            show={showDetail}
            handleClose={handleCloseDetail}
            product={selectedProduct}
          />
        )}
      </div>
    </div>
  );
}

export default ProductListClient;
