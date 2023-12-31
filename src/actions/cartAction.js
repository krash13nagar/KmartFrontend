import {ADD_TO_CART,REMOVE_CART_ITEM,SAVE_SHIPPING_ITEM} from "../constants/cartConstants";
import axios from "axios";



// Add To Cart
export const addItemsToCart =(id,quantity)=> async(dispatch,getState)=>{

        console.log('first')
        const {data}=await axios.get(
            `${process.env.REACT_APP_BACKEND_URI}/api/v1/product/${id}`,
        );
        console.log(data)
        dispatch({
            type: ADD_TO_CART,
            payload:{
                product:data.product._id,
                name:data.product.name,
                price:data.product.price,
                image:data.product.images[0].url,
                stock:data.product.Stock,
                quantity,
            },
        });
       
        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
    
};

// Remove From Cart
export const removeItemsFromCart =(id)=> async(dispatch,getState)=>{

    dispatch({
        type:REMOVE_CART_ITEM,
        payload:id,
    });
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));

};

// SAVE SHIPPING INFO

export const saveShippingInfo=(data)=> async (dispatch)=>{
    dispatch({
        type:SAVE_SHIPPING_ITEM,
        payload:data,
    });

    localStorage.setItem("shippingInfo",JSON.stringify(data));
};