import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';
import customerReducer from './customerReducer';
import orderReducer from './orderReducer';
import pricingReducer from './pricingReducer';

export default combineReducers({
    products: productsReducer,
    cart: cartReducer,
    customer: customerReducer,
    order: orderReducer,
    pricing: pricingReducer
});