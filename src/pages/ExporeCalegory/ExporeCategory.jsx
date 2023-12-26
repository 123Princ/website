import React, { useContext } from 'react'
import Contextstore from '../../context/Data/StoreContext'
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';

const ExporeCategory = () => {
    const {Loading,AllProduct,mode}=useContext(Contextstore)
   const navigate =useNavigate()
    const uniqueCategories = [...new Set(AllProduct.map((item) => item.category ))];
         const product = AllProduct.filter((item,index)=>item.category === uniqueCategories[index] )
  return (
    <div>
        <section className="text-gray-600 body-font" >
          {Loading && <Loader/>}
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Explore Calegories</h1>
                    <div class="h-1 w-20 bg-pink-600 rounded"></div>
                </div>

                <div className="flex flex-wrap -m-4">
                {product?.length === 0 && (
          <div className="p-4 md:w-full">
              <p>No results found.</p>
          </div>
  )}
                    {product
                        ?.map((item,index) => (
                            <div className="p-4 md:w-1/4  drop-shadow-lg " onClick={()=>navigate(`productfilter/${item.category}`)} >
                                <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                    <div className="flex justify-center cursor-pointer" >
                                        <img className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out" src={item?.imageurl} alt="blog" />
                                    </div>
                                    <div className="p-5 border-t-2">
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>E-Bharat</h2>
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>{item.category}</h1>
                                      
                                    </div>

                                </div>
                            </div>
                        ))
                    }





                </div>

            </div>
        </section >
    </div>
  )
}

export default ExporeCategory
