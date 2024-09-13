import React from "react";
import { Box, Text } from "zmp-ui";
import ProductItem from "@/pages/home/ProductItem";
import SetTitleHeader from "@/pages/shared/hooks/setTitleHeader";
import "../../css/detailhome/product/listProduct.css";

const sampleProducts = [
  {
    id: 1,
    name: "Design layout Nike Shop",
    image: "/images/product/desgin-webiste.jpg",
    category: "Thiết kế Website",
    price: 16000000,
    icon: "zi-plus-circle-solid",
  },
  {
    id: 2,
    name: "Thương mại điện tử",
    image: "/images/product/desgin-sofware.png",
    category: "Thiết kế Website",
    price: 20000000,
    icon: "zi-plus-circle-solid",
  },
  {
    id: 3,
    name: "Nhà hàng CasaViet",
    image: "/images/product/website-1.png",
    category: "Thiết kế Website",
    price: 29490000,
    icon: "zi-plus-circle-solid",
  },
  {
    id: 4,
    name: "Layouts chai lọ",
    image: "/images/product/website-2.png",
    category: "Thiết kế Website",
    price: 29490000,
    icon: "zi-plus-circle-solid",
  },
];

const ProductList = () => {
  SetTitleHeader({
    title : "Danh sách sản phẩm",
});
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
