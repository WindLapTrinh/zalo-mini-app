import React, { useState, useEffect } from "react";
import { Box, Text } from "zmp-ui";
import { BsAndroid2 } from "react-icons/bs";
import "../../css/detailhome/swiper/swiper-bundle.min.css";
const categories = [
  {
    id: 1,
    name: "Thiết kế Website",
    image: "/images/product/desgin-webiste.jpg",
    content: "Xem thêm...",
  },
  {
    id: 2,
    name: "Thiết kế Phần mềm",
    image: "/images/product/desgin-sofware.png",
    content: "Xem thêm...",
  },
  {
    id: 3,
    name: "Zalo Mini App",
    image: "/images/product/desgin-mini-app.png",
    content: "Xem thêm...",
  },
  {
    id: 4,
    name: "Brand thương hiệu",
    image: "/images/product/brand.png",
    content: "Xem thêm...",
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
            <BsAndroid2 />
          </div>
          <Text.Title size="small" className="title-product">
            Dịch vụ Design
          </Text.Title>
        </div>
        <div className="countdown-timer">
          <img className="img-ai" src="./images/icon/icon-ai.png" alt="" />
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
                <span className="content-product-today">{category.content}</span>
              </Text>
            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryProduct;
