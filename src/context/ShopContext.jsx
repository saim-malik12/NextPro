// context/ShopContext.js
'use client'
import React, { createContext, useState, useEffect } from 'react';

const ShopContext = React.createContext();

const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  const fetchData = async (category) => {
    try {
      const url = category
        ? `https://fakestoreapi.com/products/category/${category}`
        : 'https://fakestoreapi.com/products';
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1, totalPrice: product.price }]);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((product) => {
      if (product.id === productId) {
        const newQuantity = product.quantity + 1;
        const newTotalPrice = product.price * newQuantity;
        return { ...product, quantity: newQuantity, totalPrice: newTotalPrice };
      }
      return product;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((product) => {
      if (product.id === productId && product.quantity > 1) {
        const newQuantity = product.quantity - 1;
        const newTotalPrice = product.price * newQuantity;
        return { ...product, quantity: newQuantity, totalPrice: newTotalPrice };
      }
      return product;
    });
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.totalPrice, 0);
  };

  useEffect(() => {
    fetchData();
  }, [cart]);

  return (
    <ShopContext.Provider
      value={{
        products,
        loading,
        error,
        fetchData,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        calculateTotalPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export { ShopContext, ShopProvider };
