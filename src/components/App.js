import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../styles.css';

// App Components rendered on every page
import Header from './Header';
import Footer from './Footer';

// App Pages
import LandingPage from '../pages/Landing/LandingPage';
import CartPage from '../pages/Cart/CartPage';
import ProductDetailPage from '../pages/ProductDetail/ProductDetailPage';
import OrderPage from '../pages/Order/OrderPage';
import SentPage from '../pages/Sent/SentPage';

// Navigation Router
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/cart" component={CartPage} />
                    <Route path="/product/:id" component={ProductDetailPage} />
                    <Route path="/order" component={OrderPage} />
                    <Route path="/sent" component={SentPage} />
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;