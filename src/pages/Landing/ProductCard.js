import React, { Component } from 'react';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearProductDetail } from '../../actions';

class ProductCard extends Component {
    onCardClick = () => {
        this.props.clearProductDetail();
        this.props.history.push(`/product/${this.props.id}`)
    }

    render() {
        const { id, imageURL, name } = this.props;
        return (
            <Link to={`/product/${id}`} onClick={this.onCardClick} className="product-card__container" >
                <img className="product-card__image" src={imageURL} alt={name} />
                <div className="product-card__name">{name}</div>
            </Link>
        );
    }
}


export default compose(
    withRouter,
    connect(null, { clearProductDetail })
)(ProductCard);