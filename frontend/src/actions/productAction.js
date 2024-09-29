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
export const getProduct = () => async (dispatch) => {

    try {

        dispatch({ type: ALL_PRODUCT_REQUEST});

        const {data} = await axios.get("/api/v1/products");

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


export const getProductDetals = (id) => async (dispatch) => {

    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product,
        })
        
    } catch (error) {
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


