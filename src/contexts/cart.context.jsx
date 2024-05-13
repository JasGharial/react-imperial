// Dependencies
import { createContext, useReducer } from 'react';

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

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'IS_CART_OPEN'
}

const INITAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  checkoutTotal: 0
}

const cartReducer = ( state, action ) => {
  const { type, payload } = action;
  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`Unhandeled type of ${type} in Cart Reducer`)
  }
}

export const CartProvider = ({ children }) => {
  const [{ cartItems, checkoutTotal, cartCount, isCartOpen }, dispatch] = useReducer(cartReducer, INITAL_STATE);

  const updateCartItmesReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

    const newCheckoutTotal = newCartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);

    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: { 
        cartItems: newCartItems,
        checkoutTotal: newCheckoutTotal,
        cartCount: newCartCount
      }
    })
  }

  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItmesReducer(newCartItems)
  }

  const removeItemFromCart = (product) => {
    const newCartItems = removeCartItem(cartItems, product);
    updateCartItmesReducer(newCartItems)
  }

  const clearItemFromCart = (product) => {
    const newCartItems = clearCartItem(cartItems, product);
    updateCartItmesReducer(newCartItems)
  }

  const setIsCartOpen = (cart_open) => {
    dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: cart_open})
  }

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, checkoutTotal, removeItemFromCart, clearItemFromCart};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};