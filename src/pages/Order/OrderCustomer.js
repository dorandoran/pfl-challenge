import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCustomerInfo } from '../../actions';

import { FormValidation } from '../../components/commonFunctions';

class OrderCustomer extends Component {
    state = {
        errors: ''
    }

    handleChange(e) {
        this.props.setCustomerInfo(e);
    }

    // Checks if fields are empty
    validateForm = () => {
        const validation = FormValidation(this.props.customer);
        let errors = 'Cannot leave ';

        if (validation.length > 0) {
            validation.map((value, index) => {
                if (validation.length - 1 === index){
                    return errors += ` ${value} empty!`;
                }
                return errors += ` ${value},`;
            });
            this.setState({ errors })
        } else {
            this.props.confirmOrder()
        }
    }

    render() {
        return (
            <div className="order-customer__container">
                <h2 className="order-customer__title">Customer Information</h2>
                <div className="order-customer-field">
                    <label>First Name</label>
                    <input name="firstName" value={this.props.customer.firstName} onChange={e => this.handleChange(e)}/>
                </div>
                <div className="order-customer-field">
                    <label>Last Name</label>
                    <input name="lastName" value={this.props.customer.lastName} onChange={e => this.handleChange(e)}/>
                </div>
                <div className="order-customer-field">
                    <label>Company Name</label>
                    <input name="companyName" value={this.props.customer.companyName} onChange={e => this.handleChange(e)}/>
                </div>
                <div className="order-customer-field">
                    <label>Address</label>
                    <input name="address1" value={this.props.customer.address1} onChange={e => this.handleChange(e)}/>
                </div>
                <div className="order-customer-field">
                    <label></label>
                    <input name="address2" value={this.props.customer.address2} onChange={e => this.handleChange(e)}/>
                </div>
                <div className="order-customer-field">
                    <label>City</label>
                    <input name="city" value={this.props.customer.city} onChange={e => this.handleChange(e)}/>
                </div>
                <div className="order-customer-field">
                    <label>State</label>
                    <input name="state" value={this.props.customer.state} onChange={e => this.handleChange(e)}/>
                </div>
                <div className="order-customer-field">
                    <label>Zip Code</label>
                    <input name="postalCode" type="number" min="5" value={this.props.customer.postalCode} onChange={e => this.handleChange(e)}/>
                </div>
                <div className="order-customer-field">
                    <label>Country</label>
                    <input name="countryCode" value={this.props.customer.countryCode} onChange={e => this.handleChange(e)}/>
                </div>
                <div className="order-customer-field">
                    <label>Email</label>
                    <input name="email" value={this.props.customer.email} onChange={e => this.handleChange(e)}/>
                </div>
                <div className="order-customer-field">
                    <label>Phone</label>
                    <input name="phone" type="number" value={this.props.customer.phone} onChange={e => this.handleChange(e)}/>
                </div>
                <div className="error">{this.state.errors}</div>
                <button className="order-customer__button pfl-button"onClick={this.validateForm} >Next</button>
            </div>
        );
    }
}

function mapStateToProps ({ customer }) {
    return { customer }
}

export default connect(mapStateToProps, {setCustomerInfo})(OrderCustomer);