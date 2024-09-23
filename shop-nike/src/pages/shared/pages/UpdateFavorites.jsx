import React from "react";
import { Box, Text, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import Category from "../../shop/Category";
import "../styles/favorites.css";

const UpdateFavorites = () => {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate("/")
    }

  return (
    <Box className="update-favorite">
        <Box className="header-update-favorites">
          <img src="https://blog.sneakerjagers.com/de/de_de/wp-content/uploads/2020/12/Dunk-By-You-DE-Blog.gif" alt="Banner Nike" />
          <Text className="title-update-favorites">Item addted to your Favorites will be saved here.</Text>
        </Box>
        <Box className="content-update-favorite">
          <Category/>
        </Box>
    </Box>
  );
};

export default UpdateFavorites;
