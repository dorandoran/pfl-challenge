import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
    renderItemTotal() {
        const { cart } = this.props;
        return _.size(cart);
    }

    render() {
        return (
            <header className="main-header">
                <Link className="main-header__brand" to="/">
                    <img src={require("../images/pfl.jpg")} alt="PFL" />
                </Link>
                <nav className="main-nav">
                    <ul className="main-nav__items">
                        <li className="main-nav__item">
                            <Link to="/cart">
                                Cart
                                <span>({this.renderItemTotal()})</span>
                            </Link>
                            
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

function mapStateToProps ({ cart }){
    return { cart };
}

export default connect(mapStateToProps)(Header);