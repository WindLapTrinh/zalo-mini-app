import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation, Icon } from "zmp-ui";
import { BsHouse } from "react-icons/bs";
import { MdManageSearch } from "react-icons/md";
import { BsHandbag } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
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

  const handleShop = (keyTab) => {
    navigate("/shop", { state: { keyTab } });
    console.log("Tab active", keyTab);
  };

  const handleFavorites =(keyTab) => {
    navigate("/favorites", {state: {keyTab}});
    console.log("Tab active", keyTab);
  }

  const handleCart = (keyTab) => {
    navigate("/cart", { state: { keyTab } });
    console.log("Tab active", keyTab);
  };

  const handleProfile = (keyTab) => {
    navigate("/profile", { state: { keyTab } });
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
        className={activeTab === "shop" ? "icon-active" : ""}
        label="Shop"
        key="shop"
        icon={
          <div className="accounting-icon-wrapper">
           <MdManageSearch/>
            <div className="red-circle">1</div>
          </div>
        }
        activeIcon={
          <div className="accounting-icon-wrapper">
            <MdManageSearch/>
            <div className="red-circle">1</div>
          </div>
        }
        onClick={() => handleShop("shop")}
      />
      <BottomNavigation.Item
        className={activeTab === "favorites" ? "icon-active" : ""}
        label="Favorites"
        key="favorites"
        icon={
          <div className="accounting-icon-wrapper">
           <MdFavoriteBorder/>
          </div>
        }
        activeIcon={
          <div className="accounting-icon-wrapper">
            <MdFavoriteBorder/>
          </div>
        }
        onClick={() => handleFavorites("favorites")}
      />
      <BottomNavigation.Item
        className={activeTab === "cart" ? "icon-active" : ""}
        key="cart"
        label="Bag"
        icon={
          <div className="accounting-icon-wrapper">
            <BsHandbag />
            {getCartCount() > 0 && <div className="red-circle">{getCartCount()}</div>}
          </div>
        }
        activeIcon={
          <div className="accounting-icon-wrapper">
            <BsHandbag />
            {getCartCount() > 0 && <div className="red-circle">{getCartCount()}</div>}
          </div>
        }
        onClick={() => handleCart("cart")}
      />
      <BottomNavigation.Item
        className={activeTab === "user" ? "icon-active" : ""}
        key="user"
        label="Profile"
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
        onClick={() => handleProfile("profile")}
      />
    </BottomNavigation>
  );
};

export default CustomBottomNavigation;
