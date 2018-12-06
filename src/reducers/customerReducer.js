import { SET_CUSTOMER_INFO } from '../actions/types';

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    companyName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    countryCode: '',
    email: '',
    phone: ''
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case SET_CUSTOMER_INFO:
            return { ...state, [action.payload.target.name]: action.payload.target.value}
        default:
            return state;
    }
}