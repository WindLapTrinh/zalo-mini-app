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
import ProductList from "../home/ProductList.jsx";
import SliderCategory from "./SliderCategory.jsx";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation.jsx";
import SheetCart from "../shared/common/cart/SheetCart"; 

import { BsShop } from "react-icons/bs";
import "../../css/detailhome/product/productDetail.css";

const product = {
  id: 1,
  name: "iPhone 15 ProMax 256 GB",
  image: "/images/product/iphone_15_pro_max.png",
  price: 24490000,
  description:
    "iPhone luôn là sự lừa chọn hàng đầu của giới trẻ ngày nay đặt biệt là thế hệ GenZ, iPhone mang tính sang chảnh, thiết kế tinh sảo, và độ bảo mật cao.",
  relatedProducts: [
    {
      id: 2,
      name: "iPhone 11 128 GB",
      image: "/images/product/iphone_11.jpg",
      price: 10190000,
    },
    {
      id: 3,
      name: "iPhone 14 Pluslus 512 GB",
      image: "/images/product/iphone_14_pluspng.png",
      price: 24990000,
    },
    {
      id: 4,
      name: "iPhone 13 ProMax",
      image: "/images/product/iphone-13.jpg",
      price: 13990000,
    },
    {
      id: 5,
      name: "iPhone 15 ProMax 256 GB",
      image: "/images/product/iphone_15_pro_max.png",
      price: 24490000,
    },
  ],
};
const ProductDetail = () => {
  const navigate = useNavigate();
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const handleAddCart = () => {
    setActionSheetVisible(true);
  };

  const handleAddToCart = () => {
    setActionSheetVisible(false);
  };

  const handlePayment = () => {
    setActionSheetVisible(false);
    navigate("/homeCart");
  };

  return (
    <Box className="container-product">
      <SliderCategory />
      <Box className="product-detail">
        <Box className="product-info">
          <Text className="product-name">{product.name}</Text>
          <Text className="product-price">{product.price.toLocaleString("vi-VN")} đ</Text>
          <Text className="product-description">{product.description}</Text>
          <Button className="add-to-cart-button" onClick={handleAddCart}>
            Thêm vào giỏ
          </Button>
        </Box>
        <Box className="related-products">
          <div className="icon-related-products"><BsShop/></div>
          <Text className="related-products-title">Sản phẩm liên quan</Text>
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
      <Box mt={2}>
        <ProductList />
      </Box>
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
  );
};

export default ProductDetail;
