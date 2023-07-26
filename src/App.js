import './App.css';
import { useState } from 'react';
import Header from "./component/layout/Header/Header.js";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import WebFont from 'webfontloader';
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js";
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from"./component/User/ForgotPassword.js"
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Shipping/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from 'axios';
import Payment from "./component/Cart/Payment.js";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js"
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from './component/Admin/NewProduct';

function App() {

  const {isAuthenticated,user}=useSelector((state)=>state.user);

  const [stripeApiKey,setStripeApiKey]=useState("");

  async function getStripeApiKey(){
    console.log(process.env.REACT_APP_BACKEND_URI)
    const {data}=await axios.get(`${process.env.REACT_APP_BACKEND_URI}/api/v1/stripeapikey`);
    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    });
    store.dispatch(loadUser());

  },[]);
  React.useEffect(()=>{
    if(isAuthenticated) {
      getStripeApiKey();
    } 
    

  },[isAuthenticated]);

  return (
   
   <Router>
   <Header/>
   {isAuthenticated && <UserOptions user={user}/>}
   <Routes>
   <Route path="/" element={<Home/>} />
   <Route path="/product/:id" element={<ProductDetails/>} />
   <Route path="/products" element={<Products/>} />
   <Route path="/products/:keyword" element={<Products/>} />
   <Route path="/search" element={<Search/>} />
   <Route path="/login" element={<LoginSignUp/>} />
   <Route path="/" element={<ProtectedRoute isAdmin={true}/>}>
    <Route path="/account" element={<Profile/>}/>
    <Route path="/me/update" element={<UpdateProfile/>}/>
    <Route path="/password/update" element={<UpdatePassword/>}/>
    <Route path="/shipping" element={<Shipping/>} />
    <Route path="/success" element={<OrderSuccess/>} />
    <Route path="/orders" element={<MyOrders/>} />
    <Route path="/order/:id" element={<OrderDetails/>} />
    <Route path="/order/confirm" element={<ConfirmOrder/>} />
    <Route path="/admin/dashboard" element={<Dashboard/>} />
    <Route path="/admin/products" element={<ProductList/>} />
    <Route path="/admin/product" element={<NewProduct/>} />

    </Route>
   <Route path="/password/forgot" element={<ForgotPassword/>}/>
   <Route path="/password/reset/:token" element={<ResetPassword/>}/>
   <Route path="/cart" element={<Cart/>}/>
   
   </Routes>
   {stripeApiKey && (
    <Elements stripe={loadStripe(stripeApiKey)}>
    <Routes>
    <Route path="/" element={<ProtectedRoute/>}>
    <Route path="/process/payment" element={<Payment/>} />
      </Route>
    </Routes>
   </Elements>
   )};
   
   <Footer/>
   </Router>
  );
}

export default App;
