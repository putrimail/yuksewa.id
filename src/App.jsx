import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginVendor from "./components/vendor/LoginVendor";
import RegisterVendor from "./components/vendor/RegisterVendor";
import DashboardVendor from "./components/vendor/DashboardVendor";
import AddProduct from "./components/vendor/AddProduct";
import EditProduct from "./components/vendor/EditProduct";
import ProfileVendor from "./components/vendor/ProfileVendor";
import Homepage from "./components/client/Homepage";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import EditProfile from "./components/vendor/EditProfile";
import UbahPassword from "./components/vendor/UbahPassword";
import FeedBack from "./components/client/FeedBack";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi dalam milidetik
      offset: 100, // Jarak elemen mulai animasi
      once: false, // Apakah animasi hanya terjadi sekali
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/feedback" element={<FeedBack />} />

        <Route path="/login" element={<LoginVendor />} />
        <Route path="/register" element={<RegisterVendor />} />
        <Route path="/dashboard" element={<DashboardVendor />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/dashboard/editproduct/:id" element={<EditProduct />} />
        <Route path="/editprofile/:id" element={<EditProfile />} />
        <Route path="/profile" element={<ProfileVendor />} />
        <Route path="/ubahpassword/:id" element={<UbahPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
