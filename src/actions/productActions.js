import { API } from 'aws-amplify';
import { 
        FETCH_PRODUCTS, 
        CLEAR_PRODUCTS,
        FETCH_PRODUCT_DETAIL,
        CLEAR_PRODUCT_DETAIL,
        ERROR_OCCURED
} from './types';

// Fetches all products using the PFL Product endpoint
export const fetchProducts = () => async dispatch => {  
    const response = await API.get('pfl', '/products');

    if(response.meta.statusCode === 200){
        dispatch({ type: FETCH_PRODUCTS, payload: response.results.data });
    } else {
        dispatch({ type: ERROR_OCCURED });
    }
};

// Clears the product reducer
export const clearProducts = () => {
    return {
        type: CLEAR_PRODUCTS,
    }
};

// Fetches product details from using PFL Product endpoint
export const fetchProductDetail = (id) => async dispatch => {
    const response = await API.get('pfl', `/products/${id}`);

    if(response.meta.statusCode === 200){
        dispatch({ type: FETCH_PRODUCT_DETAIL, payload: response.results });
    } else {
        dispatch({ type: ERROR_OCCURED });
    }

    
};

// Clears product detail state from product reducer
export const clearProductDetail = () => {
    return {
        type: CLEAR_PRODUCT_DETAIL
    }
};
