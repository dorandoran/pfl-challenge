import React, { Component } from 'react';
import { roundPrice } from '../../components/commonFunctions';

class CartItem extends Component {
    handleClick = () => {
        this.props.removeProduct(this.props.item.cartKey)
    }

    renderButton(){
        if(this.props.renderRemove){
            return <button onClick={this.handleClick}>x</button>;
        }
    }

    render() {
        const { item } = this.props;

        return (
            <div className="cart-item__container">
                <div className="cart-item__info">
                    {this.renderButton()}
                    <img className="cart-item__image" src={item.imageURL} alt={item.productName} />
                    <span className="cart-productname">{item.productName}</span>
                    <span className="cart-price">{roundPrice(item.selectedDelivery.value)}</span>
                    <span className="cart-quantity">{item.quantity}</span>
                    <span className="cart-total">{roundPrice(item.price)}</span>
                </div>
                <div className="cart-item__ship-info">
                    <div className="ship-info__title">Shipping Method</div>
                    <div className="ship-info__label">{item.selectedDelivery.description}</div>
                </div>
            </div>
        );
    }
}

export default CartItem;