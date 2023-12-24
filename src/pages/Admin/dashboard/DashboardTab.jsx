import React, { useContext, useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Contextstore from '../../../context/Data/StoreContext';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from 'react-icons/ai';
import AddProduct from '../pages/Addproduct';
import DeleteModal from '../../../components/model/Model';
import { FaArrowDown } from "react-icons/fa6";

function DashboardTab() {
    const context = useContext(Contextstore)
    const { mode, isOpen, setIsOpen, Adminorder, AllUsers, Loading, AllProduct, deleteProduct } = context
    const [OpenDelectmodel, setOpenDelectmodel] = useState(false)
    const [productId, setproductId] = useState()
    const updateproduct = (id) => {
        setIsOpen(true)
        setproductId(id)
    }
 
    
    
    const Delectmodelhanle = (id) => {
        setproductId(id)
        setOpenDelectmodel(true)
    }
    const formatDate = (timestamp) => {
        const milliseconds = timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1e6);
        const dateObject = new Date(milliseconds);

        // Format the date as needed
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short'
        };
        return dateObject.toLocaleString('en-US', options);
    };
    const [expandedItems, setExpandedItems] = useState({});

    const toggleExpanded = (orderId) => {
        setExpandedItems((prevExpandedItems) => ({
            ...prevExpandedItems,
            [orderId]: !prevExpandedItems[orderId],
        }));
    };
    return (
        <>
            <div className="container mx-auto">
                <div className="tab container mx-auto ">
                    <Tabs defaultIndex={0} className=" " >
                        <TabList className="md:flex md:space-x-8 bg-  grid grid-cols-2 text-center gap-4   md:justify-center mb-10 ">
                            <Tab>
                                <button type="button" className="font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]  px-5 py-1.5 text-center bg-[#605d5d12] ">
                                    <div className="flex gap-2 items-center">
                                        <MdOutlineProductionQuantityLimits />Products</div> </button>
                            </Tab>
                            <Tab>
                                <button type="button" className="font-medium border-b-2 border-pink-500 bg-[#605d5d12] text-pink-500  hover:shadow-pink-700  rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]    px-5 py-1.5 text-center ">
                                    <div className="flex gap-2 items-center">
                                        <AiFillShopping /> Order
                                    </div>
                                </button>
                            </Tab>
                            <Tab>
                                <button type="button" className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl  hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]   px-5 py-1.5 text-center ">
                                    <div className="flex gap-2 items-center">
                                        <FaUser /> Users
                                    </div>
                                </button>
                            </Tab>
                        </TabList>
                        {/* product  */}
                        <TabPanel>
                            <div className='  px-4 md:px-0 mb-16'>
                                <h1 className=' text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>Product Details</h1>
                                <div className=" flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(true)}
                                        className="focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} > <div className="flex gap-2 items-center">
                                            Add Product <FaCartPlus size={20} />
                                        </div></button>
                                </div>
                                <div className="relative overflow-x-auto ">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                        <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    S.No
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Image
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Title
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Price
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Category
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className='' style={{ color: mode === 'dark' ? 'white' : '' }}>
                                            {AllProduct?.map((item, index) => (
                                                <tr className="bg-gray-50 border-b  dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {index + 1}.
                                                    </td>
                                                    <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                                        <img className='w-16' src={item?.imageurl} alt="img" />
                                                    </th>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {item.title}
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        ₹ {item.price}
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {item?.category}
                                                    </td>
                                                    <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {item.date}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className=" flex gap-2">
                                                            <div className=" flex gap-2 cursor-pointer text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                <div onClick={() => Delectmodelhanle(item.id)} >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                    </svg>
                                                                </div>
                                                                <div onClick={() => updateproduct(item)} >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {AllProduct.length === 0 &&
                                                <tr className="bg-gray-50 border-b dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                                                    <td colSpan="6" className='w-full text-center p-2'>
                                                        {!Loading ? (
                                                            'No data available in table'
                                                        ) : (

                                                            <svg aria-hidden="true" className="w-6 h-6 text-gray-300 m-auto  animate-spin fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                            </svg>
                                                        )}
                                                    </td>
                                                </tr>}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            {/* <Order order={order} setOrder={setOrder} setLoading={setLoading} /> */}
                            <div className="relative overflow-x-auto mb-16">
                                <h1 className=' text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>Order Details</h1>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" style={{ color: mode === 'dark' ? 'white' : '' }} >
                                    <thead className="text-xs text-black uppercase bg-gray-200 " style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Order Id
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Image
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Title
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Price
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Category
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Date
                                            </th>
                                           
                                        </tr>
                                    </thead>
                                    <tbody >

                                        {Adminorder.map((order) => (
                                            <React.Fragment key={order.id}>
                                                {/* Main order row */}
                                                <tr
                                                    className="bg-gray-50 border-b dark:border-gray-700 cursor-pointer"
                                                    style={{
                                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                                        color: mode === 'dark' ? 'white' : '',
                                                    }}
                                                    onClick={() => toggleExpanded(order.id)}
                                                >
                                                    {/* Render main order details */}
                                                    <td className="px-6 py-4 text-black" style={{
                                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                                        color: mode === 'dark' ? 'white' : '',
                                                    }} >User ID: {order.id}</td>
                                                    <td className="px-6 py-4 text-black"  style={{
                                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                                        color: mode === 'dark' ? 'white' : '',
                                                    }}> <FaArrowDown /></td>

                                                    <td className="px-6 py-4 text-black" style={{
                                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                                        color: mode === 'dark' ? 'white' : '',
                                                    }}> <FaArrowDown /></td>
                                                    <td className="px-6 py-4 text-black" style={{
                                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                                        color: mode === 'dark' ? 'white' : '',
                                                    }}> <FaArrowDown /></td>
                                                    <td className="px-6 py-4 text-black" style={{
                                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                                        color: mode === 'dark' ? 'white' : '',
                                                    }}> <FaArrowDown /></td>
                                                    <td className="px-6 py-4 text-black" style={{
                                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                                        color: mode === 'dark' ? 'white' : '',
                                                    }}> <FaArrowDown /></td>
                                                






                                                    {/* Other fields from the order object */}
                                                </tr>
                                                {expandedItems[order.id] && (
  <tr>
    <td colSpan="11">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-center"  style={{
                                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                                        color: mode === 'dark' ? 'white' : '',
                                                    }}>
        <thead className="text-xs text-black uppercase bg-gray-200" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
          <tr>
            <th className="px-6 py-3" style={{
                                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                                        color: mode === 'dark' ? 'white' : '',
                                                    }}>Item ID</th>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Date</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody >
          {order.items.map((item) => (
            <tr key={item.id} className="bg-gray-50 border-b dark:border-gray-700 py-4 cursor-pointer"  style={{
                backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                color: mode === 'dark' ? 'white' : '',
            }}>
              {/* Render details for each nested item */}
              {/* Add your nested table row details here */}
              <td className="text-black w-[320px]" style={{
                                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                                        color: mode === 'dark' ? 'white' : '',
                                                    }}>{item.id}</td>
              <td className="py-4 text-black w-[80px]">
                <img className="w-16" src={item?.imageurl} alt="img" />
              </td>
              <td className="px-6 py-4 text-black w-[80px]" style={{
                                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                                        color: mode === 'dark' ? 'white' : '',
                                                    }}>{item.title}</td>
              <td className="px-6 py-4 text-black w-[80px]"  style={{
                                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                                        color: mode === 'dark' ? 'white' : '',
                                                    }}>{item.price}</td>
              <td className="px-6 py-4 text-black w-[80px]" style={{
                                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                                        color: mode === 'dark' ? 'white' : '',
                                                    }}>{item.category}</td>
              <td className="px-6 py-4 text-black" style={{
                                                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                                        color: mode === 'dark' ? 'white' : '',
                                                    }}>{item.date}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </td>
  </tr>
)}

                                            </React.Fragment>
                                        ))}

                                    </tbody>
                                </table>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            {/* <User addressInfo={addressInfo} setAddressInfo={setAddressInfo} setLoading={setLoading} /> */}
                            <div className="relative overflow-x-auto mb-10">
                                <h1 className=' text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === 'dark' ? 'white' : '' }}>User Details</h1>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-black uppercase bg-gray-200 " style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                S.No
                                            </th>

                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>

                                            <th scope="col" className="px-6 py-3">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {AllUsers?.map((item, index) => (
                                            <tr className="bg-gray-50 border-b  dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    {index + 1}.
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    {item.name}
                                                </td>

                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    {item.email}
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    {formatDate(item.time)}
                                                </td>

                                            </tr>
                                        ))}
                                        {AllUsers.length === 0 &&
                                            <tr className="bg-gray-50 border-b dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                                                <td colSpan="6" className='w-full text-center p-2'>
                                                    {!Loading ? (
                                                        'No data available in table'
                                                    ) : (

                                                        <svg aria-hidden="true" className="w-6 h-6 text-gray-300 m-auto  animate-spin fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                    )}
                                                </td>
                                            </tr>}
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>

                    </Tabs>
                </div>
                <AddProduct setproductId={setproductId} productId={productId} />
                <DeleteModal Open={OpenDelectmodel} setOpen={setOpenDelectmodel} onDelete={deleteProduct} productId={productId} setproductId={setproductId} />
            </div>
        </>
    )
}


export default DashboardTab