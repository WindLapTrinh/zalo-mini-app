import React, { useState } from "react";
import { Box, Text } from "zmp-ui";

const Home = () => {
  const [favorites, setFavorites] = useState([]);

  return (
    <div>
      <Text size="large" className="favorite-title">Danh sách yêu thích</Text>
      {favorites.length === 0 ? (
        <Text size="medium">Chưa có sản phẩm nào trong danh sách yêu thích</Text>
      ) : (
        favorites.map((product, index) => (
          <Box key={index} className="favorite-item">
            <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg" />
            <Text className="favorite-item-name">{product.name}</Text>
            <Text className="favorite-item-price">{product.price.toLocaleString("vi-VN")} đ</Text>
          </Box>
        ))
      )}
    </div>
  );
};

export default Home;
