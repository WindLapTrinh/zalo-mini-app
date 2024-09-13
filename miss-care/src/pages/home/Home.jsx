import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BottomNavigation,
  Box,
  Icon,
  Page,
  Sheet,
  Swiper,
  Text,
  Input,
} from "zmp-ui";
import "../../css/detailHome.css";
import CategoryProduct from "@/pages/home/CategoryProduct";
import ProductList from "@/pages/home/ProductList";
import Slider from "@/pages/home/Slider";
import ServiceStore from "@/pages/home/ServiceStore";
import Introduce from "@/pages/home/Introduce";
import HeaderListProduct from "@/pages/home/HeaderListProduct";
import CustomBottomNavigation from "@/pages/shared/components/CustomBottomNavigation";
import SetTitleHeader from "@/pages/shared/hooks/setTitleHeader";
import Popup from "@/pages/shared/pages/Popup";
import CustomHeader from "../shared/pages/CustomHeader";

const products = [
  { id: 1, name: "Bé sơ sinh", image: "/images/category/parent-baby.png" },
  { id: 2, name: "Chăm.s Bà bầu", image: "/images/category/pregnancy-care.png" },
  { id: 3, name: "Mẹ sau sinh", image: "/images/category/postpartum-mother.png" },
  { id: 4, name: "Massage", image: "/images/category/massage.png" },
  { id: 5, name: "Bảo mẫu", image: "/images/category/nanny.png" },
  { id: 6, name: "Làm đẹp", image: "/images/category/postpartum-beauty.png" },
  { id: 7, name: "Tắc sữa", image: "/images/category/clogged-milk.png" },
];

const gotoCategory = (id) => {
  console.log("Chuyển đến danh mục:", id);
};

const Home = (props) => {
  const navigate = useNavigate();

  const handleServiceStoreClick = (id) => {
    console.log("Category clicked:", id);
    navigate(`/categoryByProduct`);
  };

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupShown = localStorage.getItem("popupShown");
    if (!popupShown) {
      setShowPopup(true);
      localStorage.setItem("popupShown", "true");
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <Box>
      <CustomHeader  title={"Miss Care"} subtitle={"Wellcom, SLK Solutions"} imageUrl={"./images/logo/logo-slk.jpg"} />
      <Page className="home">
        <Box className="content">
          <Popup show={showPopup} onClose={handleClosePopup} />
          <Box className="header-home">
            <Introduce />
            <ServiceStore
              products={products}
              onServiceStoreClick={handleServiceStoreClick}
            />
            <Slider />
            <CategoryProduct />
          </Box>

          {/* Product list and bottom navigation */}
          <Box>
            <HeaderListProduct />
            <ProductList />
          </Box>
        </Box>

        {/* Custom bottom navigation */}
        <CustomBottomNavigation />
      </Page>
    </Box>
  );
};

export default Home;
