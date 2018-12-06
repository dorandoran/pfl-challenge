import React, { Component } from 'react';

import OrderCustomer from './OrderCustomer';
import OrderConfirm from './OrderConfirm';

class OrderPage extends Component {
    state = {
        orderConfirmation: false
    }

    changePage = () => {
        this.setState({ orderConfirmation: !this.state.orderConfirmation })
    }

    renderPage() {
        if(this.state.orderConfirmation){
            return <OrderConfirm customerInfo={this.changePage}/>;
        } 
            
        return <OrderCustomer confirmOrder={this.changePage}/>;
    }

    render() {
        return (
            <div className="main-order-div">
                {this.renderPage()}
            </div>
        );
    }
}

export default OrderPage;
