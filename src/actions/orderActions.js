import { API } from 'aws-amplify';
import { 
        SET_CUSTOMER_INFO,
        SEND_ORDER,
        CLEAR_ORDER,
        ERROR_OCCURED
} from './types';

// Sets customer information from OrderCustomer component
export const setCustomerInfo = (event) => {
    return {
        type: SET_CUSTOMER_INFO,
        payload: event
    }
};

// Transforms cart items for the PFL Order endpoint
export const sendOrder = (orderCustomer, cart) => async dispatch=>{
    const items = transformItems(cart);
    const shipments = transformShipments(items, orderCustomer);
    deleteDelivery(items);
    const itemShipments = transformItemShipments(shipments);

    const response = await API.post('pfl', '/orders', {
        body: {
            'partnerOrderReference': 'MyReferenceNumber',
            orderCustomer,
            items,
            shipments,
            itemShipments
        }
    });
    
    if(response.meta.statusCode === 200){
        dispatch({ type: SEND_ORDER, payload: response.results.data });
    } else {
        dispatch({ type: ERROR_OCCURED });
    }

};

// Clears order reducer
export const clearOrder = () => {
    return { type: CLEAR_ORDER }
};

const transformItems = (cart) => {
    let items = JSON.parse(JSON.stringify(cart));
    return Object.keys(items).map((key, index) => {
        delete items[key].cartKey;
        delete items[key].imageURL;
        delete items[key].productName;
        delete items[key].price;

        if(items[key].templateData.length > 0){
            delete items[key].itemFile;
        } else {
            delete items[key].templateData;
        }

        items[key].itemSequenceNumber = index + 1;
        return items[key];
    });
};

const transformShipments = (items, customer) => {
    let shipments = JSON.parse(JSON.stringify(items));
    return shipments.map((shipments) => {
        shipments.shippingMethod = shipments.selectedDelivery.code;
        shipments.shipmentSequenceNumber = shipments.itemSequenceNumber;

        delete shipments.selectedDelivery;
        delete shipments.itemSequenceNumber;
        delete shipments.itemFile;
        delete shipments.templateData;
        delete shipments.productID;
        delete shipments.quantity;

        return {...shipments, ...customer};
    });
};

const transformItemShipments = (shipments) => {
    let itemShipments = [];
    shipments.forEach(shipment => {
            const obj = {
                itemSequenceNumber: shipment.shipmentSequenceNumber,
                shipmentSequenceNumber: shipment.shipmentSequenceNumber
            };
            itemShipments.push(obj)
    })
    return itemShipments;
};

const deleteDelivery = (items) => {
    return items.map(item => {
        delete item.selectedDelivery;
        return item;
    });
};