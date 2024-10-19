import axios from "axios";

import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS, 
    ALL_PRODUCT_REQUEST, 
    CLEAR_ERRORS,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL} from '../constants/ProductConstant';

// Axios get product
export const getProduct = ( keyword ="",currentPage=1 ) => async (dispatch) => {

    try {

        dispatch({ type: ALL_PRODUCT_REQUEST});

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;
        console.log("Start",link)

        const {data} = await axios.get(link);

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }

}


export const getProductDetails = (id) => async (dispatch) => {
    console.log("Start", id)
    try {
        console.log("2")

        dispatch({ type: PRODUCT_DETAILS_REQUEST});
        console.log("3")
        const {data} = await axios.get(`/api/v1/product/${id}`);
        console.log("4",data)
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data,
        })
        
    } catch (error) {
        console.log("5")
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }

}


// Clear Error
export const clearErrors = () => async (dispatch) => {
    dispatch({ type:CLEAR_ERRORS});
}


