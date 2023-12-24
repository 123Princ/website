import React  from 'react'
import Layout from '../../components/layout/layout'
import Contextstore from '../../context/Data/StoreContext'
import HeroSection from '../../components/herosection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Testimonial from '../../components/testimonial/Testimonial'
import ExporeCategory from '../ExporeCalegory/ExporeCategory'

function Home() {
  
  return (
    <Layout>
        <HeroSection/>
        <ExporeCategory/>
        <Filter/>
        <ProductCard/>
        <Testimonial/>
    </Layout>
  )
}

export default Home