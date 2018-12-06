import React, { Component } from 'react';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sendOrder, clearCart } from '../../actions';

import CartItem from '../Cart/CartItem';

class OrderConfirm extends Component {
    //translate keys into strings
    translateKey(key) {
        switch(key) {
            case 'firstName':
                return 'First Name';
        case 'lastName':
                return 'Last Name';
        case 'companyName':
                return 'Company Name';
        case 'address1':
                return 'Address';
        case 'address2':
                return '';
        case 'city':
                return 'City';
        case 'state':
                return 'State';
        case 'postalCode':
                return 'Zip Code';
        case 'countryCode':
                return 'Country';
        case 'email':
                return 'Email';
        case 'phone':
                return 'Phone';
        default:
            return;
        }
    }

    sendOrder = () => {
        const { sendOrder, customer, cart, history, clearCart } = this.props;
        sendOrder(customer, cart);
        clearCart();
        history.push('/sent');
    }

    // Render Cart Items
    renderItems(){
        const { cart } = this.props;
        return _.map(cart, (item, index) => {
            return (
                <CartItem 
                    key={index}
                    item={item}
                />
            );
        });
    } 

    // Render Customer Field Info
    renderCustomerInfo() {
        const { customer } = this.props;
        let customerInfo = [];

        for(let [key, value] of Object.entries(customer)) {
            customerInfo.push(
                <div className="shipping-info__field" key={key}>
                    <span>{this.translateKey(key)}</span>
                    <span className="shipping-info__info">{value}</span>
                </div>
            );
        }
        return customerInfo;
    }

    render() {
        return (
            <div className="order-confirm__container">
                <h2>Order</h2>
                <div className="main-cart__table-header">
                    <span className="table-header__item cart-price">Price</span>
                    <span className="table-header__item cart-quantity">Quantity</span>
                    <span className="table-header__item cart-total">Total</span>
                </div>
                {this.renderItems()}
                <h3>Shipping Information</h3>
                <div>
                    <button className="pfl-button" onClick={this.props.customerInfo}>Edit Information</button>
                </div>
                <div className="order-confirm__shipping">
                    {this.renderCustomerInfo()}
                </div>
                <div className="order-confirm__button-container">
                    <button className="pfl-button" onClick={this.sendOrder}>Send Order</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps ({ cart, customer }){
    return { cart, customer };
}

export default compose (
    withRouter,
    connect(mapStateToProps, { sendOrder, clearCart })
)(OrderConfirm);