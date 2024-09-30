import React from "react";
import { Box, Icon, Button, Text } from "zmp-ui";
import { CiShop } from "react-icons/ci";
import "../../css/evaluate/home.css";

const ProductNotEvaluate = () => {
  return (
    <Box className="page-not-evaluate">
      <Box className="item-not-evaluate">
        <Box className="product-not-evaluate">
          <Box className="header-not-evaluate">
            <CiShop className="icon-not-evaluate" />
            <h3 className="title-not-evaluate">iPhone 15 ProMax</h3>
          </Box>
          <Box className="body-not-evaluate">
            <img
              src="./images/product/iphone-15-promax-den-1.jpg"
              alt="Product"
              className="img-not-evaluate"
            />
            <p className="description-not-evaluate">
              iPhone 15 Pro Max sáng tạo độc đáo, mẫu 256 GB là một sự lựa chọn
              tốt giành cho bạn
            </p>
          </Box>
          <Box className="footer-not-evaluate">
            <span className="note-not-evaluate">
              Chỉ còn 20 ngày để đánh giá
            </span>
            <Box className="btn-evaluate">
              <Text className="name-btn-evaluate">Đánh giá</Text>
              <img
                className="img-coin"
                src="./images/icon/icon-coin.png"
                alt=""
              />
              <Text className="point-evaluate">+200</Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="item-not-evaluate">
        <Box className="product-not-evaluate">
          <Box className="header-not-evaluate">
            <CiShop className="icon-not-evaluate" />
            <h3 className="title-not-evaluate">Macbook 15 in M2 Pro</h3>
          </Box>
          <Box className="body-not-evaluate">
            <img
              src="./images/product/macbook-air-m3-13-2024-bac-1.jpg"
              alt="Product"
              className="img-not-evaluate"
            />
            <p className="description-not-evaluate">
              Macbook 15 in M2 Pro sáng tạo độc đáo, mẫu 526 GB là một sự lựa
              chọn tốt giành cho bạn
            </p>
          </Box>
          <Box className="footer-not-evaluate">
            <span className="note-not-evaluate">
              Chỉ còn 8 ngày để đánh giá
            </span>
            <Box className="btn-evaluate">
              <Text className="name-btn-evaluate">Đánh giá</Text>
              <img
                className="img-coin"
                src="./images/icon/icon-coin.png"
                alt=""
              />
              <Text className="point-evaluate">+400</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default ProductNotEvaluate;
