import React, { Component } from 'react';
import { connect } from 'react-redux';
import { roundPrice } from '../../components/commonFunctions';

class SentPage extends Component {
    renderItems(){
        const { items } = this.props.order;

        return items.map((item, index) => {
            return(
                <div className="sent__items" key={index}>
                    <h3>{item.productName} - {item.productID}</h3>
                    <div>Price: {roundPrice(item.itemPrice.totalPrice)}</div>
                </div>
            );
        });
    }

    renderCustomer() {
        const { orderCustomer } = this.props.order;
        
        return (
            <div className="sent__ordercustomer">
                <div>{orderCustomer.firstName} {orderCustomer.lastName}</div>
                <div>{orderCustomer.companyName}</div>
                <div>{orderCustomer.address1}</div>
                <div>{orderCustomer.address2}</div>
                <div>{orderCustomer.city}, {orderCustomer.state}</div>
                <div>{orderCustomer.postalCode}</div>
                <h3>Contact Information</h3>
                <div>{orderCustomer.phone}</div>
                <div>{orderCustomer.email}</div>
            </div>
        );
    }
    
    // If order has been received, display order confirmation info
    renderContent(){
        const { order } = this.props;

        if(order){
            return(
                <div>
                    <h2>Order Number: {order.orderNumber}</h2>
                    {this.renderCustomer()}
                    <div>{this.renderItems()}</div>
                    <h3 className="sent__total">Total: {roundPrice(order.orderPrices.orderTotalPrice)}</h3>
                </div>
            );
        }

        return <h2 className="sent__sending">Sending Order...</h2>;
    }

    render() {
        return (
            <div className="main-sent-div">
                <h1 className="main-sent__title">Order Received</h1>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ order }) {
    return { order: order.order };
}

export default connect(mapStateToProps)(SentPage);