import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { fetchPrice } from '../../actions';
import { roundPrice } from '../../components/commonFunctions';

class ProductDetails extends Component {
    state = {
        selectedDelivery: { value: 0, code: null },
        quantity: this.props.qDefault,
        price: 0,
        itemFile: '',
        templateData: [],
        error: ''
    }
    
    handleChange(key, value) {
        this.setState({ [key]: value }, () => {
            this.getPrice();
        });
    }

    // Rounds the user input to a valid quantity per PFL API
    roundByStep(){
        const { step } = this.props;
        const { quantity } = this.state;
        
        if(step == null) return quantity;
        return Math.round(quantity/step) * step;
    }

    // Checks if response has been received from PFL price endpoint and if
    // user has selected a shipping option
    addToCart = () => {
        const { pricing, addToCart, hasTemplate } = this.props;
        const { selectedDelivery } = this.state;

        if(hasTemplate) this.getTemplateData();

        if(selectedDelivery.value !== 0 && pricing){
            this.setState({ error: '', price: pricing.orderTotalPrice }, () => {
                addToCart(this.state);
            });
            
        } else {
            this.setState({ error: 'Please wait until estimated total updates' });
        }
    }

    // Checks if user selected a shipping option and quantity, then rounds the
    // quantity input to a valid ordering quantity per PFL API. Fetches price from 
    // PFL Price/Order endpoint
    getPrice = () => {
        const { productID, fetchPrice } = this.props;
        const { selectedDelivery } = this.state;

        const validQuantity = this.roundByStep();

        if((validQuantity === '' || validQuantity == 0) && !selectedDelivery.code){
            this.setState({ error: 'Need to Select a Shipping Option and Quantity' });

        } else if ((validQuantity === '' || validQuantity == 0) && selectedDelivery.code) {
            this.setState({ error: 'Need to Select a Valid Quantity' });

        } else if ((validQuantity !== '' && validQuantity != 0) && !selectedDelivery.code) {
            this.setState({ error: 'Need to Select a Shipping Option' });

        } else {
            this.setState({ error: '', quantity: validQuantity });
            fetchPrice(productID, validQuantity, selectedDelivery.code);
        }
    }

    // The template uses uncontrolled inputs. Because of this, the template is
    // stored and passed after user clicks 'Add to Cart'
    getTemplateData = () => {
        const select = document.querySelectorAll('.template-field__input');
        const templateData = [];
        
        select.forEach(input => {
            const node = {
                templateDataName: input.name,
                templateDataValue: input.value
            };
            templateData.push(node);
        });
        this.setState({ templateData });
    }

    renderCountry(country) {
        if (country == null) {
            return '(United States)';
        }
        else {
            return `(${country})`;
        }
    }

    // Renders values for the select input
    renderSelectValues() {
        const { deliveredPrices } = this.props;
        return deliveredPrices.map(method => {
            return { 
                value: method.price, 
                label: `${method.description} - $ ${roundPrice(method.price)} ${this.renderCountry(method.country)}`, 
                code: method.deliveryMethodCode,
                description: method.description
            }
        });
    }

    // Renders total received from PFL Price/Order endpoint
    renderTotal = () => { 
        if(this.props.pricing){
            return roundPrice(this.props.pricing.orderTotalPrice);
        }
        return 0;
    }

    // If there is a template, render it
    renderTemplate(){
        if(this.props.hasTemplate) {
            const { fields } = this.props;

            return fields.map((field, index) => {
                if(field.required === "Y"){
                    return <div className="template__separator" key={"div-" + index}>Separator</div>;
                }

                return (
                    <div className="template-field" key={"div-" + index}>
                        <label className="template-field__label" key={"label-" + index}>{field.fieldname}</label>
                        <input
                            className="template-field__input"
                            key={"input-" + index}
                            name={field.htmlfieldname}
                            placeholder={field.orgvalue}
                            maxLength={field.charlimit || ""}
                        >
                        </input>
                    </div>
                );
            });
        }

        return (
            <div key="item-file" className="template-field item-file">
                <label className="template-field__label">Item File</label>
                <input 
                    className="template-field__input"
                    value={this.state.itemFile} 
                    onChange={e => {this.handleChange('itemFile', e.target.value)}} 
                />
            </div>
        );

    }

    render() {
        const { min, max, step } = this.props;

        return(
            <div className="product-detail__container">
                <div className="product-detail-template__container">
                    <h2 className="template__title">Template</h2>
                    {this.renderTemplate()}
                </div>
                <div className="delivery__container">
                    <h2>Delivery and Pricing</h2>
                    <div className="delivery__form-title">Shipping Options</div>
                    <Select 
                        options={this.renderSelectValues()} 
                        onChange={value => this.handleChange('selectedDelivery', value)} 
                    />
                </div>
                <div className="delivery__container">
                    <div className="delivery__form-title">Quantity (Minimum: {min})</div>
                    <input
                        className="delivery__input" 
                        type="number" 
                        min={min} 
                        max={max != null ? max : ""} 
                        step={step}
                        value={this.state.quantity} 
                        onChange={e => this.handleChange('quantity', e.target.value)} 
                    />
                </div>
                <div className="product-detail__button-container">
                    <div className="product-detail__total">Estimated Total With Shipping: ${this.renderTotal()}</div>
                </div>
                <div className="product-detail__button-container">
                    <div className="product-detail__error error">
                        {this.state.error}
                    </div>
                    <button className="pfl-button" onClick={this.addToCart}>Add to Cart</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ pricing }){
    return { pricing: pricing.price };
}

export default connect(mapStateToProps, { fetchPrice })(ProductDetails);
