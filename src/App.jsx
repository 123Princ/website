import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from '../src/pages/home/Home';
import Order from '../src/pages/order/Order';
import Cart from '../src/pages/cart/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Mystate from './context/Data/Mystate';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Siginup';
import ProductInfo from './pages/ProductInfo/ProductInfo';
import Dashboard from './pages/Admin/dashboard/Dashboard';
import Nopage from './pages/nopage/Nopage';
import { ProtectedRoutesAdmin, ProtectedRoutesUser } from './components/ProtectedRoutes/ProtectedRoutes';
import AddProduct from './pages/Admin/pages/Addproduct';
import UpdateProduct from './pages/Admin/pages/UpdateProduct';
import ScrollToTop from './components/ScrollTop';
import Allproduct from './pages/allproduct/Allproduct';
import ProductCard from './components/productCard/ProductCard';
import ProductFilter from './pages/productFilter/ProductFilter';

function App() {
  return (
    <Mystate>
<ToastContainer/>
    <Router>
<ScrollToTop/>
      <Routes>
        <Route path="/" element={<ProtectedRoutesUser><Home/>
          </ProtectedRoutesUser>} />
        <Route path="/order" element={<ProtectedRoutesUser><Order/></ProtectedRoutesUser>} />
        <Route path="/cart" element={<ProtectedRoutesUser><Cart/> </ProtectedRoutesUser>} />
        <Route path="/productinfo/:id" element={<ProtectedRoutesUser><ProductInfo/> </ProtectedRoutesUser>} />
        <Route path="/productfilter/:filter" element={<ProtectedRoutesUser><ProductFilter/> </ProtectedRoutesUser>} />

        <Route path="/allproducts" element={<ProtectedRoutesUser><Allproduct/> </ProtectedRoutesUser>} />

        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<ProtectedRoutesAdmin><Dashboard/> </ProtectedRoutesAdmin>} />
        <Route path="/Addproduct" element={<ProtectedRoutesAdmin><AddProduct/> </ProtectedRoutesAdmin>} />
        <Route path="/updateproduct" element={
            <ProtectedRoutesAdmin><UpdateProduct /></ProtectedRoutesAdmin>} />

        <Route path="/*" element={<Nopage/>} />
      </Routes>
    </Router>
    </Mystate>
  )
}

export default App