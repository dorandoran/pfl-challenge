import { API } from 'aws-amplify'
import {
    FETCH_PRICE,
    CLEAR_PRICE,
    ERROR_OCCURED
} from '../actions/types';

// Calls PFL Price/Order endpoint using minimum information to receive response
export const fetchPrice = (productID, quantity, shippingMethod) => async dispatch => {
    const items = [];
    const shipments = [];
    const orderCustomer = {
        firstName: 'Get',
        lastName: 'Price',
        companyName: 'None',
        address1: '1 Get Price Ave',
        address2: '',
        city: 'Get',
        state: 'VA',
        postalCode: '22310',
        countryCode: 'US',
        email: 'get@price.com',
        phone: '1234567890',
    }

    items.push({
        itemSequenceNumber: 1,
        productID,
        quantity
    });

    shipments.push({
        shipmentSequenceNumber: 1,
        firstName: 'Get',
        lastName: 'Price',
        companyName: 'None',
        address1: '1 Get Price Ave',
        address2: '',
        city: 'Get',
        state: 'VA',
        postalCode: '22310',
        countryCode: 'US',
        phone: '1234567890',
        shippingMethod
    });

    const response = await API.post('pfl', '/orders', {
        body: {
            'partnerOrderReference': 'MyReferenceNumber',
            orderCustomer,
            items,
            shipments,
        }
    });

    if(response.meta.statusCode === 200){
        dispatch({ type: FETCH_PRICE, payload: response.results.data.orderPrices });
    } else {
        dispatch({ type: ERROR_OCCURED });
    }
};

// Clears price reducer
export const clearPrice = () => {
    return { type: CLEAR_PRICE }
};