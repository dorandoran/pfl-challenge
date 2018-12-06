import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions';
import ProductList from './ProductList';

class Landing extends Component {
    render() {
        const { products, error } = this.props;
        if(error){
            return <h2 className="main-error-div">Error occured loading items!</h2>
        }
        
        if(products) {
            return (
                <div className="main-landing-div">
                    <ProductList className="main-landing__product-list" products={products} />
                </div>
            );
        }
        
        this.props.fetchProducts();
        return <h2 className="main-landing-div loading-title">Loading....</h2>
    }
}

function mapStateToProps ({ products }){
    return { 
        products: products.allProducts,
        error: products.error
    };
}

export default connect(mapStateToProps, { fetchProducts })(Landing);