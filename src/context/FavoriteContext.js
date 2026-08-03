import React, { createContext, useState } from 'react';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([
    {
      id: "prod_1",
      name: "Pro-Grade Heavy Duty Safety Helmet",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&q=80",
      categoryName: "Industrial Safety"
    },
    {
      id: "prod_3",
      name: "Ergonomic Mesh Task Chair",
      image: "https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=500&q=80",
      categoryName: "Office Electronics"
    }
  ]);

  const toggleFavorite = (product) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  return (
    <FavoriteContext.Provider value={{
      favorites,
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </FavoriteContext.Provider>
  );
};
