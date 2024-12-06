import { useEffect, useState } from "react";
import { colors } from "../../utilities";

const wisata = [
  { id: 1, nama: "Bukit Merese", path: "./images/place/bukitmerese.png" },
  { id: 2, nama: "Gunung Rinjani", path: "./images/place/gunungrinjani.png" },
  { id: 3, nama: "Pantai Kuta", path: "./images/place/pantaikuta.png" },
  { id: 4, nama: "pantai pink", path: "./images/place/pantaipink.png" },
  { id: 5, nama: "pergasingan", path: "./images/place/pergasingan.png" },
  { id: 6, nama: "tanjung an", path: "./images/place/tanjungan.png" },
];

function TempatWisata() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % (wisata.length - 2) // Loop through the images
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Slice to show only 3 images at a time
  const displayedImages = wisata.slice(currentIndex, currentIndex + 3);

  return (
    <div
      id="tempat-wisata"
      className="container-fluid"
      style={{ backgroundColor: `${colors.ungu}` }}
    >
      <div className="container ">
        <div className="row pt-5 pb-5 justify-content-center">
          <h3 className="text-center text-white pb-3">Lokasi Wisata</h3>
          {displayedImages.map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
              <div className="card h-100">
                <img
                  src={product.path}
                  className="card-img-top product-image"
                  alt={product.nama}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TempatWisata;
