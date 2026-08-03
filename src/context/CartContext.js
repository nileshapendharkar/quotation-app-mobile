import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([
    {
      productId: "prod_1",
      productName: "Pro-Grade Heavy Duty Safety Helmet",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=500&q=80",
      quantity: 50
    },
    {
      productId: "prod_4",
      productName: "Dual-Band Enterprise Wi-Fi 6 Router",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&q=80",
      quantity: 10
    }
  ]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.productId === product.id || item.productId === product.productId);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            productId: product.id || product.productId,
            productName: product.name || product.productName,
            image: product.image,
            quantity: quantity
          }
        ];
      }
    });
  };

  const updateQuantity = (productId, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.productId === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
