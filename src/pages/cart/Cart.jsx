import React, { useContext, useState } from 'react'
import Contextstore from '../../context/Data/StoreContext';
import Layout from '../../components/layout/layout';
import DeleteModal from '../../components/model/Model';
import { Transition } from '@headlessui/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import OrderModel from '../../components/oderMOdel/OrderModel';



function Cart() {

    const context = useContext(Contextstore)
    const { mode, Cartproducts,isOpen,setIsOpen, Loading, setLoading, getUserCartData } = context;
    const [isVisible, setIsVisible] = useState(false);
    const [showLoading, setshowLoading] = useState(false);
    const [cartId, setcartId] = useState()
    function truncateText(text, limit) {
        const firstSentence = text?.match(/[^.!?]*[.!?]/);
        const truncated = firstSentence ? `${firstSentence?.[0]?.slice(0, limit)}...` : firstSentence?.[0];
        return truncated || text;
    }
    // Calculate subtotal
    const subtotal = Cartproducts.reduce((acc, item) => acc + (Number(item?.price) * item.quantity), 0);

    // Calculate shipping based on subtotal
    let shipping = 100; // Default shipping cost
    if (subtotal > 300) {
        shipping = 0; // Change shipping cost if subtotal is above 300
    }

    // Calculate total
    const total = subtotal + shipping;

    const DelectCartItem = (id) => {
        setIsVisible(true)
        setcartId(id)
    }

    // Assuming this function is inside your component
    const removeFromCart = async (itemId, closeModal) => {
        const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);

        try {
            const cartRef = doc(fireDB, 'carts', user?.user?.uid);
            const cartSnap = await getDoc(cartRef);

            if (cartSnap.exists()) {
                const cartData = cartSnap.data();

                // Remove the item from the cart based on its ID
                const updatedItems = cartData?.items.filter((item) => item.id !== itemId);

                // Update the cart with the modified items
                await updateDoc(cartRef, { items: updatedItems });
                setshowLoading(false)

                toast.success('Item removed successfully from the cart!')
                // Set the updated cart products in your state
                getUserCartData()
                // if (typeof closeModal === 'function') {
                //     closeModal(true);
                // }
                setIsVisible(false)
                setcartId("")
                setLoading(false);
            } else {
                // Handle the case when the cart document doesn't exist
                setLoading(false);
            }
        } catch (error) {
            toast.error('Error removing item from the cart:', error?.message);
            console
        }
    };

    // Usage of removeFromCart function (call this when you want to remove an item)

    const updateQuantityInCart = async (userId, productId, newQuantity) => {
        try {
            const cartRef = doc(fireDB, 'carts', userId);
            const cartSnap = await getDoc(cartRef);

            if (cartSnap.exists()) {
                const cartData = cartSnap.data();
                const updatedItems = cartData.items.map(item => {
                    if (item.id === productId) {
                        // Ensure the new quantity doesn't go below 1
                        item.quantity = Math.max(1, newQuantity);
                    }
                    return item;
                });

                await updateDoc(cartRef, { items: updatedItems });
                return 'Quantity updated in the cart!'
            } else {
                return 'Cart not found!';
            }
        } catch (error) {
            throw new Error('Error updating quantity in cart: ' + error.message);
        }
    };
    const increaseProductQuantity = async (productId) => {
        if (showLoading) {
            return
        }
        setshowLoading(true)

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user?.user.uid;

            const res = await updateQuantityInCart(userId, productId.id, productId.quantity + 1);
            if (res) {
                getUserCartData()
                setshowLoading(false)
                toast.success('Quantity increased for the product in the cart!');

            }
        } catch (error) {
            setshowLoading(false)

            toast.error('Error increasing quantity:', error.message);
        }
    };

    const decreaseProductQuantity = async (productId) => {
        if (showLoading) {
            return
        }
        setshowLoading(true)


        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user?.user.uid;
            if (productId.quantity === 1) {
                return removeFromCart(productId.id)
            } else {

                const res = await updateQuantityInCart(userId, productId.id, Math.max(1, productId.quantity - 1));
                if (res) {
                    getUserCartData()
                    setshowLoading(false)
                    toast.success('Quantity decreased for the product in the cart!');

                }
            }
        } catch (error) {
            setshowLoading(false)

            toast.error('Error decreasing quantity:', error.message);
        }
    };




    return (
        <Layout >
            {showLoading &&
                <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="text-gray-300">

                        <svg aria-hidden="true" className="w-6 h-6 text-gray-300 animate-spin fill-violet-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                </div>}
            <div className="bg-gray-100 pt-5" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
                    <div className="flex-1 ">
                        {Cartproducts.map((item) => (
                            <div key={item.id} className="w-full mb-4">
                                <div className="rounded-lg border drop-shadow-xl max-w-full flex flex-col h-full bg-white p-6 relative">
                                    <div className="absolute top-2 right-2" onClick={() => DelectCartItem(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-wrap">
                                        <img src={item?.imageurl} alt="product-image" className="w-full rounded-lg mb-4 sm:w-40 sm:mx-auto" />
                                        <div className="text-center sm:text-left">
                                            <h2 className="text-lg font-bold text-gray-900 ">{item?.title}</h2>
                                            <h2 className="text-sm mt-2 text-gray-900">{truncateText(item?.description)}</h2>
                                            <p className="mt-1 text-xs font-semibold font-bold mt-3 text-gray-700">₹ {item?.price}</p>
                                        </div>
                                        <div className="flex items-center mt-3 ml-5 sm:ml-0"> {/* Adjusted margin for small screens */}
                                            <button className="bg-gray-200 px-2 sm:px-3 py-1 rounded-l" onClick={() => decreaseProductQuantity(item)}> {/* Adjusted padding for small screens */}
                                                -
                                            </button>
                                            <span className="px-2 font-bold sm:px-3">{item?.quantity}</span>
                                            <button className="bg-gray-200 px-2 sm:px-3 py-1 rounded-r" onClick={() => increaseProductQuantity(item)}> {/* Adjusted padding for small screens */}
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}


                        {!Loading && Cartproducts.length === 0 ? (
                            <div className="flex justify-center items-center h-screen">
                                <p className="text-gray-700 text-xl">Your cart is empty!</p>
                            </div>
                        ) : Cartproducts.length === 0 && (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-gray-700 text-xl"> <svg aria-hidden="true" className="w-6 h-6 text-gray-300 animate-spin fill-violet-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg></p>
                            </div>
                        )
                        }
                    </div>


                    {Cartproducts.length > 0 && <div className="mt-6 mb-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
                            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹ {subtotal}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
                            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹ {shipping}</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between mb-3">
                            <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
                            <div className>
                                <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹ {total}</p>
                            </div>
                        </div>
                        {/* <Modal  /> */}
                        <button
                            type="button"
                            onClick={()=>setIsOpen(true)}
                            className="w-full  bg-violet-600 py-2 text-center rounded-lg text-white font-bold "
                        >
                            Buy Now
                        </button>
                    </div>
                    }
                </div>
            </div>
            <Transition show={isVisible} >

                <DeleteModal setOpen={setIsVisible} Open={isVisible} productId={cartId} onDelete={removeFromCart} />
            </Transition>
            <Transition show={isOpen}  >

            <OrderModel setIsOpen={setIsOpen} isOpen={isOpen} total={total} productitem={Cartproducts}/>
            </Transition>

        </Layout>
    )
}

export default Cart