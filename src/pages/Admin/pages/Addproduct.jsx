import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import Contextstore from '../../../context/Data/StoreContext';
import { useFormik } from 'formik';
import { IoMdClose } from "react-icons/io";
import AddProductSchema from '../../../components/validationSchema/AddproductShema';

function AddProduct({ productId, setproductId }) {
    const { Loading, setLoading, addProduct,updateProduct, isOpen, setIsOpen,
    } = useContext(Contextstore)
    const closeModal = () => {
        setIsOpen(false);
        setproductId("")
        formik.resetForm();
    };
    const formik = useFormik({
        initialValues: {
            title: productId?.title ?? "",
            price: '',
            imageurl: '',
            category: "",
            description: ""
        },
        validationSchema: AddProductSchema,
        onSubmit: (values, { resetForm }) => {
            // Handle form submission here()
            const productvalues = {
                ...values,
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            }
            const updateproduct = {
                ...values,
                   id :productId?.id,
                   date:productId?.date
            }
            if(productId){
                updateProduct(updateproduct,setproductId)
            }else{

                addProduct(productvalues, resetForm)
            }
            // You can make API calls, etc.
        },
    })


    const handleOverlayClick = (event) => {
        // Close the modal if the overlay is clicked
        if (event.target.classList.contains('overlay')) {
            closeModal();
        }
    };
    useEffect(() => {
        if (productId) {
            formik.setValues({
                ...formik.values,
                title: productId.title, price: productId.price, category: productId.category, imageurl: productId?.imageurl, description: productId.description // Set the 'title' field with the productId's title
            });
        }else{
            formik.setValues({
                ...formik.values,
                title: "", price:"", category: "", imageurl: "", description: "" // Set the 'title' field with the productId's title
            }); 
        }
    }, [productId,]);
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-999" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" onClick={handleOverlayClick} />
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
                            <Dialog.Panel className="w-full max-w-md    h-screen transform overflow-hidden rounded-2xl p-2 text-left align-middle shadow-xl transition-all bg-gray-50">
                                <form onSubmit={formik.handleSubmit}>

                                    <div className=' flex justify-center items-center bg-gray-800 flex-col h-screen overflow-x-auto flex justify-center  '>
                                    <div className='flex w-full mt-10'>
    <h1 className="text-center text-white text-xl mb-4 font-bold flex-1">
      {productId ? "Update Product" : "Add Product"}
    </h1>
    <div className="flex items-center mr-3 mb-2 cursor-pointer">
      <IoMdClose color='white' size={30} onClick={closeModal} />
    </div>
    </div>

                                        <div>
                                      
                                            <input
                                                type="text"
                                                name="title"
                                                className="bg-gray-600 mb-4 px-2 py-2 w-full md:w-80 sm:w-60  lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                                                placeholder="Product title"
                                                onChange={formik.handleChange}
                                                //   onBlur={formik.handleBlur}
                                                value={formik.values?.title}
                                            />
                                            {formik.touched.title && formik.errors.title ? (
                                                <div className="text-red-500 text-sm relative ml-2 bottom-3 w-full ">
                                                    {formik.errors.title}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                name="price"
                                                className="bg-gray-600 mb-4 px-2 py-2 sm:w-60  w-full md:w-80 lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                                                placeholder="Product price"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.price}
                                            />
                                            {formik.touched.price && formik.errors.price ? (
                                                <div className="text-red-500 w-60 ml-2 text-sm relative bottom-3 w-full ">
                                                    {formik.errors.price}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                name="imageurl"
                                                className="bg-gray-600 mb-4 px-2 sm:w-60   py-2 w-full md:w-80 lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                                                placeholder="Product imageUrl"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.imageurl}
                                            />
                                            {formik.touched.imageurl && formik.errors.imageurl ? (
                                                <div className="text-red-500 text-sm ml-2 relative bottom-3 w-full ">
                                                    {formik.errors.imageurl}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                name="category"
                                                className="bg-gray-600 mb-4 px-2 py-2 w-full  sm:w-60  lg:w-[20em] md:w-80 rounded-lg text-white placeholder:text-gray-200 outline-none"
                                                placeholder="Product category"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.category}
                                            />
                                            {formik.touched.category && formik.errors.category ? (
                                                <div className="text-red-500 text-sm ml-2 relative bottom-3 w-full ">
                                                    {formik.errors.category}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div >
                                            <textarea
                                                cols="30"
                                                rows="10"
                                                name="description"
                                                className="bg-gray-600 mb-4 px-2 py-2 w-full sm:w-60  md:w-80 lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                                                placeholder="Product description"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.description}
                                            />
                                            {formik.touched.description && formik.errors.description ? (
                                                <div className="text-red-500 text-sm  ml-2 relative bottom-3 w-full ">
                                                    {formik.errors.description}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="flex  lg:w-60 justify-center mb-3">

                                            <PrimaryButton btnText={productId ? "Update Product" : "Add Product"} showLoading={Loading} type="submit" className="bg-yellow-500 w-full md:w-80 sm:w-60  text-black font-bold px-2 py-2 rounded-lg" />
                                        </div>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default AddProduct;
