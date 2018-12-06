import _ from 'lodash'
import { 
    CART_ADD_PRODUCT, 
    CART_REMOVE_PRODUCT,
    CLEAR_CART
} from '../actions/types';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type){
        case CART_ADD_PRODUCT:
            return { ...state, [action.payload.cartKey]: action.payload};
        case CART_REMOVE_PRODUCT:
            return _.omit(state, action.payload);
        case CLEAR_CART:
            return INITIAL_STATE;
        default:
            return state;
    }
}