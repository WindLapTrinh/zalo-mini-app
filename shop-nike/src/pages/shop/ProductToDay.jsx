import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "zmp-ui";
import { BsCardChecklist } from "react-icons/bs";
import "../../css/detailhome/swiper/swiper-bundle.min.css";
const categories = [
  {
    id: 1,
    name: "Nike Dunk Low",
    image: "/images/product/product-14.jpg",
    description: "Men's Hard Court Tennis",
    price: "13.990.000",
  },
  {
    id: 2,
    name: "Nike Ari Max",
    image: "/images/product/product-15.jpg",
    description: "Men's T-Shirt",
    price: "29.490.000",
  },
  {
    id: 3,
    name: "Nike Dunk Low",
    image: "/images/product/product-16.jpg",
    description: "Older Kids'Shoes",
    price: "10.190.000",
  },
  {
    id: 4,
    name: "JobDan Hiegh",
    image: "/images/product/product-17.jpg",
    description: "Women's Shoes",
    price: "24.990.000",
  },
];

const ProductToDay = () => {
  const navigate = useNavigate();
  const handelItemProduct = () => {
    navigate("/product");
  };

  return (
    <Box className="product-today">
      <Box className="header-slider-category mb-4">
        <div className="infomation-sale">
          <div className="icon-product-today">
            
          </div>
          <Text.Title size="small" className="title-product">
            Today's Drops: Most-Loved Nikes 
          </Text.Title>
        </div>
        <div className="countdown-timer">All</div>
      </Box>
      <Text.Title size="small" className="note-product">
       Only in the Nile App from 16-18 Sep
      </Text.Title>
      <Box mt={2} className="category-product">
        <Box className="slider-category p-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="custom-slider-item flex flex-col space-y-2 category-item"
              onClick={() => handelItemProduct()}
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

export default ProductToDay;
