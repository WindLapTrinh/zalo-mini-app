import React from "react";
import { Box, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md"; // Import both icons
import useFavorites from "../shared/hooks/useFavorites"; // Import the custom hook
import useToast from "../shared/hooks/useToast";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const showToast = useToast();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites(); // Use the hook

  // Handle product detail navigation
  const handleDetailProduct = () => {
    navigate("/product");
  };

  // Handle adding/removing the product to/from favorites
  const handleToggleFavorites = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
      showToast("Đã xóa khỏi danh sách yêu thích!"); // Show toast message for removing from favorites
    } else {
      addToFavorites(product);
      showToast("Đã thêm vào danh sách yêu thích!"); // Show toast message for adding to favorites
    }
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
        {/* Toggle between favorite and non-favorite icons on click */}
        <span onClick={handleToggleFavorites}>
          <Box className="product-icon">
            {isFavorite(product.id) ? <MdFavorite /> : <MdFavoriteBorder />}
          </Box>
        </span>
      </Text>
    </div>
  );
};

export default ProductItem;
