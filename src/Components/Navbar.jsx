// components/Navbar.js
import React, { useContext, useState, useEffect } from 'react';
import { FaHeart, FaCartArrowDown } from 'react-icons/fa';
import Link from 'next/link';
import { ShopContext } from '@/context/ShopContext';

const Navbar = () => {
  const { fetchData, products } = useContext(ShopContext);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const handleCategoryClick = (category) => {
    fetchData(category === 'all' ? null : category);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      fetchData(); 
      console.log(fetchData)
    } else {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      fetchData(null, filteredProducts); 
    }
  };

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white font-bold text-lg">
            <Link href="/">
              <div className="cursor-pointer">Ecommerce</div>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="lg:mr-4">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="lg:hidden">
                <FaCartArrowDown className="h-6 w-6 text-white" />
              </div>
              <div className="lg:hidden">
                <FaHeart className="h-6 w-6 text-white" />
              </div>

              <div className="hidden lg:flex items-center space-x-4">
                <Link href="/Cart">
                  <div>
                    <FaCartArrowDown className="h-6 w-6 text-white" />
                  </div>
                </Link>
                <div>
                  <FaHeart className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="p-4 mx-auto flex items-center bg-gray-800 text-white mt-2 pt-6 justify-between">
        <div onClick={() => handleCategoryClick('all')} className="cursor-pointer category">
          All Categories
        </div>
        <div onClick={() => handleCategoryClick('electronics')} className="cursor-pointer category">
          Electronic
        </div>
        <div onClick={() => handleCategoryClick('jewelery')} className="cursor-pointer category">
          Jewellery
        </div>
        <div onClick={() => handleCategoryClick(`men's clothing`)} className="cursor-pointer category">
          Man Outfit
        </div>
        <div onClick={() => handleCategoryClick(`women's clothing`)} className="cursor-pointer category">
          Women Outfit
        </div>
      </div>
    </>
  );
};

export default Navbar;
