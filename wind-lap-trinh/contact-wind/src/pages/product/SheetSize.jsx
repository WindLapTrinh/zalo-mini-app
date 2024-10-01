import React, { useState } from "react";
import { Box, Icon, Sheet, Text } from "zmp-ui";
import "../../css/product/productDetail.css";

const SheetSize = ({ visible, onClose, onSizeSelect }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    onSizeSelect(size);
    onClose();
  };
  const handleSheetSize = () =>{
    onClose();
  }

  return (
    <Sheet visible={visible} onClose={onClose} autoHeight mask swipeToClose>
      <Box className="sheet-size-selection">
        <Box className="header-sheet-size">
          <Text size="large" bold>Sizes</Text>
          <Icon icon="zi-close" onClick={() => handleSheetSize()}/>
        </Box>
        <Box className="size-list" flex flexDirection="column">
          {["US 40","US 40.5", "US 41", "US 41.5", "US 42","US 42.5", "US 43","US 43.5", "US 44", "US 44.5"].map((size) => (
            <Box
              key={size}
              className={`item-sheet-size ${selectedSize === size ? "selected" : ""}`}
              onClick={() => handleSizeSelect(size)}
            >
              <Text>{size}</Text>
              <Icon icon={selectedSize === size ? "zi-check" : ""}/>
            </Box>
          ))}
        </Box>
      </Box>
    </Sheet>
  );
};

export default SheetSize;
