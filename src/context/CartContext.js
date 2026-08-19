import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const findSizeKey = (sizeMap, querySize) => {
  if (!sizeMap || !querySize) return null;
  const normalizedQuery = String(querySize).trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Try exact match first
  for (const key of Object.keys(sizeMap)) {
    if (key.toLowerCase() === querySize.toLowerCase()) return key;
  }
  
  // Try normalized match (e.g. "500l" vs "500l")
  for (const key of Object.keys(sizeMap)) {
    const normKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normKey === normalizedQuery) return key;
  }
  
  // Try matching digits only (e.g. "500" vs "500L")
  const digitsQuery = normalizedQuery.replace(/[^0-9]/g, '');
  if (digitsQuery) {
    for (const key of Object.keys(sizeMap)) {
      const digitsKey = key.toLowerCase().replace(/[^0-9]/g, '');
      if (digitsKey === digitsQuery) return key;
    }
  }
  
  return null;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1, size = '') => {
    const itemSize = size || '';
    const matchedSizeKey = product.sizeProductCodes ? findSizeKey(product.sizeProductCodes, itemSize) : null;
    const matchedPackKey = product.packSizes ? findSizeKey(product.packSizes, itemSize) : null;
    const finalSize = matchedSizeKey || itemSize;

    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => 
        (item.productId === product.id || item.productId === product.productId) &&
        (item.size === finalSize || (!item.size && !finalSize))
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
            categoryName: product.categoryName || '',
            subCategoryName: product.subCategoryName || product.subcategoryId || '',
            quantity: quantity,
            size: finalSize,
            productCode: matchedSizeKey ? (product.sizeProductCodes[matchedSizeKey] || '') : '',
            packing: matchedPackKey ? (product.packSizes[matchedPackKey] || '') : (product.packing || product.packSize || '')
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
