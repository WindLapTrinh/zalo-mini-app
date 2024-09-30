import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation, Icon } from "zmp-ui";
import { BsHouse } from "react-icons/bs";
import { BsCart } from "react-icons/bs";
import { openChatScreen } from "../../pages/shared/utils/openChatScreen";

import "../../css/detailhome/bottomNavigation.css";
const CustomBottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { keyTab } = location.state || {};

  const [activeTab, setActiveTab] = useState(keyTab || "home");

  const handleHome = (keyTab) => {
    navigate("/", { state: { keyTab } });
    console.log("Tab active", keyTab);
  };
  const handleNotify = (keyTab) => {
    navigate("/notificationPage", { state: { keyTab } });
    console.log("Tab active", keyTab);
  };
  const handleCart = (keyTab) => {
    navigate("/homeCart", { state: { keyTab } });
    console.log("Tab active", keyTab);
  };
  const handleContactUser = (keyTab) => {
    navigate("/contactUser", { state: { keyTab } });
    console.log("Tab active", keyTab);
  };
  const handleMess = (keyTab) => {
    console.log("Tab active", keyTab);
  };
  return (
    <BottomNavigation
      fixed
      activeKey={activeTab}
      onChange={(key) => setActiveTab(key)}
    >
      <BottomNavigation.Item
        className={activeTab === "home" ? "icon-active" : ""}
        key="home"
        label="Home"
        icon={
          <div className="accounting-icon-wrapper">
            <BsHouse />
          </div>
        }
        activeIcon={
          <div className="accounting-icon-wrapper">
            <BsHouse />
          </div>
        }
        onClick={() => {
          handleHome("home");
        }}
      />
      <BottomNavigation.Item
        className={activeTab === "contact" ? "icon-active" : ""}
        label="Thông báo"
        key="contact"
        icon={
          <div className="accounting-icon-wrapper">
            <Icon icon="zi-clock-1" />
          </div>
        }
        activeIcon={<Icon icon="zi-clock-1-solid" />}
        onClick={() => {
          handleNotify("contact");
        }}
      />
      <BottomNavigation.Item
        className={activeTab === "cart" ? "icon-active" : ""}
        key="cart"
        label="Giỏ hàng"
        icon={
          <div className="accounting-icon-wrapper">
            <BsCart />
          </div>
        }
        activeIcon={
          <div className="accounting-icon-wrapper">
            <BsCart />
          </div>
        }
        onClick={() => {
          handleCart("cart");
        }}
      />
      <BottomNavigation.Item
        className={activeTab === "mess" ? "icon-active" : ""}
        key="mess"
        label="Nhắn tin"
        icon={
          <div className="accounting-icon-wrapper">
            <Icon icon="zi-chat" />
          </div>
        }
        activeIcon={
          <div className="accounting-icon-wrapper">
            <Icon icon="zi-chat" />
          </div>
        }
        onClick={openChatScreen}
      />
      <BottomNavigation.Item
        className={activeTab === "user" ? "icon-active" : ""}
        key="user"
        label="Cá nhân"
        icon={
          <div className="accounting-icon-wrapper">
            <Icon icon="zi-user" />
          </div>
        }
        activeIcon={
          <div className="accounting-icon-wrapper">
            <Icon icon="zi-user-solid" />
          </div>
        }
        onClick={() => {
          handleContactUser("user");
        }}
      />
    </BottomNavigation>
  );
};

export default CustomBottomNavigation;
