import React from "react";
import { Box, Text } from "zmp-ui";
import "../../css/detailhome/serviceStore.css";

const ServiceStore = ({ products, onServiceStoreClick }) => {
  return (
    <Box className="detail-service">
      <Box className="service-store">
        <Box className="slider-container bg-white p-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="slider-item flex flex-col space-y-2 items-center"
              onClick={() => onServiceStoreClick(product.id)}
            >
              <img
                className="w-12 h-12 boder-image"
                src={product.image}
                alt={product.name}
              />
              <Text size="xxSmall" className="text-service">
                {product.name}
              </Text>
            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ServiceStore;
