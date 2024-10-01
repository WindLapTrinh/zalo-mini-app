import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "zmp-ui";
import { BsCardChecklist } from "react-icons/bs";
import "../../css/shop/category.css";
const categories = [
  {
    id: 1,
    name: "3 Days of Drops",
    image: "/images/week/anh-1.png",
  },
  {
    id: 2,
    name: "Just In: Book 1",
    image: "/images/week/anh-2.png",
  },
  {
    id: 3,
    name: "Club Third Kits",
    image: "/images/week/anh-3.jpg",
  },
  {
    id: 4,
    name: "Back to Campus Looks",
    image: "/images/week/anh-4.jpg",
  },
];

const Category = () => {
  const navigate = useNavigate();
  const handelItemProduct = () => {
    navigate("/product");
  };

  return (
    <Box className="box-week-shop">
      <Box className="slider-week-shop mb-4">
        <div className="info-week-shop">
          <Text.Title size="small" className="title-week-shop">
            This Week's Highlights
          </Text.Title>
        </div>
      </Box>
      <Box mt={2} className="category-week-shop">
        <Box className="list-week-shop p-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="custom-slider-item flex flex-col space-y-2 item-week-shop"
              onClick={() => handelItemProduct()}
            >
              <img
                className="image-week-shop"
                src={category.image}
                alt={category.name}
              />
              <Text size="xxSmall" className="name-week-shop">
                  {category.name.length > 18
                    ? `${category.name.substring(0, 18)}...`
                    : category.name}
              </Text>
            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Category;
