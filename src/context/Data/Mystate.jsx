import React, { useEffect, useState } from 'react'
import { Timestamp, addDoc,setDoc,doc,deleteDoc,getDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import Contextstore from './StoreContext'
import { toast } from 'react-toastify';
const Mystate = (props) => {
    const [mode, setMode] = useState('light');
    const [Loading, setLoading] = useState(false);
    let [isOpen, setIsOpen] = useState(false)



    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = 'white';

        }
    }


    
  const [Cartproducts, setCartProducts] = useState([])
  //get data to cart
  const getUserCartData = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
setLoading(true)
    try {
      // Assuming userId contains the user's UID
      const cartRef = doc(fireDB, 'carts', user?.user?.uid);
      const cartSnap = await getDoc(cartRef);
  
      if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        // You can manipulate or return the cart data here
        setCartProducts(cartData?.items) 
setLoading(false)

      } else {
        // Handle the case when the cart document doesn't exist
        setCartProducts([]) 
setLoading(false)

      }
    } catch (error) {
      console.error('Error fetching user cart data:', error);
      throw new Error('Error fetching user cart data');
    }
  };
  const addProduct = async (product,resetfrom) => {
      setLoading(true)
      const productRef = collection(fireDB, "products")

    try {
      await addDoc(productRef, product)
      toast.success("Product Add successfully")
      getProductData()
      resetfrom()
      setIsOpen(false)
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error(error?.message)
      setLoading(false)
    }
  }
  const deleteProduct = async (item,closeModal) => {

    setLoading(true)
    try {
      await deleteDoc(doc(fireDB, "products", item));
      toast.success('Product Deleted successfully')
      setLoading(false)
      getProductData()
      closeModal()
    } catch (error) {
      toast.success(error?.message)
      setLoading(false)
    }
  }
  const updateProduct = async (item,productId) => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, "products", item.id), item);
      toast.success("Product Updated successfully")
      getProductData();
      setIsOpen(false)
      setLoading(false)
      productId("")
    } catch (error) {
      setLoading(false)
      toast.error(error?.message)
      console.log(error)
    }
  }
  const [AllProduct, setAllProduct] = useState([]);
  const [AllUsers, setAllUsers] = useState([]);
  const [Order, setOrder] = useState([]);



  const getOrderData = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
setLoading(true)
    try {
      // Assuming userId contains the user's UID
      const cartRef = doc(fireDB, 'orders', user?.user?.uid);
      const cartSnap = await getDoc(cartRef);
  
      if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        // You can manipulate or return the cart data here
        setOrder(cartData?.items) 
setLoading(false)

      } else {
        // Handle the case when the cart document doesn't exist
        setOrder([]) 
setLoading(false)

      }
    } catch (error) {
setLoading(false)

      console.error('Error fetching user cart data:', error);
      throw new Error('Error fetching user cart data');
    }
  };
//**** get product
const addToCart = async (productId,index,setLoadingStates,loadingStates) => {
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
  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        // orderBy("time"),
        // limit(5) 
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setAllProduct(productsArray)
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  const[Adminorder,setAdminorder]=useState([])
  const getProductorder = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "orders"),
        // orderBy("time"),
        // limit(5) 
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setAdminorder(productsArray)
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  const getAllUsersData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "users"),
        // orderBy("time"),
        // limit(5) 
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setAllUsers(productsArray)
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')

  useEffect(() => {
    getProductData();
    getUserCartData()
    getAllUsersData()
    getProductorder()
    getOrderData()
  }, []);
  return (
      
      <Contextstore.Provider value={{mode,toggleMode,setLoading,searchkey,Adminorder,setSearchkey,filterType,setFilterType,filterPrice,addToCart,Cartproducts,Order,setFilterPrice,AllUsers,Loading,getUserCartData,addProduct,updateProduct,deleteProduct,isOpen,setIsOpen,AllProduct}}>
        {props.children}
      </Contextstore.Provider>
  )
}

export default Mystate
