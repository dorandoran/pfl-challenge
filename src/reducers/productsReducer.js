import { 
    FETCH_PRODUCTS,
    FETCH_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL,
    ERROR_OCCURED
} from '../actions/types';

const INITIAL_STATE = {
    allProducts: null,
    selectedProduct: null,
    error: false
};

export default function (state = INITIAL_STATE, action){
    switch (action.type) {
        case FETCH_PRODUCT_DETAIL:
            return { selectedProduct: action.payload };
        case CLEAR_PRODUCT_DETAIL:
            return INITIAL_STATE;
        case FETCH_PRODUCTS:
            return { allProducts: action.payload };
        case ERROR_OCCURED:
            return { error: true };
        default:
            return state;
    }
}