import React, { useState } from "react";
import { Box, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import useToast from "../shared/hooks/useToast";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const showToast = useToast();

  const handleDetailProduct = () => {
    navigate("/detailProduct");
  };

  const handleSetActiveSheet = () => {
    setActionSheetVisible(true);
  };

  const handleAddToCart = () => {
    setActionSheetVisible(false);
  };

  const handlePayment = () => {
    setActionSheetVisible(false);
    navigate("/homeCart");
  };

  const handleAddToFavorites = () => {
    const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = [...existingFavorites, product];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    showToast("Đã thêm vào danh sách yêu thích!");
  };

  return (
    <div className="space-y-2 product-index">
      <div onClick={handleDetailProduct}>
        <Box className="w-full aspect-square relative">
          <img
            loading="lazy"
            src={product.image}
            className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center rounded-lg bg-skeleton"
            alt={product.name}
          />
        </Box>
        <Text className="product-name-item">{product.name}</Text>
      </div>
      <Text size="xxSmall" className="text-gray pb-2">
        <span className="product-price">
          {product.price.toLocaleString("vi-VN")} đ
        </span>
        <span onClick={handleAddToFavorites}>
          <Box className="product-icon">{product.icon}</Box>
        </span>
      </Text>
    </div>
  );
};

export default ProductItem;
