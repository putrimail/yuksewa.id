import ProductList from "./ProductList";
import NavbarVendor from "./NavbarVendor";
import FooterComp from "../FooterComp";

function DashboardVendor() {
  return (
    <div>
      <NavbarVendor />
      <ProductList />
      <FooterComp />
    </div>
  );
}

export default DashboardVendor;
