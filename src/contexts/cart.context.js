import { createContext, useState, useEffect } from "react";

const CartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_CART_ITEM":
      return {};
    default:
      throw new Error(`Unhandled type ${type} in CartReducer`);
  }
};

const addCartItem = (cartItems, productToAdd) => {
  const found = [...cartItems].find((product) => product.id == productToAdd.id);
  if (found) {
    return [...cartItems].map((cartItem, idx) =>
      cartItem.id == productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  return [...cartItems].filter(
    (cartItem, idx) => cartItem.id != productToRemove.id
  );
};

const increaseCartItem = (cartItems, productToChange) => {
  return [...cartItems].map((product) =>
    product.id == productToChange.id
      ? { ...product, quantity: product.quantity + 1 }
      : product
  );
};
const decreaseCartItem = (cartItems, productToChange) => {
  if (productToChange.quantity == 1) {
    return removeCartItem(cartItems, productToChange);
  }
  return [...cartItems].map((product) =>
    product.id == productToChange.id
      ? { ...product, quantity: product.quantity - 1 }
      : product
  );
};
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addCartItem: () => {},
  cartCount: 0,
  total: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };
  const increaseQuantity = (productToChange) => {
    setCartItems(increaseCartItem(cartItems, productToChange));
  };
  const decreaseQuantity = (productToChange) => {
    setCartItems(decreaseCartItem(cartItems, productToChange));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    cartTotal,
    removeItemFromCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
