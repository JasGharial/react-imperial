// Dependencies
import { createContext, useEffect, useState } from 'react';

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if(existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== existingCartItem.id)
  }

  return cartItems.map((cartItem) =>
        cartItem.id === productToRemove.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
}

export const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id)
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  clearItemFromCart: () => { },
  cartCount: 0,
  checkoutTotal: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setcartCount] = useState(0);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  const addItemToCart = (product) =>
    setCartItems(addCartItem(cartItems, product));

  const removeItemFromCart = (product) =>
    setCartItems(removeCartItem(cartItems, product));

  const clearItemFromCart = (product) =>
    setCartItems(clearCartItem(cartItems, product));

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setcartCount(newCartCount);
  },[cartItems])

  useEffect(() => {
    const newCheckoutTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);
    setCheckoutTotal(newCheckoutTotal);
  }, [cartItems])

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, checkoutTotal, removeItemFromCart, clearItemFromCart};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};