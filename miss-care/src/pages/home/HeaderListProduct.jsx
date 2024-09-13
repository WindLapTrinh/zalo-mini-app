import React from "react";
import { Box, Input, Text } from "zmp-ui";
import { FaHotjar } from "react-icons/fa";
import "../../css/detailhome/product/headerListProduct.css";

const HeaderListProduct = () => {
  return (
    <div className="header-container">
      <div className="header-list-product">
        <div className="icon-list-product">
          <img className="img-service-home" src="./images/category/service.png" alt="" />
        </div>
        <div className="title-list-product">
          <Text>Tất cả dịch vụ</Text>
        </div>
      </div>
      <div className="input-search-product">
        <Input.Search placeholder="tìm kiếm dịch vụ..." size="small" />
      </div>
    </div>
  );
};

export default HeaderListProduct;
