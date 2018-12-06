import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchProductDetail, cartAddProduct } from '../../actions';

import ProductDetail from './ProductDetails';

class ProductDetailPage extends Component {
    addToCart = (product) => {
        const { history, match, cart, cartAddProduct } = this.props;
        const { data } = this.props.selectedProduct;

        cartAddProduct(cart, product, match.params.id, data.imageURL, data.name);
        history.push('/cart');
    }

    renderProductionSpeed(days){
        return days > 1 ? days + ' Days' : days + ' Day'
    }

    // If page reloaded, fetch info
    renderProductDetail() {
        const { selectedProduct, fetchProductDetail, match, error} = this.props;

        if(error) {
            return <h2 className="main-error-div">Error occured loading items!</h2>;
        }
        
        if (selectedProduct) {
            const { data } = this.props.selectedProduct;

            return (
                <div className="main-product-div">
                    <h1 className="main-product__title">{data.name}</h1>
                    <img className="main-product__image" src={data.imageURL} alt={data.name} />
                    <div className="main-product__speed">Production Speed: {this.renderProductionSpeed(data.productionSpeeds[0].days)}</div>
                    <ProductDetail 
                        hasTemplate={data.hasTemplate} 
                        fields={data.templateFields ? data.templateFields.fieldlist.field : null}
                        deliveredPrices={data.deliveredPrices}
                        addToCart={this.addToCart} 
                        min={data.quantityMinimum}
                        max={data.quantityMaximum}
                        qDefault={data.quantityDefault}
                        step={data.quantityIncrement}
                        productID={match.params.id}
                    />
                </div>
            );
        }

        fetchProductDetail(match.params.id)
        return <h2 className="main-product-div loading-title">Loading Product...</h2>;
    }

    render() {
        return this.renderProductDetail();
    }
}

function mapStateToProps ({ products, cart }){
    return { 
        selectedProduct: products.selectedProduct,
        error: products.error,
        cart
     }
}

export default compose(
    withRouter,
    connect(mapStateToProps, { fetchProductDetail, cartAddProduct })
)(ProductDetailPage);