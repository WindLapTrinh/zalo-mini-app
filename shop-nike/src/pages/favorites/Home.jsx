import React from "react";
import { Box, Text } from "zmp-ui";
import ProductItem from "../product/ProductItem";
import useFavorites from "../shared/hooks/useFavorites"; 
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation";
import CustomHeader from "../shared/pages/CustomHeader";
import UpdateFavorites from "../shared/pages/UpdateFavorites";
import "../../css/favorites/home.css";

const FavoritesPage = () => {
  const { favorites } = useFavorites(); // Get favorite products

  return (
    <Box className="page-favorites">
      <CustomHeader title={"Favorites"} />

      <Box className="box-favorites">
        {favorites.length > 0 ? (
          <Box className="category-favorites">
            <Box className="info-category-favorites">
              <img className="img-favorites" src="./images/icon/icon-new-form.png" alt="Icon shose" />
              <Text className="title-favrites">Nike Dunk Low</Text>
            </Box>
            <Box className="grid grid-cols-2 gap-4">
              {favorites.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </Box>
          </Box>
        ) : (
         <UpdateFavorites/>
        )}
      </Box>
      <CustomBottomNavigation />
    </Box>
  );
};

export default FavoritesPage;
