import _ from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { cartRemoveProduct } from '../../actions';
import { roundPrice } from '../../components/commonFunctions';

import CartItem from './CartItem';

class CartPage extends Component {
    state = {
        errorMessage: ''
    }

    checkOut () {
        this.props.history.push('/order');
    }

    // Checks if two of the same products with different shipping options 
    // are in the cart. PFL API does not allow for orders to be sent if true
    checkCart = () => {
        const { cart } = this.props;
        const itemMap = {};

        for(let item in cart){
            let id = cart[item].productID;
            itemMap[id] ? itemMap[id]++ : itemMap[id] = 1;
        }

        for(let id in itemMap){
            if(itemMap[id] > 1) {
                this.setState({ 
                    errorMessage: 'You have two of the same item in your cart. You must delete one to complete order. ' + 
                                    'Determine which shipping speed you desire and remove the other product.'
                });
                return;
            } 
        }
        this.checkOut();
    }

    removeProduct = (itemCartNumber) => {
        this.props.cartRemoveProduct(itemCartNumber);
    }

    renderCartItems() {
        const { cart } = this.props;
        return _.map(cart, (item, index) => {
            return (
                <CartItem
                    key={index} 
                    item={item} 
                    removeProduct={this.removeProduct}
                    renderRemove={true}
                />
            );
        });
    }

    renderCartTotal() {
        const { cart } = this.props;
        let total = 0;

        if(Object.keys(cart).length !== 0){
            total = _.reduce(cart, (total, item) => {
                return total += parseFloat(item.price);
            }, 0)
        }
        return roundPrice(total);
    }

    render() {
        return (
            <div className="main-cart__container">
                <h2 className="main-cart__title">Cart</h2>
                <div className="main-cart__table-header">
                    <span className="table-header__item cart-price">Price</span>
                    <span className="table-header__item cart-quantity">Quantity</span>
                    <span className="table-header__item cart-total">Total</span>
                </div>
                {this.renderCartItems()}
                <h3 className="main-cart__total">Estimated Total: {this.renderCartTotal()}</h3>
                <button className="pfl-button" onClick={this.checkCart}>Checkout</button>
                <div className="main-cart__error error">{this.state.errorMessage}</div>
            </div>
        );
    }
}

function mapStateToProps ({ cart }){
    return { cart };
}

export default compose(
    withRouter,
    connect(mapStateToProps, { cartRemoveProduct })
)(CartPage);