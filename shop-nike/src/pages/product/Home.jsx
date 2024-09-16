import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  Swiper,
  BottomNavigation,
  Icon,
  Sheet,
  Input,
} from "zmp-ui";
import ProductList from "./ProductList.jsx";
import SliderCategory from "./SliderProduct.jsx";
import CustomHeader from "../shared/pages/CustomHeader.jsx";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation.jsx";
import SheetCart from "../shared/common/cart/SheetCart.jsx";

import { BsShop } from "react-icons/bs";
import "../../css/product/productDetail.css";

const product = {
  id: 1,
  name: "Nike Dunk Low Red",
  image: "/images/product/product-7.png",
  price: 24490000,
  description:
    "Không thể nào thoải mái hơn - Giày Sneaker Nam Air Max 90! Đôi giày vẫn giữ nguyên những đặc trưng của dòng giày chạy bộ Nike trứ danh: với đế Waffle nổi tiếng, các lớp vải may và các chi tiết TPU cổ điển. Những màu sắc ấn tượng thể hiện phong cách mới của bạn, trong khi đệm Max Air mang lại sự thoải mái trên mọi hành trình.",
  relatedProducts: [
    {
      id: 2,
      name: "NikeCounrt Slam",
      image: "/images/product/ao-1.jpg",
      description: "Men's Dri-FIT Tennis Shorts",
      price: 10190000,
    },
    {
      id: 3,
      name: "NikeCourt Dri-FIT Victory",
      image: "/images/product/ao-2.jpg",
      description: "Women's Flouncy Tennis Skirt",
      price: 24990000,
    },
    {
      id: 4,
      name: "Nike Dunk Low Red",
      image: "/images/product/product-8.jpg",
      description: "Coler Red Shoes Good",
      price: 13990000,
    },
    {
      id: 5,
      name: "Nike Dunk Lơ Green",
      image: "/images/product/product-5.jpg",
      description: "Coler Green Shoes Good",
      price: 24490000,
    },
  ],
};
const Home = () => {
  const navigate = useNavigate();
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const handleAddCart = () => {
    setActionSheetVisible(true);
  };

  const handleViewProductDetail = () => {

  };

  const handleAddSize = () => {

  };
  const handleAddToCart = () => {
    setActionSheetVisible(false);
  };

  const handlePayment = () => {
    setActionSheetVisible(false);
    navigate("/homeCart");
  };

  return (
    <Box>
      <CustomHeader title={"Nike Dunk Low"} showBackIcon={true} />
      <Box className="container-product">
        <SliderCategory />
        <Box className="product-detail">
          <Box className="product-info">
            <Text className="product-name">{product.name}</Text>
            <Text className="product-price">
              {product.price.toLocaleString("vi-VN")} đ
            </Text>
            <Text className="product-description">{product.description}</Text>
            <Text
              className="view-product-detail"
              onClick={handleViewProductDetail}
            >
              View Product Details
            </Text>
            <Box className="func-product">
              <Button fullWidth className="add-to-size-button" onClick={handleAddSize}>
                Size US 40
              </Button>
              <Button fullWidth className="add-to-cart-button" onClick={handleAddCart}>
                Add to Bag
              </Button>
              <Button fullWidth className="add-to-size-button">
                Favorite
              </Button>
            </Box>
          </Box>
          <Box className="related-products">
            <div className="icon-related-products">
              <img className="img-also-like" src="./images/icon/icon-also-like.png" alt="" />
            </div>
            <Text className="related-products-title">You Might Also Like</Text>
            <Box className="related-products-list">
              {product.relatedProducts.map((relatedProduct) => (
                <Box key={relatedProduct.id} className="related-product-item">
                  <img
                    className="related-product-image"
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                  />
                  <Text className="related-product-name">
                    {relatedProduct.name}
                  </Text>
                  <Text className="related-product-price">
                    {relatedProduct.price.toLocaleString("vi-VN")} đ
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        {/* <Box mt={2}>
        <ProductList />
      </Box> */}
        <Box className="navigate-product">
          <CustomBottomNavigation />
        </Box>
        <SheetCart
          product={product}
          visible={actionSheetVisible}
          onClose={() => setActionSheetVisible(false)}
          onAddToCart={handleAddToCart}
          onPayment={handlePayment}
        />
      </Box>
    </Box>
  );
};

export default Home;
