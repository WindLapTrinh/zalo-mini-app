import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  Swiper,
  BottomNavigation,
  Icon,
  Sheet,
  Input,
} from "zmp-ui";
import SliderCategory from "./SliderProduct.jsx";
import CustomHeader from "../shared/pages/CustomHeader.jsx";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation.jsx";
import SheetSize from "./SheetSize.jsx";
import { MdFavoriteBorder } from "react-icons/md";
import parse from "html-react-parser";
import { useCart } from "../shared/common/cart/CartContext.jsx";
import useToast from "../shared/hooks/useToast.js";
import "../../css/product/productDetail.css";

const product = {
  id: 1,
  name: "Nike Dunk Low Red",
  image: "/images/product/product-23.jpg",
  price: 24490000,
  description:
    "Không thể nào thoải mái hơn - Giày Sneaker Nam Air Max 90! Đôi giày vẫn giữ nguyên những đặc trưng của dòng giày chạy bộ Nike trứ danh: với đế Waffle nổi tiếng, các lớp vải may và các chi tiết TPU cổ điển. Những màu sắc ấn tượng thể hiện phong cách mới của bạn, trong khi đệm Max Air mang lại sự thoải mái trên mọi hành trình.",
  note: `<div className="box-product-note">
            <div className="product-note">
              <img className="img-product-note" src="/images/product/customer-1.jpg" alt="Customer Nike" />
              <div className="detail-product-note">
                <h3 className="title-product-note">Authentic expressions</h3>
                <p className="des-product-note">When MJ first touched down in Paris in '85, all eyes were on him to take the global. After his picture-perfect performance in front of the Eiffel Tower, one thing immediately became evident -MJ's game needed no trasnlation. "Jordan represents so many things: surpassing oneself, success, vistory, sometimes even a littlr falure", says Parisian dancer Alou Sidibe, "What we remenber, above all, is perseverance and freatness".Calebreting this legacy and the commuities it inspired, the Ari Jordan Collection gives classic styles some Parisian flair.</p>
              </div>
            </div>
            <div className="product-note">
              <img className="img-product-note" src="/images/product/customer-2.jpg" alt="Customer Nike" />
              <div className="detail-product-note">
                <h3 className="title-product-note">Elevsted essentials</h3>
                <p className="des-product-note">Soft and lightweight, the Men's Ari Jordan 85 Crew T-Shirt enshrines MJ's 97 trip to Paris with an all-over photorealistic graphic and clean,sophisticanted silhouette.</p>
              </div>
            </div>
         </div>`,
  relatedProducts: [
    {
      id: 2,
      name: "NikeCounrt Slam",
      image: "/images/product/product-14.jpg",
      description: "Men's Dri-FIT Tennis Shorts",
      price: 10190000,
    },
    {
      id: 3,
      name: "NikeCourt Dri-FIT Victory",
      image: "/images/product/product-15.jpg",
      description: "Women's Flouncy Tennis Skirt",
      price: 24990000,
    },
    {
      id: 4,
      name: "Nike Dunk Low Red",
      image: "/images/product/product-18.jpg",
      description: "Coler Red Shoes Good",
      price: 13990000,
    },
    {
      id: 5,
      name: "Nike Dunk Lơ Green",
      image: "/images/product/product-17.jpg",
      description: "Coler Green Shoes Good",
      price: 24490000,
    },
  ],
};

const Home = () => {
  const navigate = useNavigate();
  const [sizeSheetVisible, setSizeSheetVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [toastVisible, setToastVisible] = useState(false);
  const { addItemToCart } = useCart();
  const openToast = useToast();
  // Mở Sheet chọn size
  const handleAddSize = () => {
    setSizeSheetVisible(true);
  };

  // Đóng Sheet và chọn size
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  // Thêm sản phẩm vào giỏ với size đã chọn
  const handleAddToCart = () => {
    if (selectedSize) {
      addItemToCart({ ...product, size: selectedSize, quantity });
      setToastVisible(true)
      // onAddToCart();
      openToast("Đã thêm sản phẩm vào giỏ hàng");
    } else {
      setToastVisible(true)
      openToast("Vui lòng chon size trước khi thêm sản phẩm");
    }
  };

  return (
    <Box>
      <CustomHeader title={"Nike Dunk Low"} showBackIcon={true} />
      <Box className="container-product">
        <SliderCategory />
        <Box className="product-detail">
          <Box className="product-info">
            <Text className="product-name">{product.name}</Text>
            <Text className="product-price">
              {product.price.toLocaleString("vi-VN")} đ
            </Text>
            <Text className="product-description">{product.description}</Text>
            <Text className="view-product-detail">View Product Details</Text>
            <Box className="func-product">
              <Button
                fullWidth
                className="add-to-size-button"
                onClick={() => setSizeSheetVisible(true)} // Hiển thị sheet chọn size
              >
                <Text className="title-func-product">
                  {selectedSize ? `Size ${selectedSize}` : "Select Size"}
                </Text>
                <Icon icon="zi-chevron-down" />
              </Button>
              <Button
                fullWidth
                className="add-to-cart-button"
                onClick={handleAddToCart}
              >
                Add to Bag
              </Button>
              <Button fullWidth className="add-to-size-button">
                <Text className="title-func-product">Favorite</Text>
                <MdFavoriteBorder className="icon-favorite" />
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className="infomation-product">{parse(product.note)}</Box>
        <Box className="related-products">
          <div className="icon-related-products">
            <img
              className="img-also-like"
              src="./images/icon/icon-also-like.png"
              alt=""
            />
          </div>
          <Text className="related-products-title">You Might Also Like</Text>
          <Box className="related-products-list">
            {product.relatedProducts.map((relatedProduct) => (
              <Box key={relatedProduct.id} className="related-product-item">
                <img
                  className="related-product-image"
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                />
                <Text className="related-product-name">
                  {relatedProduct.name}
                </Text>
                <Text className="related-product-price">
                  {relatedProduct.price.toLocaleString("vi-VN")} đ
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
        <Box className="navigate-product">
          <CustomBottomNavigation />
        </Box>
      </Box>
      <SheetSize
        visible={sizeSheetVisible}
        onClose={() => setSizeSheetVisible(false)}
        onSizeSelect={handleSizeSelect}
      />
    </Box>
  );
};

export default Home;
