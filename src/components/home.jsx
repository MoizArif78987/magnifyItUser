import Navbar from './navbar'
import React from 'react'
import Carousel from './carousel';
import Products from './products';
import { useEffect, useState } from 'react'
import './products.css'
import Footer from './footer';
import './home.css'

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
      async function fetchData(){
        try {
          const response = await fetch('https://road-rambunctious-column.glitch.me/getproducts');
          const responseData = await response.json();
          setProducts(responseData.products);
      } catch (error) {
          setProducts([]);
      }
      }
      fetchData();
}, []);


  
  return (
    <>
    <div className='body'>
    <Navbar/>
    <Carousel/>
    <div className='products-container'>
    {products==[]?<div>Loading</div>: products.map((product) => (
        <Products key={product.id} product={product} />
    ))}
    </div>
    <Footer/>
    </div>
    </>
  )
}
