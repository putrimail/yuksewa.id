import { Container, Row, Col, Nav } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { colors } from "../utilities";

function FooterComp() {
  return (
    <footer
      style={{
        backgroundColor: `${colors.ungu}`,
        color: "#fff",
        padding: "2rem 0",
      }}
    >
      <Container>
        <Row className="text-center text-md-left">
          <Col md={4} className="mb-4">
            <h5 className="text-uppercase mb-4">About Us</h5>
            <p
              style={{
                textAlign: "justify",
                margin: "0 auto",
                maxWidth: "600px",
              }}
            >
              Kami adalah sebuah platform inovatif yang bertujuan untuk
              mempermudah pertemuan antara pelanggan dan vendor dalam proses
              penyewaan barang. Dengan kami, Anda dapat dengan mudah menemukan
              berbagai barang yang dapat disewa, mulai dari peralatan rumah
              tangga hingga perlengkapan acara.
            </p>
          </Col>
          <Col md={4} className="mb-4">
            <h5 className="text-uppercase mb-4">Layanan</h5>
            <Nav className="flex-column">
              <Nav.Link style={{ color: "#fff" }}>Services</Nav.Link>
              <Nav.Link style={{ color: "#fff" }}>Consultant</Nav.Link>
              <Nav.Link style={{ color: "#fff" }}>Rental</Nav.Link>
              <Nav.Link style={{ color: "#fff" }}>Contact</Nav.Link>
              <Nav.Link style={{ color: "#fff" }}>Feedback</Nav.Link>
            </Nav>
          </Col>
          <Col md={4} className="mb-4">
            <h5 className="text-uppercase mb-4">Contact Us</h5>
            <p>
              BTN Rumah Teduh, Kuranji, Labuapi, Lombok Barat
              <br />
              Email: yukswaindo@gmail.com
              <br />
              Phone: +62 859-0448-4184
            </p>
            <div className="d-flex justify-content-center">
              <a
                href="https://facebook.com/yuks3w@1d"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff", margin: "0 0.5rem" }}
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff", margin: "0 0.5rem" }}
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/yuksewa_lombok/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff", margin: "0 0.5rem" }}
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff", margin: "0 0.5rem" }}
              >
                <FaLinkedinIn />
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} yukswa.id. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterComp;
