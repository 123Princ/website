import React, { useContext, useState } from 'react'
import Contextstore from '../../context/Data/StoreContext'
import { Timestamp, addDoc, getDoc, setDoc, doc, updateDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';
import PrimaryButton from '../Button/PrimaryButton';
import { Adminuser } from '../ProtectedRoutes/ProtectedRoutes';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';

function ProductCard() {
    const context = useContext(Contextstore)
    const { mode, AllProduct, filterPrice,filterType,searchkey,Loading, setLoading, getUserCartData } = context
    const [loadingStates, setLoadingStates] = useState(Array(AllProduct.length).fill(false));
const navigate =useNavigate()

    const addToCart = async (e,productId,index) => {
      e.stopPropagation();
        const newLoadingStates = [...loadingStates];
        newLoadingStates[index] = true;
        setLoadingStates(newLoadingStates);
      
        // if (Adminuser) {
        //   setLoading(false);
        //   return toast.warning('Only authorized users are allowed to add items to the cart.');
        // }
      
        const user = JSON.parse(localStorage.getItem('user'));
        const productItem = {
          ...productId,
          quantity: 1, // Corrected spelling to 'quantity'
        };
      
        try {
          // Get a reference to the user's cart document
          const cartRef = doc(fireDB, 'carts', user?.user.uid);
      
          // Check if the user's cart document exists
          const cartSnap = await getDoc(cartRef);
      
          if (cartSnap.exists()) {
            // If the cart document exists, check if the product is already in the cart
            const cartData = cartSnap.data();
            const existingItem = cartData.items.find((item) => item.id === productId.id);
      
            if (existingItem) {
              // If the product is already in the cart, update the quantity
              existingItem.quantity += 1;
              // Update the cart document with the modified items array
              await updateDoc(cartRef, { items: cartData.items });
              toast.success('Quantity updated in the cart!');
              newLoadingStates[index] = false;
              setLoadingStates(newLoadingStates);
            } else {
              // If the product is not in the cart, add it to the items array
              const updatedItems = [...cartData.items, productItem];
              // Update the cart document with the new items array
              await updateDoc(cartRef, { items: updatedItems });
              toast.success('Product added to cart successfully!');
            }
      
            getUserCartData();
            newLoadingStates[index] = false;
            setLoadingStates(newLoadingStates);
          } else {
            // If the cart document doesn't exist, create a new cart with the product ID
            await setDoc(cartRef, { items: [productItem] });
            toast.success('Cart created with the product added successfully!');
            getUserCartData();
            newLoadingStates[index] = false;
            setLoadingStates(newLoadingStates);
          }
        } catch (error) {
          toast.error('Error adding product to cart:', error?.message);
          newLoadingStates[index] = false;
          setLoadingStates(newLoadingStates);
        }
      };
      





    return (
        <section className="text-gray-600 body-font">
          {Loading && <Loader/>}
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Our Latest Collection</h1>
                    <div class="h-1 w-20 bg-pink-600 rounded"></div>
                </div>

                <div className="flex flex-wrap -m-4">
                {AllProduct.filter((obj) => obj.title.toLowerCase().includes(searchkey))
      .filter((obj) => obj.category.toLowerCase().includes(filterType))
      .filter((obj) => obj.price.includes(filterPrice)).length === 0 && (
          <div className="p-4 md:w-full">
              <p>No results found.</p>
          </div>
  )}
                    {AllProduct.filter((obj) => obj.title.toLowerCase().includes(searchkey))
                        .filter((obj) => obj.category.toLowerCase().includes(filterType))
                        .filter((obj) => obj.price.includes(filterPrice))
                        .map((item,index) => (
                            <div className="p-4 md:w-1/4  drop-shadow-lg " onClick={()=>navigate(`productinfo/${item.id}`)} >
                                <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                    <div className="flex justify-center cursor-pointer" >
                                        <img className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out" src={item?.imageurl} alt="blog" />
                                    </div>
                                    <div className="p-5 border-t-2">
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>E-Bharat</h2>
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>{item?.title}</h1>
                                        {/* <p className="leading-relaxed mb-3">{item.description.}</p> */}
                                        <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>₹ {item?.price}</p>
                                        <div className=" flex justify-center">
                                            <PrimaryButton type="button"  disabled={loadingStates[index]}
                showLoading={loadingStates[index]} btnText="Add To Cart" className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2" onClick={(e) => addToCart(e,item,index)} />

                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))
                    }





                </div>

            </div>
        </section >

    )
}

export default ProductCard