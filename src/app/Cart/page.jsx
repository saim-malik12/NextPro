// components/Cart.js
'use client'
// components/Cart.js
import React, { useContext } from 'react';
import { ShopContext } from '@/context/ShopContext';

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, calculateTotalPrice } = useContext(ShopContext);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={product.id} className="flex items-center justify-between border-b py-2">
              <div className="flex items-center space-x-4">
                <img src={product.image} alt={product.title} className="w-16 h-16 object-contain" />
                <div className='w-60'>
                  <p className="text-lg font-semibold">{product.title}</p>
                  <p className="text-gray-500">${product.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decreaseQuantity(product.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button
                  onClick={() => increaseQuantity(product.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(product.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <p className="text-lg font-semibold">Total Price: ${calculateTotalPrice().toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
