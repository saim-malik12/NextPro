import React, { useContext, useState } from 'react';
import { ShopContext } from '@/context/ShopContext';

function DataCard() {
  const { addToCart, products, loading, error } = useContext(ShopContext);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleAddToCart = (product) => {
    addToCart(product);
    console.log(product);
  };

  const handleCardHover = (product) => {
    setHoveredProduct(product);
  };

  const handleCardLeave = () => {
    setHoveredProduct(null);
  };

  return (
    <div className="my-auto container mx-auto bg-slate-400">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-white p-3 rounded-md shadow-lg transition-transform hover:scale-105"
            onMouseEnter={() => handleCardHover(product)}
            onMouseLeave={handleCardLeave}
          >
            <div className="mb-2">
              <img src={product.image} alt={product.title} className="w-full h-32 object-contain" />
            </div>
            <div className='h-20'>
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
            </div>
            <div>
              <p className="text-gray-700 mb-2">${product.price}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-2">{product.category}</p>
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {hoveredProduct && (
        <div className="absolute top-0 right-0 left-0 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <div className="mb-2">
              <img src={hoveredProduct.image} alt={hoveredProduct.title} className="w-full h-64 object-contain" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{hoveredProduct.title}</h3>
            <p className="text-gray-700 mb-2">${hoveredProduct.price}</p>
            <p className="text-gray-500 mb-2">{hoveredProduct.category}</p>
            <button
              onClick={() => handleAddToCart(hoveredProduct)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataCard;
