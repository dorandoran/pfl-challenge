import { 
    CART_ADD_PRODUCT,
    CART_REMOVE_PRODUCT,
    CLEAR_CART
} from './types';

// Checks if the item/shipping has been added to cart previously, if so it updates quantity/price.
// Then ransforms product before adding to cart reducer
export const cartAddProduct = ( cart, newCartProduct, productID, imageURL, productName ) => {
    const cartKey = productID + newCartProduct.selectedDelivery.code;
    if(cart[cartKey]){
        cart[cartKey].quantity += newCartProduct.quantity;
        cart[cartKey].price += newCartProduct.price;

        return {
            type: CART_ADD_PRODUCT,
            payload: cart[cartKey]
        }
    }

    delete newCartProduct.error;
    newCartProduct.cartKey = cartKey;
    newCartProduct.productName = productName;
    newCartProduct.productID = productID;
    newCartProduct.imageURL = imageURL;
    
    return {
        type: CART_ADD_PRODUCT,
        payload: newCartProduct
    }
};

// Removes cart product
export const cartRemoveProduct = (itemCartNumber) => {
    return {
        type: CART_REMOVE_PRODUCT,
        payload: itemCartNumber
    }
};

// Clears cart reducer
export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
};