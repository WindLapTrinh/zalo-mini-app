import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation, Icon } from "zmp-ui";
import { BsCart, BsHouse } from "react-icons/bs";
import "../../../css/detailhome/bottomNavigation.css";
import { useCart } from "../common/cart/CartContext";

const CustomBottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { keyTab } = location.state || {};
  const { getCartCount } = useCart();

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
    navigate("/user", { state: { keyTab } });
    console.log("Tab active", keyTab);
  };

  return (
    <BottomNavigation
      fixed
      className="bottom-navigation"
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
        onClick={() => handleHome("home")}
      />
      <BottomNavigation.Item
        className={activeTab === "contact" ? "icon-active" : ""}
        label="Thông báo"
        key="contact"
        icon={
          <div className="accounting-icon-wrapper">
            <Icon icon="zi-clock-1" />
            <div className="red-circle">1</div>
          </div>
        }
        activeIcon={
          <div className="accounting-icon-wrapper">
            <Icon icon="zi-clock-1" />
            <div className="red-circle">1</div>
          </div>
        }
        onClick={() => handleNotify("contact")}
      />
      <BottomNavigation.Item
        className={activeTab === "cart" ? "icon-active" : ""}
        key="cart"
        label="Giỏ hàng"
        icon={
          <div className="accounting-icon-wrapper">
            <BsCart />
            {getCartCount() > 0 && <div className="red-circle">{getCartCount()}</div>}
          </div>
        }
        activeIcon={
          <div className="accounting-icon-wrapper">
            <BsCart />
            {getCartCount() > 0 && <div className="red-circle">{getCartCount()}</div>}
          </div>
        }
        onClick={() => handleCart("cart")}
      />
      <BottomNavigation.Item
        className={activeTab === "user" ? "icon-active" : ""}
        key="user"
        label="Tài khoản"
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
        onClick={() => handleContactUser("user")}
      />
    </BottomNavigation>
  );
};

export default CustomBottomNavigation;
