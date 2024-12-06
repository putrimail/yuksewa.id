import { Navbar, Nav, Container } from "react-bootstrap";
import { listImage } from "../../images";
import { useEffect, useState } from "react";
import { GoSignOut } from "react-icons/go";
import { logoutVendor } from "../../services/restfulApi";
import { useNavigate } from "react-router-dom";

function NavbarVendor() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const imageWidth = windowWidth < 400 ? Math.max(windowWidth - 100, 150) : 300;
  const logout = async () => {
    try {
      await logoutVendor();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/dashboard">
          <img
            src={listImage.logoUnguYuksewa}
            width={imageWidth} // Menggunakan lebar gambar yang telah dihitung
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">
              <button type="button" className="btn btn-outline-primary">
                Home
              </button>
            </Nav.Link>
            <Nav.Link href="/addproduct">
              <button type="button" className="btn btn-outline-primary">
                add product
              </button>
            </Nav.Link>
            <Nav.Link href="/profile">
              <button type="button" className="btn btn-outline-primary">
                profile
              </button>
            </Nav.Link>
          </Nav>

          <p
            className="fs-2 text-danger"
            style={{ cursor: "pointer" }}
            onClick={logout}
          >
            <GoSignOut />
          </p>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarVendor;
