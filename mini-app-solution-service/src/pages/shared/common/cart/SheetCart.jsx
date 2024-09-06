import React, { useState } from "react";
import { Box, Text, Button, Input, Sheet } from "zmp-ui";
import { useCart } from "./CartContext";

const SheetCart = ({ product, visible, onClose, onAddToCart, onPayment }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItemToCart } = useCart();

  const handleQuantityChange = (delta) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + delta));
  };

  const handleAddCart = () => {
    addItemToCart({ ...product, quantity });
    onAddToCart();
  };

  const handlePaymentProduct = () => {
    addItemToCart({ ...product, quantity });
    onPayment();
  };

  return (
    <Sheet
      visible={visible}
      onClose={onClose}
      autoHeight
      mask
      handler
      swipeToClose
    >
      <Box p={4} className="custom-product-item" flex flexDirection="column">
        <Box className="sheet-header-product">
          <img className="sheet-img-product" src={product.image} />
          <Text className="sheet-title-product" size="large" bold>
            {product.name}
          </Text>
          <Text>
            <span className="sheet-price-product">{product.price.toLocaleString("vi-VN")} đ</span>
          </Text>
        </Box>
        <Box
          className="sheet-body-product"
          flex
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
        >
          <Button
            className="btn-sheet-product"
            onClick={() => handleQuantityChange(-1)}
          >
            -
          </Button>
          Số lượng:
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ width: "40px", height: "40px", textAlign: "center" }}
          />
          <Button
            className="btn-sheet-increased"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </Button>
        </Box>
        <Box
          my={4}
          className="sheet-footer-product"
          flex
          flexDirection="row"
          justifyContent="space-between"
        >
          <Button
            onClick={handleAddCart}
            className="btn-sheet-cart"
          >
            Thêm vào giỏ hàng
          </Button>
          <Button
            onClick={handlePaymentProduct}
            className="btn-sheet-payment"
          >
            Mua ngay
          </Button>
        </Box>
      </Box>
    </Sheet>
  );
};

export default SheetCart;
