import FooterComp from "../FooterComp";
import HeroSection from "./HeroSection";
import NavbarClient from "./NavbarClient";
import ProducListClinet from "./ProducListClinet";
import TempatWisata from "./TempatWisata";

function Homepage() {
  return (
    <div>
      <NavbarClient />
      <HeroSection />
      <TempatWisata />
      <ProducListClinet />
      <FooterComp />
    </div>
  );
}

export default Homepage;
