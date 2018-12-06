import { 
    SEND_ORDER,
    CLEAR_CART
} from '../actions/types';

const INITIAL_STATE = {
    order: null
};

export default function (state = INITIAL_STATE, action){
    switch (action.type) {
        case SEND_ORDER:
            return { order: action.payload };
        case CLEAR_CART:
            return INITIAL_STATE;
        default:
            return state;
    }
}