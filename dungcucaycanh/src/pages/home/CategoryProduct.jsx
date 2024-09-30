import React, { useState, useEffect } from "react";
import { Box, Text } from "zmp-ui";
import { IoCartSharp } from "react-icons/io5";
import "../../css/detailhome/swiper/swiper-bundle.min.css";
const categories = [
  {
    id: 1,
    name: "iPhone 13 ProMax",
    image: "/images/product/iphone-13.jpg",
    price: "13.990.000",
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max 256 GB",
    image: "/images/product/iphone_15_pro_max.png",
    price: "29.490.000",
  },
  {
    id: 3,
    name: "iPhone 11 128 GB",
    image: "/images/product/iphone_11.jpg",
    price: "10.190.000",
  },
  {
    id: 4,
    name: "iPhone 14 Pluslus 512 GB",
    image: "/images/product/iphone_14_pluspng.png",
    price: "24.990.000",
  },
];

const CategoryProduct = () => {
  const [timeRemaining, setTimeRemaining] = useState(3600); // initial time in seconds (1 hour)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return { hours, minutes, secs };
  };

  const { hours, minutes, secs } = formatTime(timeRemaining);
  return (
    <Box className="product-today">
      <Box className="header-slider-category mb-4">
        <div className="infomation-sale">
          <div className="icon-product-today">
            <IoCartSharp />
          </div>
          <Text.Title size="small" className="title-product">
            Mega Sale 50%
          </Text.Title>
        </div>
        <div className="countdown-timer">
          <div>{String(hours).padStart(2, "0")}</div>
          <div>{String(minutes).padStart(2, "0")}</div>
          <div>{String(secs).padStart(2, "0")}</div>
        </div>
      </Box>
      <Box mt={2} className="category-product">
        <Box className="slider-category p-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="custom-slider-item flex flex-col space-y-2 items-center category-item"
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
