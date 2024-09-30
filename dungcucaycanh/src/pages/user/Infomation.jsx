import React from "react";
import { Box, Icon } from "zmp-ui";
import { FaMoneyCheckAlt } from "react-icons/fa";
import "../../css/user/home.css"; // Ensure your CSS file is imported

const Header = ({ avatar, level, balance, name }) => {
  return (
    <Box className="page-infomation-user">
      <Box className="infomation-user">
        <Box className="avatar-user">
          <img className="img-user" src={avatar} alt="" />
          <Box className="header-info">
            <p className="name-user">{name}</p>
            <Box className="infomation-level">
              <span className="level-user">{level}</span>
              <Icon className="icon-right-user" icon="zi-chevron-right" />
            </Box>
            <Box className="box-balance">
              <FaMoneyCheckAlt className="icon-balance" />
              <span className="total-balance">
                {balance.toLocaleString("vi-VN")} đ
              </span>
            </Box>
          </Box>
        </Box>
        <img className="icon-gold" src="./images/icon/icon-gold.png" alt="" />
      </Box>
    </Box>
  );
};

export default Header;
