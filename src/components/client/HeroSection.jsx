import { listImage } from "../../images";
import { colors } from "../../utilities";
import { FaAngleDoubleDown } from "react-icons/fa";
function HeroSection() {
  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: colors.abuAbu }}
      id="hero-section"
    >
      <div className="row no-gutters min-vh-100">
        <div
          className="col-md-6 d-flex flex-column justify-content-center align-items-center"
          style={{ backgroundColor: colors.lighBlue, minHeight: "100vh" }}
        >
          <div
            className="d-flex flex-column justify-content-center align-items-center flex-grow-1 pt-5 swiper-text"
            data-aos="fade-up"
          >
            <h1
              style={{
                fontFamily: "Anton, sans-serif",
                fontSize: "3rem",
                margin: "0",
                letterSpacing: "5px",
                textAlign: "center",
              }}
            >
              Welcome to
            </h1>
            <h1
              style={{
                fontFamily: "Anton, sans-serif",
                fontSize: "3rem",
                margin: "1rem 0 0",
                letterSpacing: "10px",
                transform: "translateY(-15px)",
                textAlign: "center",
                marginLeft: "10px",
              }}
            >
              YUKSEWA
            </h1>
            <p style={{ textAlign: "center" }}>Dari pada beli baru, sewa aja</p>
            <a
              href="#list-product"
              className="btn text-white"
              style={{ backgroundColor: `${colors.ungu}` }}
            >
              Mulai Menyewa <FaAngleDoubleDown className="blinking-text" />
            </a>
          </div>
        </div>
        <div
          className="col-md-6 d-flex justify-content-center align-items-center"
          data-aos="fade-left"
          style={{
            backgroundImage: `url(${listImage.bgHiking})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
            color: "white",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Optional content here */}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
