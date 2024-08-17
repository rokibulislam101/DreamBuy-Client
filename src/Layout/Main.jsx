import { Outlet } from "react-router-dom"
import Footer from "../pages/Shared/Footer/Footer"
import Navbar from "../pages/Shared/Header/Navbar";
import ShopInfo from "../pages/Shared/ShopInfo/ShopInfo";

const main = () => {
  
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <ShopInfo></ShopInfo>
      <Footer />
    </div>
  );
}

export default main
