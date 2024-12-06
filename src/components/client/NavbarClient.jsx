import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { listImage } from "../../images";
import { colors } from "../../utilities";
import { useEffect, useState } from "react";
import { PiSignIn } from "react-icons/pi";
import { FaTimes, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const navbarStyle = {
  textDecoration: "none",
  color: `${colors.ungu}`,
  marginRight: "1rem",
};
function NavbarClient() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [condition, setCondition] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Menghitung lebar gambar berdasarkan ukuran jendela
  const imageWidth = windowWidth < 400 ? Math.max(windowWidth - 100, 150) : 300;

  return (
    <Navbar
      expand="lg"
      className=" fixed-top"
      style={{ backgroundColor: `${colors.lighBlue}` }}
    >
      <Container>
        <Navbar.Brand to="/">
          <img
            src={listImage.logoUnguYuksewa}
            width={imageWidth}
            className="d-inline-block align-top"
            alt="yuksewa logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ color: `${colors.ungu}` }}
          onClick={() => setCondition(!condition)}
        >
          {condition ? <FaTimes /> : <FaBars />}
        </Navbar.Toggle>
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{ color: `${colors.ungu}` }}
        >
          <Nav className="ms-auto ">
            <a style={navbarStyle} href="#hero-section">
              Home
            </a>
            <a style={navbarStyle} href="#tempat-wisata">
              Inspirasi Wisata
            </a>
            <a style={navbarStyle} href="#list-product">
              Product
            </a>
            <Link style={navbarStyle} to="/feedback">
              Masukan
            </Link>
            <Link
              style={navbarStyle}
              to="https://whatsapp.com/channel/0029VaWlu4LAojYrhTOHho2u"
              target="new_blank"
            >
              Gabung Saluran
            </Link>

            <Link to="/login">
              <PiSignIn
                className="fs-2"
                style={{
                  color: `${colors.ungu}`,
                  fontWeight: "bold",
                  marginTop: "-8px",
                }}
              />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarClient;
