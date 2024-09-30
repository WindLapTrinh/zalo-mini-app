import React, { useState, useEffect } from "react";
import { Box, Text, Icon} from "zmp-ui";
import { BsHandbagFill } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import "../../css/user/byback.css";
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

const ByBack = () => {
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
    <Box className="page-buy-back">
      <Box className="header-slider-buy-back mb-4">
        <div className="infomation-buy-back">
          <div className="icon-product-buy-back">
            <BsHandbagFill/>
          </div>
          <Text.Title size="small" className="title-buy-back">
            Mua lại
          </Text.Title>
        </div>
        <div className="countdown-buy-back">
           <Text className="title-seend-product">Xem thêm sản phẩm</Text>
           <Icon  className="icon-right-user" icon="zi-chevron-right"/>
        </div>
      </Box>
      <Box mt={2} className="category-buy-back">
        <Box className="slider-buy-back p-4">
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
              <span className="number-buy-back">
                  Đã mua 2 lần
                </span>
              <Box size="xxSmall" className="infomation-cart-buy">
                <Text className="price-product-buy-back">{category.price} đ</Text>
                <FiShoppingCart className="add-cart-buy"/>
              </Box>
            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ByBack;
