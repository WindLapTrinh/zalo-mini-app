import React from "react";
import { Box, Text } from "zmp-ui";
import ProductItem from "./ProductItem";
import "../../css/product/listProduct.css";

const sampleProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max Titan Trắng",
    image: "/images/product/iphone-15-promax-trang-1.jpg",
    category: "iPhone 15 Pro Max",
    price: 29490000,
    icon: "zi-plus-circle-solid",
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max Titan Xanh",
    image: "/images/product/iphone-15-promax-xanh-1.jpg",
    category: "iPhone 15 Pro Max",
    price: 29490000,
    icon: "zi-plus-circle-solid",
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max Titan Đen",
    image: "/images/product/iphone-15-promax-den-1.jpg",
    category: "iPhone 15 Pro Max",
    price: 29490000,
    icon: "zi-plus-circle-solid",
  },
  {
    id: 4,
    name: "iPhone 15 Pro Max Titan Tự Nhiên",
    image: "/images/product/iphone-15-promax-xanh-vang-1.jpg",
    category: "iPhone 15 Pro Max",
    price: 29490000,
    icon: "zi-plus-circle-solid",
  },
  {
    id: 5,
    name: "Macbook Air M3 Màu Xám",
    image: "/images/product/macbook-air-m3-13-2024-xam-1.jpg",
    category: "MacBook Ari M3 13 2024",
    price: 26990000,
    icon: "zi-plus-circle-solid",
  },
  {
    id: 6,
    name: "Macbook Air M3 Màu Bạc Trắng",
    image: "/images/product/macbook-air-m3-13-2024-bac-1.jpg",
    category: "MacBook Ari M3 13 2024",
    price: 26990000,
    icon: "zi-plus-circle-solid",
  },
  {
    id: 7,
    name: "Macbook Air M3 Màu Xanh",
    image: "/images/product/macbook-air-m3-13-2024-xanh-1.jpg",
    category: "MacBook Ari M3 13 2024",
    price: 26990000,
    icon: "zi-plus-circle-solid",
  },
  {
    id: 8,
    name: "Macbook Air M3 Màu Vàng",
    image: "/images/product/macbook-air-m3-13-2024-vang-1.jpg",
    category: "MacBook Ari M3 13 2024",
    price: 26990000,
    icon: "zi-plus-circle-solid",
  },
];

const ProductList = () => {
  // Nhóm sản phẩm theo danh mục
  const groupedProducts = sampleProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <Box className="list-product">
      {Object.entries(groupedProducts).map(([category, products]) => (
        <Box key={category} mt={4}>
          <Box
            className="title-category"
            flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Text fontWeight="bold" className="title-category-product" fontSize="lg">
              {category}
            </Text>
            <Text className="all-product" fontSize="sm" color="blue" cursor="pointer">
              Tất cả
            </Text>
          </Box>
          <Box className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ProductList;
