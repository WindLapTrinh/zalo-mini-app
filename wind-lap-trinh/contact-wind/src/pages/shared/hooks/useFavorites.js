import { useState, useEffect } from 'react';

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Add a product to favorites
  const addToFavorites = (product) => {
    const existingFavorites = [...favorites];
    if (!existingFavorites.find((fav) => fav.id === product.id)) {
      const updatedFavorites = [...existingFavorites, product];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  // Remove a product from favorites
  const removeFromFavorites = (productId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== productId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Check if a product is in favorites
  const isFavorite = (productId) => {
    return favorites.some((fav) => fav.id === productId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
};

export default useFavorites;
