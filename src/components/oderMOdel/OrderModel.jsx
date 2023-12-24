import { Dialog, Transition } from '@headlessui/react'
import { useFormik } from 'formik'
import { Fragment, useContext, useState } from 'react'
import OrdeNOwSchema from '../validationSchema/OrderNowShema'
import PrimaryButton from '../Button/PrimaryButton'
import {  doc, updateDoc,deleteDoc, getDoc, setDoc } from 'firebase/firestore'
import { fireDB } from '../../firebase/FirebaseConfig'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Contextstore from '../../context/Data/StoreContext'

const OrderModel = ({ isOpen, setIsOpen, total, productitem }) => {


    const {getUserCartData}=useContext(Contextstore)
    function closeModal() {
        setIsOpen(false)
    }
    const formik = useFormik({
        initialValues: {
            name: "",
            address: '',
            pincode: '',
            mobileNumber: "",
        },
        validationSchema: OrdeNOwSchema,
        onSubmit: (values, { resetForm }) => {
            // Handle form submission here()
            console.log(values, "pp")
            setIsOpen(false)
            BuyNow(values)
            // You can make API calls, etc.
        },
    })

    function openModal() {
        setIsOpen(true)
    }

    const BuyNow = async (value) => {


        var options = {
            key: "rzp_test_ksgymYEsJMcWjU",
            key_secret: "7o67YkcgZUKiN4lMMxAcT1in",
            amount: parseInt(total * 100),
            currency: "INR",
            order_receipt: 'order_rcptid_' + value.name,
            name: "E-Bharat",
            description: "for testing purpose",
            handler: async function (response) {
                // console.log(response)
                toast.success('Payment Successful');
                const paymentId = response.razorpay_payment_id;
                // store in firebase 
                const orderInfo = {
                    ...productitem,
                    date: new Date().toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    ),
                    email: JSON.parse(localStorage.getItem("user")).user.email,
                    userid: JSON.parse(localStorage.getItem("user")).user.uid,
                    paymentId
                };

                storeOrderInFirebase(productitem)
                removeAllItemsFromUserCart()
            },


            theme: {
                color: "#3399cc"
            }
        };
        var pay = new window.Razorpay(options);
        pay.open();
    }

    //     try {
    //         const cartRef = doc(fireDB, 'orders', user?.user.uid);
    
    //         // Check if the user's cart document exists
    //         const cartSnap = await getDoc(cartRef);
    //         const cartData = cartSnap.exists() ? cartSnap.data().items : []; // Get cart items
    //         console.log(cartData,"cartData")
    
    //         if (cartSnap.exists()) {
    //             // If the cart has items, merge existing and new items based on ID match
    //             const updatedItems = [...cartData,...productItems];
            
    // console.log(updatedItems,"updatedItems")
    //             // Update the cart document with the modified items array
    //             await updateDoc(cartRef, { items: updatedItems });
    
    //         } else {
    //             // If the cart document doesn't exist, create a new cart with the product items
    //             await setDoc(cartRef, { items: productItems });
    //         }
    
    //         // Fetch and return the updated cart data
         
    
    //     } catch (error) {
    //         console.error(error);
    //         throw error; // Rethrow the error for the caller to handle
    //     }
    // };
    
    const storeOrderInFirebase = async (productItems) => {
        const user = JSON.parse(localStorage.getItem('user'));
    
        try {
            const cartRef = doc(fireDB, 'orders', user?.user.uid);
            const cartSnap = await getDoc(cartRef);
    
            const currentDate = new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            });
    
            if (cartSnap.exists()) {
                const cartData = cartSnap.data();
                const updatedItems = productItems.map(item => ({
                    ...item,
                    date: currentDate // Add the date field to each item
                }));
    
                // Concatenate existing items with new items
                const allItems = [...cartData.items, ...updatedItems];
                console.log("All items:", allItems);
    
                // Update the cart document with the updated items array
                await updateDoc(cartRef, { items: allItems });
                getUserCartData()
            } else {
                // If the cart doesn't exist, set the new items with the date field
                const itemsWithDate = productItems.map(item => ({
                    ...item,
                    date: currentDate // Add the date field to each item
                }));
                await setDoc(cartRef, { items: itemsWithDate });
                getUserCartData()
            }
        } catch (error) {
            toast.error('Error adding products to cart:', error?.message);
        }
    };
    const removeAllItemsFromUserCart = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        try {
            const cartRef = doc(fireDB, 'carts', user?.user?.uid); // Reference to the user's cart
    
            // Get all documents (items) in the user's cart
            const snapshot = await getDoc(cartRef);
    
            if (snapshot.exists()) {
                await deleteDoc(cartRef);
                console.log('User\'s cart removed successfully!');
            } else {
                console.log('User\'s cart does not exist.');
            }
    
        } catch (error) {
            console.error('Error removing items from the user\'s cart:', error);
        }
    };
    
    // Usage example - pass the user ID as an argument
    const userId = 'your_user_id_here'; // Replace this with the actual user ID
    removeAllItemsFromUserCart(userId);
    
    
   
        
    
    
    // Example usage:


    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-2  text-left align-middle shadow-xl transition-all bg-gray-50">

                                <section className="">
                                    <div className="flex flex-col items-center justify-center py-8 mx-auto  lg:py-0">
                                        {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                                    Flowbite
                                </a> */}
                                        <div className="w-full  rounded-lg md:mt-0 sm:max-w-md xl:p-0 ">
                                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                                                <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit} action="#">
                                                    <div>
                                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Enter Full Name</label>
                                                        <input type="name" name="name"
                                                            value={formik.values.name}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur} id="name" className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
                                                        {formik.touched.name && formik.errors.name ? (
                                                            <div className="text-red-500 text-sm ml-2  w-full ">
                                                                {formik.errors.name}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div>
                                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Enter Full Address</label>
                                                        <input type="text" name="address"
                                                            value={formik.values.address}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur} id="address" className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
                                                        {formik.touched.address && formik.errors.address ? (
                                                            <div className="text-red-500 text-sm ml-2  w-full ">
                                                                {formik.errors.address}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div>
                                                        <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-900">Enter Pincode</label>
                                                        <input type="text" name="pincode"
                                                            value={formik.values.pincode}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur} id="pincode" className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
                                                        {formik.touched.pincode && formik.errors.pincode ? (
                                                            <div className="text-red-500 text-sm ml-2  w-full ">
                                                                {formik.errors.pincode}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div>
                                                        <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-gray-900">Enter Mobile Number</label>
                                                        <input type="text" name="mobileNumber"
                                                            value={formik.values.mobileNumber}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur} id="mobileNumber" className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
                                                        {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                                                            <div className="text-red-500 text-sm ml-2  w-full ">
                                                                {formik.errors.mobileNumber}
                                                            </div>
                                                        ) : null}
                                                    </div>

                                                    <PrimaryButton type="submit" className="focus:outline-none w-full text-white bg-violet-600 hover:bg-violet-800  outline-0 font-medium rounded-lg text-sm px-5 py-2.5 " btnText={"Order Now"} />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default OrderModel
