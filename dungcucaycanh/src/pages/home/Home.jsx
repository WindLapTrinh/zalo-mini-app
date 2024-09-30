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
import ProductList from "@/pages/home/ProductList";
import Slider from "@/pages/home/Slider";
import ServiceStore from "@/pages/home/ServiceStore";
import Introduce from "@/pages/home/Introduce";
import HeaderListProduct from "@/pages/home/HeaderListProduct";

import CustomBottomNavigation from "../shared/components/CustomBottomNavigation";
import Popup from "@/pages/shared/pages/Popup";
import CustomHeader from "../shared/pages/CustomHeader";
const products = [
  { id: 1, name: "Dụng cụ", image: "/images/category/dung-cu.png" },
  { id: 2, name: "Phân Bón", image: "/images/category/laptop.jpg" },
  { id: 3, name: "Hạt giống", image: "/images/category/tablet.jpg" },
  { id: 4, name: "Khác", image: "/images/category/dong-ho.jpg" },
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
    <Box>
      <CustomHeader title={"KIM GIAP"} subtitle={"Kios 17 Thành Thái, p.14, q.10, Tp.HCM"} imageUrl={"./images/logo/Logo-dungcucaycanh.png"}/>
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
      <HeaderListProduct />
        <ProductList />
      </Box>
      <CustomBottomNavigation />
    </Page>
    </Box>
  );
};

export default Home;
