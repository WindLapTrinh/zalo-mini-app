import React, { useState, useEffect } from "react";
import { Box, Text } from "zmp-ui";
import { BsCardChecklist } from "react-icons/bs";
import "../../css/detailhome/swiper/swiper-bundle.min.css";
const categories = [
  {
    id: 1,
    name: "Nike Dunk Low",
    image: "/images/product/product-8.jpg",
    price: "13.990.000",
  },
  {
    id: 2,
    name: "Nike Ari Max",
    image: "/images/product/product-1.jpeg",
    price: "29.490.000",
  },
  {
    id: 3,
    name: "Nike Dunk Low",
    image: "/images/product/product-5.jpg",
    price: "10.190.000",
  },
  {
    id: 4,
    name: "JobDan Hiegh",
    image: "/images/product/product-11.jpg",
    price: "24.990.000",
  },
];

const CategoryProduct = () => {

    return (
    <Box className="product-today">
      <Box className="header-slider-category mb-4">
        <div className="infomation-sale">
          <div className="icon-product-today">
            <BsCardChecklist />
          </div>
          <Text.Title size="small" className="title-product">
           Top Picks for You
          </Text.Title>
        </div>
        <div className="countdown-timer">
          Tất cả
        </div>
      </Box>
      <Box mt={2} className="category-product">
        <Box className="slider-category p-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="custom-slider-item flex flex-col space-y-2 category-item"
            >
              <img
                className="custom-border-image"
                src={category.image}
                alt={category.name}
              />
              <Text size="xxSmall" className="custom-text-gray">
                <span className="name-product-today">
                  {category.name.length > 18
                    ? `${category.name.substring(0, 18)}...`
                    : category.name}
                </span>
                <span className="price-product-today">{category.price} đ</span>
              </Text>
            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryProduct;
