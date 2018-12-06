// Form Validation making sure fields are not empty
export const FormValidation = (props) => {
    let errors = [];
    let check = '';
    for(let [key, value] of Object.entries(props)) {
        check = validate(key, value);
        if (check){
            errors.push(check);
        }
    }
    return errors;
}

export const roundPrice = (price) => {
    return (Math.round((price * 1000)/10)/100).toFixed(2);
}

// Custom Validation, currently only checks if inputs are filled
const validate = (key, value) => {
    let error = '';
    switch(key) {
        case 'firstName':
            if(checkLength(value)) {
                break;
            } else{
                return 'First Name';
            }
        case 'lastName':
            if(checkLength(value)) {
                break;
            } else{
                return 'Last Name';
            }
        case 'companyName':
            if(checkLength(value)) {
                break;
            } else{
                return 'Company Name';
            }
        case 'address1':
            if(checkLength(value)) {
                break;
            } else{
                return 'Address';
            }
        case 'address2':
            break;
        case 'city':
            if(checkLength(value)) {
                break;
            } else{
                return 'City';
            }
        case 'state':
            if(checkLength(value)) {
                break;
            } else{
                return 'State';
            }
        case 'postalCode':
            if(checkLength(value)) {
                break;
            } else{
                return 'Zip Code';
            }
        case 'countryCode':
            if(checkLength(value)) {
                break;
            } else{
                return 'Country';
            }
        case 'email':
            if(checkLength(value)) {
                break;
            } else{
                return 'Email';
            }
        case 'phone':
            if(checkLength(value)) {
                break;
            } else{
                return 'Phone';
            }
        default:
            return;
    }
    return error;
}

const checkLength = (value) => {
    if(value.length < 1) { return false; }
    else { return true; }
}