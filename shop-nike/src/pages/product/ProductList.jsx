import React from "react";
import { Box, Text } from "zmp-ui";
import ProductItem from "./ProductItem";
import { MdFavoriteBorder } from "react-icons/md";

import "../../css/product/listProduct.css";

const sampleProducts = [
  {
    id: 1,
    name: "Nike Dunk Low Retro",
    image: "/images/product/product-16.jpg",
    category: "Nike Dunk Low",
    price: 2929000,
    icon: <MdFavoriteBorder/>,
  },
  {
    id: 2,
    name: "Nike Dunk Low Retro",
    image: "/images/product/product-17.jpg",
    category: "Nike Dunk Low",
    price: 3519000,
    icon: <MdFavoriteBorder/>,
  },
  {
    id: 3,
    name: "Nike Air Force 1'07 WB",
    image: "/images/product/product-18.jpg",
    category: "Nike Air Force",
    price: 29490000,
    icon: <MdFavoriteBorder/>,
  },
  {
    id: 4,
    name: "Nike Ari Force 1'07 LV8",
    image: "/images/product/product-19.jpg",
    category: "Nike Air Force",
    price: 29490000,
    icon: <MdFavoriteBorder/>,
  },
  {
    id: 5,
    name: "Nike Dunk Low",
    image: "/images/product/product-14.jpg",
    category: "Nike Dunk Low",
    price: 2929000,
    icon: <MdFavoriteBorder/>,
  },
  {
    id: 6,
    name: "Nike Dunk Low",
    image: "/images/product/product-15.jpg",
    category: "Nike Dunk Low",
    price: 3159000,
    icon: <MdFavoriteBorder/>,
  },
  {
    id: 7,
    name: "Nike Ari Max 2013",
    image: "/images/product/product-20.jpg",
    category: "Nike Ari Max",
    price: 5279000,
    icon: <MdFavoriteBorder/>,
  },
  {
    id: 8,
    name: "Macbook Air M3 Màu Vàng",
    image: "/images/product/product-21.jpg",
    category: "Nike Ari Max",
    price: 4409000,
    icon: <MdFavoriteBorder/>,
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
