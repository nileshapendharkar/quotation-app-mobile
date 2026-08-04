import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1, size = '') => {
    const itemSize = size || '';
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => 
        (item.productId === product.id || item.productId === product.productId) &&
        (item.size === itemSize || (!item.size && !itemSize))
      );
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
            quantity: quantity,
            size: itemSize
          }
        ];
      }
    });
  };

  const updateQuantity = (productId, delta, size = '') => {
    const itemSize = size || '';
    setCartItems(prev => {
      return prev.map(item => {
        if (item.productId === productId && (item.size === itemSize || (!item.size && !itemSize))) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (productId, size = '') => {
    const itemSize = size || '';
    setCartItems(prev => prev.filter(item => 
      !(item.productId === productId && (item.size === itemSize || (!item.size && !itemSize)))
    ));
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
