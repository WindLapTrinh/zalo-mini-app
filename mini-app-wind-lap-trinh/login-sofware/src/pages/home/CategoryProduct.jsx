import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "zmp-ui";
import { TiShoppingCart } from "react-icons/ti";
import "../../css/detailhome/swiper/swiper-bundle.min.css";

const categories = [
  {
    id: 1,
    name: "Thịt heo xay",
    image: "/images/product/flesh-1.jpg",
    price: 20000,
  },
  {
    id: 2,
    name: "Bẹ sườn non",
    image: "/images/product/flesh-2.jpg",
    price: 342000,
  },
  {
    id: 3,
    name: "Tôm thẻ Minh Phú",
    image: "/images/product/seafood-1.jpg",
    price: 678000,
  },
  {
    id: 4,
    name: "Gà H'Mông nguyên con",
    image: "/images/product/flesh-3.jpg",
    price: 780000,
  },
  {
    id: 5,
    name: "Mực nang Phú Quốc",
    image: "/images/product/seafood-2.jpg",
    price: 342000,
  },
  {
    id: 6,
    name: "Thịt vụn bò",
    image: "/images/product/flesh-4.jpg",
    price: 120000,
  },
  {
    id: 7,
    name: "Hàu sashiml",
    image: "/images/product/seafood-3.jpg",
    price: 60000,
  },
  {
    id: 8,
    name: "Cá Basa cắt lát",
    image: "/images/product/flesh-5.jpg",
    price: 48000,
  },
  {
    id: 9,
    name: "Mực nút",
    image: "/images/product/seafood-4.jpg",
    price: 230000,
  },
  {
    id: 10,
    name: "Mực ống",
    image: "/images/product/seafood-5.jpg",
    price: 206000,
  },
];

const CategoryProduct = () => {

  const navigate =  useNavigate();
  
  const handleDetailProduct = () => {
    navigate("/detailProduct");
  };
  return (
    <Box className="product-today">
      <div className="icon-product-today"><TiShoppingCart/></div>
      <Text.Title size="small" className="title-product">
        Dịch vụ của chúng tôi
      </Text.Title>
      <Box mt={2} className="category-product">
        <Box className="slider-category  p-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="custom-slider-item flex flex-col space-y-2 items-center category-item"
              onClick={handleDetailProduct}
            >
              <img
                className=" custom-border-image"
                src={category.image}
                alt={category.name}
              />
              <Text size="xxSmall" className="custom-text-gray">
                <span className="name-product-today">
                  {category.name.length > 18
                    ? `${category.name.substring(0, 18)}...`
                    : category.name}
                </span>
                <span className="price-product-today">{category.price.toLocaleString("vi-VN")} đ</span>
              </Text> 
            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryProduct;
