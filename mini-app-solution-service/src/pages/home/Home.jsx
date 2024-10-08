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
  SetTitleHeader({
    title: "Wind Lập Trình",
  });
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
      <CustomHeader  title={"Wind Lập Trình"} subtitle={"Wecom, SLK Solutions"} imageUrl={"./images/logo/logo-slk.jpg"} />
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
