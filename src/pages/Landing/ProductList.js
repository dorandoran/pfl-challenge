import _ from 'lodash';
import React, { Component } from 'react';
import ProductCard from './ProductCard';

class ProductList extends Component{
    renderProducts(){
        const { products } = this.props;

        return _.map(products, (product, index) => {
            return (
                <ProductCard
                    key={index}
                    id={product.productID}
                    imageURL={product.imageURL}
                    name={product.name}
                />
            );
        });
    }

    render() {
        return (
            <div className="product-list__container">
                <div className="product-list__title">Our Products</div>
                <div className="product-list__product-cards">
                    {this.renderProducts()}
                </div>
            </div>
        );
    }
}

export default ProductList;