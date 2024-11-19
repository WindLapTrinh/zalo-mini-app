import React from "react";
import { Box, Input, Text } from "zmp-ui";
import { FaHotjar } from "react-icons/fa";
import "../../css/detailhome/product/headerListProduct.css";

const HeaderListProduct = () => {
  return (
    <div className="header-container">
      <div className="header-list-product">
        <div className="icon-list-product">
          <FaHotjar />
        </div>
        <div className="title-list-product">
          <Text>Về chúng tôi</Text>
        </div>
      </div>
      <div className="input-search-product">
        <Input.Search placeholder="tìm kiếm sản phẩm..." size="small" />
      </div>
    </div>
  );
};

export default HeaderListProduct;
