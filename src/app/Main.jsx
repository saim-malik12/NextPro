'use client'
import DataCard from '@/Components/DataCard';
import Layout from '@/Components/Layout'
import { ShopContext } from '@/context/ShopContext';

import React, { useContext } from 'react'
import Cart from './Cart/page';


function Main() {
  // const name = useContext(ShopContext)
 const {loading,error}=useContext(ShopContext)
 if (loading) {
  return <p>Loading...</p>;
}

if (error) {
  return <p>{error}</p>;
}
  
  return (
    <div>
     <Layout/>
     <DataCard/>
    {/* <Cart/> */}
     {/* <>{name}</> */}
     

    </div>
  )
}

export default Main



 

