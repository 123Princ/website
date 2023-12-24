import React from 'react'
import Layout from '../../components/layout/layout'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Testimonial from '../../components/testimonial/Testimonial'

const Allproduct = () => {
  return (
    <Layout>
       <div className='mb-4 ' >
        <img src="https://img.freepik.com/free-vector/online-shopping-banner-template_23-2148795109.jpg?w=996&t=st=1703425903~exp=1703426503~hmac=e7e4ec1dabf317512f5e28f4a7999f4f532f76e5ca2393c3a21c2de1ae98bf48" className='w-full h-90' alt="" />
    </div>
        <Filter/>
        <ProductCard/>
        <Testimonial/>
    </Layout>
  )
}

export default Allproduct
