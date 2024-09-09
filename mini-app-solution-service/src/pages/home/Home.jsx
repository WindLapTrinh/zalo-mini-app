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
import CustomHeader from "../shared/pages/CustomHeader";
import Popup from "@/pages/shared/pages/Popup";

const products = [
  { id: 1, name: "Điện thoại", image: "/images/category/iPhone.jpg" },
  { id: 2, name: "Laptop", image: "/images/category/laptop.jpg" },
  { id: 3, name: "Tablet", image: "/images/category/tablet.jpg" },
  { id: 4, name: "Đồng hồ", image: "/images/category/dong-ho.jpg" },
  { id: 5, name: "Tai nghe", image: "/images/category/tai-ghe.jpg" },
  { id: 6, name: "Máy in", image: "/images/category/may-in.jpg" },
  { id: 7, name: "Màn PC", image: "/images/category/may-tinh.jpg" },
  { id: 8, name: "Phụ kiện", image: "/images/category/phu-kien.jpg" },
  { id: 9, name: "Camera", image: "/images/category/camera.jpg" },
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
    const popupShown = localStorage.getItem("popupShown");
    if (!popupShown) {
      setShowPopup(true);
      // Đánh dấu popup đã được hiển thị
      localStorage.setItem("popupShown", "true");
    }
  }, []);
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <Page className="home">
      <Box className="box-custom-header">
        <CustomHeader
          title={"Wind Lập Trình"}
          imageUrl={"./images/logo/logo-slk.jpg"}
          subtitle={"Chào mừng, đến với Wind Lập Trình"}
        />
      </Box>
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
      <Box>
        <HeaderListProduct />
        <ProductList />
      </Box>
      <CustomBottomNavigation />
    </Page>
  );
};

export default Home;
