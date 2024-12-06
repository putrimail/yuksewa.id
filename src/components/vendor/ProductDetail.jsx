import { Modal, Button } from "react-bootstrap";

function ProductDetail({ show, handleClose, product }) {
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

export default ProductDetail;
