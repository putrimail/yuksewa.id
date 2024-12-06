import { Button, Modal } from "react-bootstrap";
import { FaShop, FaWhatsapp } from "react-icons/fa6";
import { Link } from "react-router-dom";
function DetailProducts({ show, handleClose, product }) {
  const whatsappLink = `https://wa.me/${
    product.vendor.noWa
  }?text=${encodeURIComponent(
    `Hi toko ${product.vendor.namaToko}, apakah ${product.namaBarang} ini masih ready untuk disewakan??`
  )}`;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{product.namaBarang}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={product.url}
          className="card-img-top product-image "
          alt={product.namaBarang}
        />
        <p></p>
        <hr />
        <h5 className="card-title ">
          Harga: Rp {Number(product.harga).toLocaleString()}
        </h5>
        <p className="card-text">
          <small className="text-muted">Kategori: {product.kategori}</small>
        </p>
        <p>
          <FaShop className="fs-5 me-2" /> {product.vendor.namaToko}
        </p>
        <Link to={whatsappLink} className="btn btn-success w-100">
          <FaWhatsapp /> chat Wa
        </Link>
        <hr />
        <p className="product-description">{product.deskripsi}</p>
        <hr />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetailProducts;
