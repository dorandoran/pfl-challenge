import { 
    FETCH_PRICE,
    CLEAR_PRICE
} from '../actions/types';

const INITIAL_STATE = {
    price: null
}

export default function (state = INITIAL_STATE, action){
    switch (action.type) {
        case FETCH_PRICE:
            return { price: action.payload };
        case CLEAR_PRICE:
            return INITIAL_STATE;
        default:
            return state;
    }
}