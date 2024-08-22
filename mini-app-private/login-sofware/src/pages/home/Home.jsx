import React, { useState,useEffect } from "react";
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
import Slider from "@/pages/home/Slider";
import ServiceStore from "@/pages/home/ServiceStore";
import Introduce from "@/pages/home/Introduce";
import HeaderListProduct from "./HeaderListProduct";

import CustomBottomNavigation from "@/components/layout/CustomBottomNavigation";
import SetTitleHeader from "@/pages/shared/hooks/setTitleHeader";
import Popup from "@/pages/shared/pages/Popup";

const products = [
  { id: 1, name: "Thịt gà", image: "/images/category/chiken.jpg" },
  { id: 2, name: "Snacks", image: "/images/category/snacks.jpg" },
  { id: 3, name: "Gia vị", image: "/images/category/spice.jpg" },
  { id: 4, name: "Bánh kẹo", image: "/images/category/hamburger.jpg" },
  { id: 5, name: "Gạo", image: "/images/category/rice.jpg" },
  { id: 6, name: "Bia", image: "/images/category/beer.jpg" },
  { id: 7, name: "Dụng cụ", image: "/images/category/cosmetics.jpg"},
  { id: 8, name: "Rau củ", image: "/images/category/vegetables.jpg"},
  { id: 9, name: "Hải sản", image: "/images/category/seafood.jpg"},

];

const gotoCategory = (id) => {
  console.log("Chuyển đến danh mục:", id);
};

const Home = (props) => {
  SetTitleHeader({
    title: "iZWork",
  });
  const navigate = useNavigate();

  const handleServiceStoreClick = (id) => {
    console.log("Category clicked:", id);
    navigate(`/categoryByProduct`);
  };

  //popup
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Kiểm tra nếu popup đã được hiển thị trước đó
    const popupShown = localStorage.getItem('popupShown');
    if (!popupShown) {
      setShowPopup(true);
      // Đánh dấu popup đã được hiển thị
      localStorage.setItem('popupShown', 'true');
    }
  }, []);
  const handleClosePopup = () => {
    setShowPopup(false);
  }
  return (
    <Page className="home">
 <Popup show={showPopup} onClose={handleClosePopup} />
      <Box className="header-home">
        <Introduce/>
        <ServiceStore
          products={products}
          onServiceStoreClick={handleServiceStoreClick}
        />
        <Slider />
        <CategoryProduct/>
      </Box>
      <Box>
      <HeaderListProduct/>
      </Box>
      <CustomBottomNavigation />
    </Page>
  );
};

export default Home;
