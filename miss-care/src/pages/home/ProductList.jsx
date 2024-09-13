import React from "react";
import { Box, Text } from "zmp-ui";
import ProductItem from "@/pages/home/ProductItem";
import SetTitleHeader from "@/pages/shared/hooks/setTitleHeader";
import "../../css/detailhome/product/listProduct.css";

const sampleProducts = [
  {
    id: 1,
    name: "Massage bầu thư giản",
    image: "/images/product/massage-bau-co-ban.jpg",
    category: "Chăm Sóc Bà Bầu",
    price: 29490000,
    icon: "zi-plus-circle-solid",
  },
  {
    id: 2,
    name: "Chăm sóc 5 sao",
    image: "/images/product/cham-soc-bau-vip.png",
    category: "Chăm Sóc Bà Bầu",
    price: 29490000,
    icon: "zi-plus-circle-solid",
  },
  {
    id: 3,
    name: "Bà Bầu Tại Nhà",
    image: "/images/product/ba-bau-tai-nha.jpg",
    category: "Chăm Sóc Bà Bầu",
    price: 29490000,
    icon: "zi-plus-circle-solid",
  },
  {
    id: 4,
    name: "Gội Đầu Dưỡng Sinh",
    image: "/images/product/goi-dau-duong-sinh.jpg",
    category: "Chăm Sóc Bà Bầu",
    price: 29490000,
    icon: "zi-plus-circle-solid",
  },
  {
    id: 5,
    name: "Ăn Dặm Kiểu Nhật",
    image: "/images/product/an-dam-kieu-nhat.jpg",
    category: "Chăm Sóc Bé",
    price: 26990000,
    icon: "zi-plus-circle-solid",
  },
  {
    id: 6,
    name: "Sư Phạm Mầm Non",
    image: "/images/product/su-pham-mam-non.png",
    category: "Chăm Sóc Bé",
    price: 26990000,
    icon: "zi-plus-circle-solid",
  },
  {
    id: 7,
    name: "Bơi Thủy Triều",
    image: "/images/product/bơi-thuy-trieu.jpg",
    category: "Chăm Sóc Bé",
    price: 26990000,
    icon: "zi-plus-circle-solid",
  },
  {
    id: 8,
    name: "Chăm Sóc Tại Nhà",
    image: "/images/product/cham-soc-tai-nha.jpeg",
    category: "Chăm Sóc Bé",
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
