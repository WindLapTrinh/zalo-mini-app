import React from "react";
import { Box, Text } from "zmp-ui";

const CategoryProduct = ({ categories, gotoCategory }) => {
  return (
    <Box className="category-product">
      <Box className="bg-white grid grid-cols-4 gap-4 p-4">
        {categories.map((category, i) => (
          <div
            key={i}
            onClick={() => gotoCategory(category.id)}
            className="flex flex-col space-y-2 items-center"
          >
            <img className="w-12 h-12 border-image" src={category.icon} alt={category.name} />
            <Text size="xxSmall" className="text-gray">
              {category.name}
            </Text>
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryProduct;
