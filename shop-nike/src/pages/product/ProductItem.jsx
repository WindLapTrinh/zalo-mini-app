import React, { useState } from "react";
import { Box, Text, Icon } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import SheetCart from "../shared/common/cart/SheetCart"; 

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

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
        <span className="product-price">{product.price.toLocaleString("vi-VN")} đ</span>
        <span onClick={handleSetActiveSheet}>
          <Icon className="product-icon" icon={product.icon} />
        </span>
      </Text>
      <SheetCart
        product={product}
        visible={actionSheetVisible}
        onClose={() => setActionSheetVisible(false)}
        onAddToCart={handleAddToCart}
        onPayment={handlePayment}
      />
    </div>
  );
};

export default ProductItem;
